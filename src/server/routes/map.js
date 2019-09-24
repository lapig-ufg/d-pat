module.exports = function (app) {
	
	var dataInjector = app.middleware.dataInjector
	var map = app.controllers.map;

	app.get('/service/map/descriptor', map.descriptor);
	app.get('/service/map/search', dataInjector);
	app.get('/service/map/extent', dataInjector, map.extent);
	app.get('/service/map/field/', dataInjector, map.field);
	app.get('/service/map/field/:category/:id/:filename', map.fieldData);

}
