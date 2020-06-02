module.exports = function (app) {
    var dataInjector = app.middleware.dataInjector
    var downloader = app.controllers.downloader;

    app.post('/service/download/csv', dataInjector, downloader.downloadCSV);
    app.post('/service/download/shp', downloader.downloadSHP);
}
