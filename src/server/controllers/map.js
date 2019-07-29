var fs = require('fs');

module.exports = function(app){
	var Map = {}
	var Internal = {}

	var client = app.database.client
	var queries = app.database.queries.map

	Internal.getFiles = function(path) {
		if (fs.existsSync(path)) {
	    return fs.readdirSync(path)
	  } else{
	  	return []
	  }
	}

	Internal.fieldFiles = function(id) {

		var fotosCamera = app.config.fieldDataDir + '/fotos_camera/' + id
		var fotosDrone = app.config.fieldDataDir + '/fotos_drone/' + id
		var videosDrone = app.config.fieldDataDir + '/videos_drone/' + id

		return {
			'videos_drone': Internal.getFiles(videosDrone),
			'fotos_drone': Internal.getFiles(fotosDrone),
			'fotos_camera': Internal.getFiles(fotosCamera)
		}

	}

	Map.fieldData = function(request, response) {
		var id = request.param('id')
		var category = request.param('category')
		var filename = request.param('filename')

		var filepath = app.config.fieldDataDir + '/' + category + '/' + id + '/' + filename

		response.sendFile(filepath);

	}

	Map.fieldValidation = function(request, response) {
		
		var query = queries.fieldValidation()
		var callback = function(queryResult) {
			var result = []

			queryResult.rows.forEach(function(row) {

				var campoId = row['campo_id']
				var files = Internal.fieldFiles(campoId)

				result.push({
					'type': 'Feature',
        	'geometry': JSON.parse(row['geojson']),
        	'properties': {
        		'campo_id': campoId,
        		'data': row['data'],
        		'usocobertura': row['cobertura'],
        		'obs': row['obs'],
        		'videos_drone': files['videos_drone'],
        		'fotos_drone': files['fotos_drone'],
        		'fotos_camera': files['fotos_camera']
        	}
				})
			})

			response.send({
				"type": "FeatureCollection",
				"features": result
			})
	    response.end();

		};

		client.query(query, callback);

	}

	Map.extent = function(request, response) {

		var type = request.param('type', '');
		var region = request.param('region', '');

		var query = queries.extent()
		var params = [type, region]
		var callback = function(queryResult) {
			var result = {
          'type': 'Feature',
          'geometry': JSON.parse(queryResult.rows[0]['geojson'])
        }

				response.send(result)
		    response.end();
		}

		client.query(query, params, callback);

	}

	Map.search = function(request, response) {

		var key = request.param('key', '');
		
		var query = queries.search()
		var params = [ key+'%' ]
		var callback = function(queryResult) {
			response.send(queryResult.rows)
	    response.end();
		}

		client.query(query, params, callback);

	}

	Map.periods = function(request, response) {
		
		var query = queries.periods()
		var callback = function(queryResult) {
			var result = []
	    var years = []

	    queryResult.rows.forEach(function(row) {
	    	if (row.classname.startsWith('D')){
	    		years.push(Number(row.classname.slice(2)))
	    	}
	    })

	    for(var i=0; i < years.length-1; i++) {
	    	result.push({
	    		startYear: years[i+1],
	    		endYear: years[i],
	    		label: years[i+1] + '/' + years[i]
	    	})
	    }

			response.send(result)
	    response.end();
		}

		client.query(query, callback);

	}

	Map.indicators = function(request, response) {
		var year = request.param('year', 2017);
		var type = request.param('type', '');
		var region = request.param('region', '');
		
		var query = queries.indicators(type, region)
		var callback = function(queryResult) {
			response.send(queryResult.rows)
			response.end()
		}
		
		client.query(query, callback)
	}

	Map.deforestationTimeseries = function(request, response) {

		var type = request.param('type', '');
		var region = request.param('region', '');
		var indicatorYear = Number(request.param('year', 2016));

		var query = queries.deforestationTimeseries(type, region)
		var callback = function(queryResult) {
			
			var anthropicArea = 0
			var deforestationArea = 0

			var result = []
			var resultByYear = {}

			queryResult.rows.forEach(function(row) {
				
				var year = Number(row['year'])
				var area = Number(row['areamunkm'])
				
				if(year > 2000) {
					if (!resultByYear[year])
						resultByYear[year] = 0.0
					
					resultByYear[year] += area

				} else {
					anthropicArea += area
				}

			})

			for (i=2001; i < 2012; i = i + 2){
				resultByYear[i] = resultByYear[i+1] / 2
				resultByYear[i+1] = resultByYear[i+1] / 2
			}

			var series = []

			for(var year in resultByYear) {

				series.push({
					'name': year,
					'value': resultByYear[year],
					'year': year
				})
				
				if(year <= indicatorYear) {
					anthropicArea += resultByYear[year]
				} else if(year == (indicatorYear+1)) {
					deforestationArea = resultByYear[year]
				}
			}

			result.push({
				name: "Área desmatada",
				series: series,
				indicator: {
					anthropic: anthropicArea,
					deforestation: deforestationArea,
					cerrado: 2045064
				}
			})

		  response.send(result)
			response.end()

		}

		client.query(query, callback)
	}

	Map.deforestationStates = function(request, response) {
		var year = request.param('year', 2017);

		var classname = 'D_'+year
		if (year < 2013 && year % 2 != 0)
			classname = 'D_'+(Number(year)+1)

		var query = queries.deforestationStates()
		var params = [ classname ]
		var callback = function(queryResult) {
			var resultBySource = {
				prodes_amz: {},
				prodes_cerrado: {}
			}

			queryResult.rows.forEach(function(row) {
				region = row['region']
				source = row['source']
				if(region) {
					if (!resultBySource[region])
						resultBySource[source][region] = 0.0
					
					resultBySource[source][region] += Number(row['areamunkm'])
				}

			})

			var regionResult = []

			for(var region in resultBySource['prodes_cerrado']) {
				if(resultBySource['prodes_amz'] && resultBySource['prodes_amz'][region] && year != 2008) {
					resultBySource['prodes_cerrado'][region] += resultBySource['prodes_amz'][region]
				}

				regionResult.push({
					'name': region,
					'value': resultBySource['prodes_cerrado'][region],
				})
			}

			response.send(regionResult)
			response.end()
		}

		client.query(query, params, callback)

	}

	Map.deforestationCities = function(request, response) {

		var year = request.param('year', 2017);
		var type = request.param('type', '');
		var region = request.param('region', '');

		var classname = 'D_'+year
		if (year < 2013 && year % 2 != 0)
			classname = 'D_'+(Number(year)+1)

		var params = [ classname ]
		var query = queries.deforestationCities(year, type, region)
		var callback = function(queryResult) {
			var index = 1;
			for(var i=0; i < 10; i++) {
				queryResult.rows[i].index = index++ + 'º'
				queryResult.rows[i].value = Number(queryResult.rows[i].value)
			}
			
			response.send(queryResult.rows)
			response.end()
		}

		client.query(query, params, callback)

	}

	return Map;
}