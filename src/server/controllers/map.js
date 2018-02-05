var sqlite3 = require('sqlite3');

module.exports = function(app){
	var Map = {}

	var points = app.repository.collections.points;
	var database = new sqlite3.Database('/home/leandro/Tmp/FREL/d-pat.sqlite');

	Map.test = function(request, response){

		response.send({ 'ok': 'oh yeah !'})
		response.end()
		
	}

	Map.layers = function(request, response){

		result = {
			'years': {
				'values': [ 2000,2002,2004,2006,2008,2010,2013,2015 ],
				'start': 2000,
				'end': 2015
			},
			'layers': [
				/*{ 
					'id': 'fip_limite_cerrado',
					'ows_layer': 'fip_limite_cerrado',
					'enabled': true,
					'sendYears':false,
					'label': 'Limite do bioma Cerrado',
					'options': false,
					'showLegend': false,
					'minZoom': 0
				},*/
				{ 
					'id': 'desmatamento',
					'enabled': true,
					'utfgrid': true,
					'label': 'Desmatamento acumulado por',
					'sendYears':true,
					'showLegend': true,
					'minZoom': 0,
					'options': {
							'selectedValue': 'municipio',
							'values': [
								{ 
									'label': 'Estado',
									'id': 'uf',
									'ows_layer': 'fip_estados_desmatamento'
								},
								{ 
									'label': 'Município', 
									'id': 'municipio',
									'ows_layer': 'fip_municipios_desmatamento'
								}
							]
						}
				},
				/*{ 
					'id': 'desmatamento',
					'label': 'Polígonos de desmatamento',
					'options': false
				},*/
				{ 
					'id': 'fip_poligonos_desmatamento',
					'ows_layer': 'fip_poligonos_desmatamento',
					'enabled': false,
					'sendYears':true,
					'label': 'Polígonos de desmatamento - {start_year} a {end_year}',
					'options': false,
					'showLegend': false,
					'minZoom': 8
				},
		
				{ 
					'id': 'landsat_start',
					'ows_layer': 'bi_ce_mosaico_landsat_30_{start_year}_lapig',
					'enabled': false,
					'label': 'Mosaico Landsat - {start_year}',
					'options': false,
					'showLegend': false,
					'minZoom': 0
				},
				{ 
					'id': 'landsat_end',
					'ows_layer': 'bi_ce_mosaico_landsat_30_{end_year}_lapig',
					'enabled': false,
					'label': 'Mosaico Landsat - {end_year}',
					'options': false,
					'showLegend': false,
					'minZoom': 0
				}
			]
		}

		response.send(result)
		response.end()
		
	}

	Map.charts = function(request, response) {

		var processTimeseries = function(rows, result) {
			result.timeseries[0].name = 'Área desmatada';
			result.timeseries[0].series = rows;
			result.deforestation = 0;

			for(var i=0; i < result.timeseries[0].series.length; i++) {
				var year = result.timeseries[0].series[i].name;
				var newName = year-2 + ' - ' + year;
				result.timeseries[0].series[i].name = newName;
				result.timeseries[0].series[i].year = year;
			}

			return result;
		}

		var sqlTimeseries = 'SELECT ano as name, SUM(area_km2) as value FROM fip_municipios_desmatamento GROUP BY ano ORDER BY ano asc'

		var result = {
			'timeseries': [
				{}
			]
		}

		database.all(sqlTimeseries, function(err, rows) {
			result = processTimeseries(rows, result)
			response.send(result)
			response.end()
		});

	}

	Map.chartByYear = function(request, response) {

		var staryear = request.param('startyear', 2000);
		var endyear = request.param('endyear', 2015);

		var processState = function(rows, result) {
			result.state = rows;
			return result;
		}

		var sqlState = 'SELECT nome as name, SUM(d.area_km2) as value FROM fip_estados_desmatamento d INNER JOIN fip_estados e 	ON d.codigo = e.geocodigo '
			+ ' WHERE ano >= ' + staryear + ' AND ano <= ' + endyear 
			+ ' GROUP BY 1 ORDER BY 2 desc '
		
		var sqlCities = 'SELECT e.nome as name, SUM(d.area_km2) as value FROM fip_municipios_desmatamento d INNER JOIN fip_municipios e ON d.codigo = e.geocodigo'
			+ ' WHERE ano >= ' + staryear + ' AND ano <= ' + endyear 
			+ ' GROUP BY 1'
			+ ' ORDER BY 2 desc'
			+ ' LIMIT 10'

		var result = {
			'state': []
		}

		database.all(sqlState, function(err, rows) {
			result = processState(rows, result)
			database.all(sqlCities, function(err, rows) {
				result.cities = rows;
				response.send(result)
				response.end()
			});
		});

	}

	return Map;
}