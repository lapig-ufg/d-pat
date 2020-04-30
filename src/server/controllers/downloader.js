var fs = require("fs");
var languageJson = require('../assets/lang/language.json');
var Ows = require('../utils/ows');
var path = require('path');
var request = require('request');

module.exports = function (app) {
    var Controller = {};
    var self = {};

    var config  = app.config;
    var client  = app.database.client;
    var queries = app.database.queries.map;

    self.requestFileFromMapServ = async function (url, pathFile){

        let file = fs.createWriteStream(pathFile+".zip");

        await new Promise((resolve, reject) => {
            let stream = request({
                uri: url,
                gzip: true
            })
            .pipe(file)
            .on('finish', () => {
                console.log(`The file is finished downloading.`);
                resolve();
            })
            .on('error', (error) => {
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

        // request.param('regionType', ''); /* city , state or biome - Select Region*/


        let layer  = request.body.layer;
        let region = request.body.selectedRegion;
        let time   = request.body.year;

        let owsRequest =  new Ows();

        owsRequest.setTypeName(layer.selectedType);
        owsRequest.addFilter('prodes_year', time.year);
        owsRequest.addFilter('region_name', region.value);
        owsRequest.addFilter('region_type', region.type);

        console.log("URL", owsRequest.get());

        let fileParam = layer.selectedType+'_'+time.year;

        let diretorio = config.downloadDataDir+layer.selectedType+'/'+region.type+'/'+region.value+'/';

        let	pathFile = diretorio+fileParam;

        if (!fs.existsSync(diretorio)){
            fs.mkdirSync(diretorio,  {recursive: true});
        }

        if(fileParam.indexOf("../") == 0){
            response.send('Arquivo inválido!')
            response.end();
        } else if(fs.existsSync(pathFile+'.zip')) {

            var nameFile = layer.selectedType+'_'+region.type+'_'+fileParam;


            self.requestFileFromMapServ(owsRequest.get(), pathFile);

            response.setHeader('Content-disposition', 'attachment; filename='+nameFile+'.zip');
            response.setHeader('Content-type', 'application/zip');

            var zipFile = archiver('zip');
            zipFile.pipe(response);

            fs.readdir(diretorio, (err, files) => {
                files.forEach(fileresult => {

                    if(fileresult.indexOf(fileParam) == 0){
                        var pathFile = diretorio+fileresult;
                        zipFile.file(pathFile, {name:fileresult});
                    }

                });

                zipFile.finalize();
            })

        } /*else if(regionType == 'undefined'){
            var diretorioBR = config.downloadDir+layer+'/brasil/';
            var fileParamBR = year;
            var	pathFileBR = diretorioBR+fileParamBR;
            var nameFile = 'br_'+layer+'_'+year;

            if(layer != 'pasture') {
                pathFileBR = diretorioBR
                nameFile = 'br_'+layer
            }

            response.setHeader('Content-disposition', 'attachment; filename='+nameFile+'.zip');
            response.setHeader('Content-type', 'application/zip')

            var zipFile = archiver('zip');
            zipFile.pipe(response);

            if(fs.existsSync(pathFileBR)) {
                zipFile.directory(pathFileBR, fileParam);
            }

            zipFile.finalize();

        } else if (layer == 'pontos_campo_sem_parada' || layer == 'pontos_campo_parada' || layer == 'pontos_tvi_treinamento' || layer == 'pontos_tvi_validacao'){

            response.setHeader('Content-disposition', 'attachment; filename=' + layer+'.zip');
            response.setHeader('Content-type', 'application/zip')

            var diretorio = config.downloadDir+layer;

            var zipFile = archiver('zip');
            zipFile.pipe(response);

            if(fs.existsSync(diretorio)) {
                zipFile.directory(diretorio, layer);
            }

            zipFile.finalize();

        } else {
            response.send("Arquivo indisponível");
            response.end();
        }*/
    }

    return Controller;
};