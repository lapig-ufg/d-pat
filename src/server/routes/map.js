module.exports = function (app) {

	var map = app.controllers.map;
	
	app.get('/service/map/periods', map.periods);
	app.get('/service/map/charts', map.charts);
	app.get('/service/map/chartsByYear', map.chartByYear);


}
