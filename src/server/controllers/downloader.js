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

        let layer  = request.body.layer;
        let region = request.body.selectedRegion;
        let time   = request.body.times;

        let mapper = {
            "bi_ce_prodes_desmatamento_100_fip" : "select origin_gid,view_date,source, cd_geocmu, uf, sucept_desmat, bfm_pct, year, classefip, sum(areamunkm) from prodes_cerrado",
            "bi_ce_deter_desmatamento_100_fip" : "select origin_gid,view_date,source, cd_geocmu, uf, sucept_desmat, bfm_pct, date_part('year', deter_cerrado.view_date) AS year, classefip, sum(areamunkm) from deter_cerrado",
            "bi_ce_prodes_antropico_100_fip" : "select origin_gid,view_date,source, cd_geocmu, uf, sucept_desmat, bfm_pct, year, classefip, sum(areamunkm) from prodes_cerrado"
        }

        var sqlQuery = mapper[layer];

        if(region.type == 'city')
        {
            sqlQuery += " WHERE cd_geocmu='"+region.cd_geocmu+"'";
        }
        else if (region.type == 'state')
        {
            sqlQuery += " WHERE uf='"+region.value+"'";
        }
        else{
            sqlQuery += " WHERE " + region.value
        }

        if(region.type != 'biome' && (time != undefined))
        {
            sqlQuery += " AND " + region.value
        }

        sqlQuery+= " GROUP BY 1,2,3,4,5,6,7,8,9"


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

        if(time != undefined)
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