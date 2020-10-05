var fs = require("fs");
var fsp = require("fs").promises;
var languageJson = require('../assets/lang/language.json');
const { convertArrayToCSV } = require('convert-array-to-csv');
const moment = require('moment');
var Ows = require('../utils/ows');
var path = require('path');
var request = require('request');
var archiver = require('archiver');

module.exports = function (app) {
    var Controller = {};
    var self = {};

    var config = app.config;

    if (!fs.existsSync(config.downloadDataDir)) {
        fs.mkdirSync(config.downloadDataDir);
    }

    self.requestFileFromMapServ = async function (url, pathFile, response) {

        let file = fs.createWriteStream(pathFile + ".zip");

        await new Promise((resolve, reject) => {
            let stream = request({
                uri: url,
                gzip: true
            })
                .pipe(file)
                .on('finish', () => {
                    response.download(pathFile + '.zip');
                    resolve();
                })
                .on('error', (error) => {
                    response.send(error)
                    response.end();
                    reject(error);
                })
        })
            .catch(error => {
                console.log(`Something happened: ${error}`);
            });
    };

    Controller.downloadCSV = async function (request, response) {
        let layer = request.body.layer;
        let region = request.body.selectedRegion;
        let time = request.body.times;

        let data = request.queryResult['csv'];

        data.forEach(function (item, index) {
            data[index].view_date = moment(item.view_date).format('DD/MM/YYYY')
        });

        console.log(region)

        var filename = "dados_" + region.text + ".csv";
        var csv = convertArrayToCSV(data);

        await fs.writeFileSync(config.downloadDataDir + filename, csv);
        response.download(config.downloadDataDir + filename);
    };

    Controller.downloadSHP = function (request, response) {

        let layer = request.body.layer;
        let region = request.body.selectedRegion;
        let time = request.body.times;
        let typeShape = request.body.typeshape;

        let owsRequest = new Ows(typeShape);
        owsRequest.setTypeName(layer.selectedType);

        let diretorio = '';
        let fileParam = '';
        let pathFile = '';

        console.log(request.body)

        if (typeShape == 'shp') {
            owsRequest.addFilter('1', '1');

            if (region.type == 'city') {
                owsRequest.addFilter('cd_geocmu', region.cd_geocmu);
            }
            else if (region.type == 'state') {
                owsRequest.addFilter('uf', region.value);
            }

            if (time != undefined) {
                owsRequest.addFilterDirect(time.value);
            }

            fileParam = layer.selectedType + '_' + time;

            // diretorio = config.downloadDataDir + layer.selectedType + '/';
            // var nameFile = layer.selectedType + '_' + region.type + '_' + fileParam;
        }
        else if (typeShape == 'tiff') {
            diretorio = config.downloadDataDir + layer.selectedType
        }

        diretorio = config.downloadDataDir + layer.selectedType + '/' + region.type + '/' + region.value + '/' + typeShape + '/';
        fileParam = layer.selectedType;
        pathFile = diretorio + fileParam;

        var zipFile = archiver('zip');

        if (!fs.existsSync(diretorio)) {
            fs.mkdirSync(diretorio, { recursive: true });
        }

        if (fs.existsSync(pathFile + '.zip')) {
            response.download(pathFile + '.zip');
        } else {
            self.requestFileFromMapServ(owsRequest.get(), pathFile, response);
        }
    };

    return Controller;
};
