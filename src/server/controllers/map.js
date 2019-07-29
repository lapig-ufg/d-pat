var pg = require('pg');
var fs = require('fs');

module.exports = function(app){
	var Map = {}
	var Internal = {}

	var client = new pg.Client({
	  user: 'postgres',
	  host: '10.0.0.14',
	  database: 'fip_cerrado',
	  password: 'postgres',
	  port: 5432,
	});
	client.connect();

	Internal.regionFilter = function(type, region) {
		if (type == 'city')
  		return " AND county = '"+region+"'"
  	else if (type == 'state')
  		return "AND uf = '"+region+"'"
  	else
  		return ''
	}

	Internal.getFiles = function(path) {
		console.log(path, fs.existsSync(path))
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

	/*
	Just use HTTP straight-up. No need to use web sockets for one-way communication.
	Use Express to serve that file statically. Then in your video tag, src="path/video.mp4".
	*/

	Map.fieldData = function(request, response) {
		var id = request.param('id')
		var category = request.param('category')
		var filename = request.param('filename')

		var filepath = app.config.fieldDataDir + '/' + category + '/' + id + '/' + filename

		console.log(filepath)
		response.sendFile(filepath);

	}

	Map.fieldValidation = function(request, response) {

		var sqlQuery = "SELECT ST_AsGeoJSON(geom) geojson, campo_id, data, cobertura, obs " +
										"FROM prodes_cerrado_campo";
		console.log(sqlQuery)
		client.query(sqlQuery, (err, queryResult) => {
			if (err) {
				response.end()
			} else {
				
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
			}
		});

	}

	Map.extent = function(request, response) {

		var type = request.param('type', '');
		var region = request.param('region', '');

		var sqlQuery = "SELECT ST_AsGeoJSON(geom) geojson FROM regions WHERE " +
							 " type='"+type+"'"+
							 " AND value='"+region+"';";
		
		client.query(sqlQuery, (err, queryResult) => {
			if (err) {
				response.end()
			} else {
				
				var result = {
          'type': 'Feature',
          'geometry': JSON.parse(queryResult.rows[0]['geojson'])
        }

				response.send(result)
		    response.end();
			}
		});

	}

	Map.search = function(request, response) {

		var key = request.param('key', '');

		sqlQuery = "SELECT text, value, type FROM regions WHERE text ILIKE '"+key+"%' AND type in ('state', 'city')";

		client.query(sqlQuery, (err, queryResult) => {
			response.send(queryResult.rows)
	    response.end();
		});

	}

	Map.periods = function(request, response) {
		sqlQuery = " SELECT DISTINCT classname FROM prodes_cerrado ORDER BY classname DESC;";
		console.log(sqlQuery)

		client.query(sqlQuery, (err, queryResult) => {
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
		});

	}

	Map.indicators = function(request, response) {
		var year = request.param('year', 2017);
		var type = request.param('type', '');
		var region = request.param('region', '');
		var regionFilter = Internal.regionFilter(type, region)

		var classname = 'D_'+year
		if (year < 2013 && year % 2 != 0)
			classname = 'D_'+(Number(year)+1)

		var sqlQuery = " SELECT classname, source, SUM(areamunkm) as areamunkm " +
								" FROM prodes_cerrado " +
								" WHERE classname != 'AGUA' " + Internal.regionFilter(type, region) +
								" GROUP BY 1,2 " +
								" ORDER BY classname ASC;";
		
		client.query(sqlQuery, (err, res) => {
			
			response.send(res.rows)
			response.end()
		})
	}

	Map.deforestationTimeseries = function(request, response) {

		var type = request.param('type', '');
		var region = request.param('region', '');
		var indicatorYear = Number(request.param('year', 2016));
		var regionFilter = Internal.regionFilter(type, region)

		sqlQuery1 = " SELECT year, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
								" FROM prodes_cerrado " +
								" WHERE year IS NOT NULL " + regionFilter +
								" GROUP BY 1;";

		var result = []
		console.log(sqlQuery1)
		client.query(sqlQuery1, (err, res) => {

			var anthropicArea = 0
			var deforestationArea = 0

			var resultByYear = {}

			res.rows.forEach(function(row) {
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

		})
	}

	Map.deforestationStates = function(request, response) {
		var year = request.param('year', 2017);

		var classname = 'D_'+year
		if (year < 2013 && year % 2 != 0)
			classname = 'D_'+(Number(year)+1)
		
		var stateQuery = " SELECT INITCAP(uf) AS region, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
								" FROM prodes_cerrado " +
								" WHERE classname = '" + classname + "'" + 
								" GROUP BY 1,2 " +
								" ORDER BY 3 DESC;";

		var processStateRows = function(queryResult) {
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

			return regionResult;
		}

		client.query(stateQuery, (err, stateResult) => {
			var state = processStateRows(stateResult)
			response.send(state)
			response.end()
		})

	}

	Map.deforestationCities = function(request, response) {

		var year = request.param('year', 2017);
		var type = request.param('type', '');
		var region = request.param('region', '');

		var classname = 'D_'+year
		if (year < 2013 && year % 2 != 0)
			classname = 'D_'+(Number(year)+1)

		var citiesQuery = " SELECT county AS name, INITCAP(uf) as uf," +
									( Number(year) < 2013 ? "SUM(areamunkm)/2" : "SUM(areamunkm)" )  + " as value "+
								" FROM prodes_cerrado " +
								" WHERE classname = '" + classname + "' AND areamunkm > 0" +
									( classname == 'D_2008' ? "AND source != 'prodes_amz'" : '' ) +
									Internal.regionFilter(type, region) +
								" GROUP BY 1,2 " +
								" ORDER BY 3 DESC" +
								" LIMIT 10;";

		var processCitiesResult = function(citiesResult) {
			var index = 1;
			for(var i=0; i < 10; i++) {
				citiesResult.rows[i].index = index++ + 'º'
				citiesResult.rows[i].value = Number(citiesResult.rows[i].value)
			}
			return citiesResult.rows
		}

		client.query(citiesQuery, (err, citiesResult) => {
			var cities = processCitiesResult(citiesResult)
			response.send(citiesResult.rows)
			response.end()
		})

	}

	return Map;
}