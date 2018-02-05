module.exports = function(app){
	var Map = {}

	var points = app.repository.collections.points;
	
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

	Map.info = function(request, response) {
		var startyear = request.param('startyear');
		var endyear = request.param('endyear');

		var result = {
			"version": "2.1.0",
			"grids": [
				"http://maps.lapig.iesa.ufg.br/ows?layers=fip_municipios_desmatamento&mode=tile&tile={x}+{y}+{z}&tilemode=gmap&map.imagetype=utfgrid"
				+"&startyear="+startyear+"&endyear="+endyear
			]
		}

		response.send(result)
		response.end()
	}

	return Map;
}