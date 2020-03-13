module.exports = function (app) {

    var downloader = app.controllers.downloader;

    app.post('/service/download/shp', downloader.downloadSHP);
    app.post('/service/download/csv', downloader.downloadCSV);
}
