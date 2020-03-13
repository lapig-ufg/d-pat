var fs = require("fs");
var languageJson = require('../assets/lang/language.json');
var path = require('path');

module.exports = function (app) {
    var Controller = {};
    var Internal = {};

    var config  = app.config;
    var client  = app.database.client;
    var queries = app.database.queries.map;

    Controller.downloadCSV = function(request, response) {

        var region = request.param('region', '');
        var file = request.param('file', '');
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

        var pathFile;
        var layer = request.param('file', '');
        var regionType = request.param('regionType', ''); /* city , state or biome - Select Region*/
        var region = request.param('region', '');
        var year = request.param('year', '');
        var fileParam = layer+'_'+year;

        if(layer != 'pasture') {
            fileParam = layer;
        }

        var diretorio = config.downloadDir+layer+'/'+regionType+'/'+region+'/';
        var	pathFile = diretorio+fileParam;

        if(fileParam.indexOf("../") == 0){
            res.send('Arquivo inválido!')
            res.end();
        } else if(fs.existsSync(pathFile+'.shp')) {
            var nameFile = regionType+'_'+region+'_'+fileParam
            response.setHeader('Content-disposition', 'attachment; filename='+nameFile+'.zip');
            response.setHeader('Content-type', 'application/zip')

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

        } else if(regionType == 'undefined'){
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
        }
    }

    return Controller;
};