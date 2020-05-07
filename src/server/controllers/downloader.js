var fs = require("fs");
var languageJson = require('../assets/lang/language.json');
var Ows = require('../utils/ows');
var path = require('path');
var request = require('request');
var archiver = require('archiver');

module.exports = function (app) {
    var Controller = {};
    var self = {};

    var config  = app.config;
    var client  = app.database.client;
    var queries = app.database.queries.map;

    self.requestFileFromMapServ = async function (url, pathFile, response){

        let file = fs.createWriteStream(pathFile+".zip");

        await new Promise((resolve, reject) => {
            let stream = request({
                uri: url,
                gzip: true
            })
            .pipe(file)
            .on('finish', () => {
                response.download(pathFile+'.zip');
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
    }

    Controller.downloadCSV = function(request, response) {

        var region = request.param('region', '');
        var file = request.param('file', '');
        var regionType = request.param('regionType', ''); /* city , state or biome - Select Region*/
        var msfilter = request.param('filter', '');
        var filter = '';
        var filtersPastureDegraded = " WHERE category='1'";
        var sqlQuery;

        if(file == 'pasture') {
            sqlQuery =  "SELECT cd_geouf, cd_geocmu, uf, estado, municipio, SUM(area_ha) as area_pastagem, year FROM pasture WHERE "+region+" GROUP BY 1,2,3,4,5,7"
        } else if (file == 'pasture_degraded') {

            if(msfilter) {
                filtersPastureDegraded = filtersPastureDegraded+" AND "+msfilter;
            }

            sqlQuery =  "SELECT cd_geouf, cd_geocmu, uf, estado, municipio, SUM(area_ha) as area_past_degradada FROM pasture_degraded_class "+filtersPastureDegraded+" GROUP BY 1,2,3,4,5"
        } else if (file == 'lotacao_bovina_regions') {
            sqlQuery =  "SELECT cd_geouf, cd_geocmu, uf, estado, municipio, SUM(ua) as ua, sum(n_kbcs) as kbc, year FROM lotacao_bovina_regions WHERE "+region+" GROUP BY 1,2,3,4,5,8"
        } else if (file == 'potencial_intensificacao_pecuaria') {

            if(msfilter) {
                filter = " WHERE "+msfilter;
            }

            sqlQuery =  "SELECT cd_geouf, cd_geocmu, uf, estado, municipio, AVG(potencial_int) as potencial_intensificacao FROM potencial_intensificacao "+filter+" GROUP BY 1,2,3,4,5"
        }

        client.query(sqlQuery, (err, rows) => {
            if (err) {
                console.log(err)
                response.end()
            } else {

                var output = file+".csv";
                var csv = json2csv(rows.rows);

                fs.writeFile(output, csv, function(err) {
                    response.setHeader('Content-disposition', 'attachment; filename='+output);
                    response.set('Content-Type', 'text/csv');
                    response.send(csv);
                    response.end();
                });

            }
        });
    }

    Controller.downloadSHP = function(request, response) {

        let layer  = request.body.layer;
        let region = request.body.selectedRegion;
        let time   = request.body.times;

        let owsRequest =  new Ows();

        owsRequest.setTypeName(layer.selectedType);
        // owsRequest.addFilter('year', time.year);


        if(region.type == 'city')
        {
            owsRequest.addFilter('cd_geocmu', region.cd_geocmu);
        }
        else if (region.type == 'state')
        {
            owsRequest.addFilter('uf', region.value);
        }

        if(time != null || time != '' || time != undefined)
        {
            owsRequest.addFilterDirect(region.value);
        }

        

        let fileParam = layer.selectedType+'_'+time.year;

        let diretorio = config.downloadDataDir+layer.selectedType+'/';
        // let diretorio = config.downloadDataDir+layer.selectedType+'/'+region.type+'/'+region.value+'/';

        let	pathFile  = diretorio+fileParam;

        var nameFile  = layer.selectedType+'_'+region.type+'_'+fileParam;

        var zipFile = archiver('zip');

        if (!fs.existsSync(diretorio)){
            fs.mkdirSync(diretorio,  {recursive: true});
        }

        if(fs.existsSync(pathFile+'.zip')) {
            response.download(pathFile+'.zip');
        }else{
            self.requestFileFromMapServ(owsRequest.get(), pathFile, response);
        }
    };

    return Controller;
};