module.exports = function (app) {

	var map = app.controllers.map;
	
	app.get('/service/map/periods', map.periods);
	app.get('/service/map/search', map.search);
	app.get('/service/map/extent', map.extent);

	app.get('/service/deforestation/timeseries', map.deforestationTimeseries);
	app.get('/service/deforestation/states', map.deforestationStates);
	app.get('/service/deforestation/cities', map.deforestationCities);

}
