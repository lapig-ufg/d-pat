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
				'values': [ 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2015 ],
				'start': 2000,
				'end': 2015
			},
			'layers': [
				{ 
					'id': 'desmatamento',
					'label': 'Área total desmatada por',
					'option': {
							'selectedValue': 'uf',
							'values': [
								{ 'label': 'Estado', 'id': 'uf'},
								{ 'label': 'Município', 'id': 'municipio' }
							]
						}
				},
				{ 
					'id': 'desmatamento',
					'label': 'Polígonos de desmatamento',
					'option': false
				},
				{ 
					'id': 'remanescente',
					'label': 'Vegetação natural remanescente - ',
					'option': false,
					'concatEndYear': true
				},
				{ 
					'id': 'landsat',
					'label': 'Mosaico Landsat - ',
					'option': false,
					'concatEndYear': true
				},
				{ 
					'id': 'landsat',
					'label': 'Mosaico Landsat - ',
					'option': false,
					'concatStartYear': true
				}
			]
		}

		response.send(result)
		response.end()
		
	}

	return Map;
}