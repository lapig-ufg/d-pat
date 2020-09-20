module.exports = function (app) {

	var filesAccepted = app.middleware.file;
	var uploader = app.controllers.uploader;
	var dataInjector = app.middleware.dataInjector

	app.post('/service/upload/spatial-file', filesAccepted, uploader.getGeoJson);
	app.post('/service/upload/desmatperyear', dataInjector, uploader.compareToDeforestation);
}
