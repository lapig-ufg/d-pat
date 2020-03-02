module.exports = function (app) {

	var filesAccepted = app.middleware.file;
	var uploader = app.controllers.uploader;

	app.post('/service/upload/spatial-file', filesAccepted, uploader.getGeoJson);
}
