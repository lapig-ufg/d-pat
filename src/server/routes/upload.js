module.exports = function(app) {

    var filesAccepted = app.middleware.file;
    var uploader = app.controllers.upload;
    var dataInjector = app.middleware.dataInjector

    app.post('/service/upload/spatial-file', filesAccepted, uploader.getGeoJson);
    app.get('/service/upload/desmatperyear', dataInjector, uploader.desmatperyear);
    app.get('/service/upload/carspertoken', dataInjector, uploader.carspertoken);
    app.get('/service/upload/findgeojsonbytoken', dataInjector, uploader.findGeoJsonByToken);
    app.get('/service/upload/terraclass', dataInjector, uploader.terraclass);
}