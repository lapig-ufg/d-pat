var sqlite3 = require('sqlite3');
var pg = require('pg');

module.exports = function(app){
	var Map = {}

	var points = app.repository.collections.points;
	var database = new sqlite3.Database(app.config.dbpath);

	var conString = "postgres://postgres@localhost:5433/fip_cerrado";
	var client = new pg.Client(conString);
	client.connect();

	Map.charts = function(request, response) {

		sqlQuery1 = " SELECT classname, source, SUM(areamunkm) as areamunkm " +
								" FROM prodes_cerrado " +
								" GROUP BY 1,2;";

		var result = {
			'timeseries': []
		}

		client.query(sqlQuery1, (err, res) => {

			var resultBySource = {
				prodes_amz: {},
				prodes_cerrado: {}
			}

			res.rows.forEach(function(row) {
				year = Number(row['classname'].split('_')[1])
				source = row['source']
				
				if(!isNaN(year) && year > 2000) {
					
					if (!resultBySource[year])
						resultBySource[source][year] = 0.0
					
					resultBySource[source][year] += Number(row['areamunkm'])

				}

			})

			for (i=2001; i < 2012; i = i + 2){
				resultBySource['prodes_cerrado'][i] = resultBySource['prodes_cerrado'][i+1] / 2
				resultBySource['prodes_cerrado'][i+1] = resultBySource['prodes_cerrado'][i+1] / 2
			}

			/*
			for (i=2001; i <= 2008; i++){
				resultBySource['prodes_amz'][i] = resultBySource['prodes_amz'][2008] / (2008 - 1988)
			}*/

			for (i=2009; i < 2012; i = i + 2){
				resultBySource['prodes_amz'][i] = resultBySource['prodes_amz'][i+1] / 2
				resultBySource['prodes_amz'][i+1] = resultBySource['prodes_amz'][i+1] / 2
			}

			var series = []

			for(var year in resultBySource['prodes_cerrado']) {
				if(resultBySource['prodes_amz'][year] && year != 2008) {
					resultBySource['prodes_cerrado'][year] += resultBySource['prodes_amz'][year]
				}

				series.push({
					'name': year,
					'value': resultBySource['prodes_cerrado'][year],
					'year': year
				})
			}

			result.timeseries.push({
				name: "Área desmatada",
				series: series
			})

		  response.send(result)
			response.end()

		})
	}

	Map.periods = function(request, response) {
		sqlQuery = " SELECT DISTINCT classname FROM prodes_cerrado ORDER BY classname DESC;";

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

	Map.chartByYear = function(request, response) {

		var year = request.param('year', 2017);

		var classname = 'D_'+year
		if (year < 2013 && year % 2 != 0)
			classname = 'D_'+(Number(year)+1)
		
		var stateQuery = " SELECT INITCAP(uf) AS region, source, SUM(areamunkm) as areamunkm " +
								" FROM prodes_cerrado " +
								" WHERE classname = '" + classname + "'" +
								" GROUP BY 1,2 " +
								" ORDER BY 3 DESC;";

		var citiesQuery = " SELECT county AS name, INITCAP(uf) as uf," +
									( Number(year) < 2013 ? "SUM(areamunkm)/2" : "SUM(areamunkm)" )  + " as value "+
								" FROM prodes_cerrado " +
								" WHERE classname = '" + classname + "' AND areamunkm > 0" +
									( classname == 'D_2008' ? "AND source != 'prodes_amz'" : '' ) +
								" GROUP BY 1,2 " +
								" ORDER BY 3 DESC" +
								" LIMIT 10;";

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

		var processCitiesResult = function(citiesResult) {
			var index = 1;
			for(var i=0; i < 10; i++) {
				citiesResult.rows[i].index = index++ + 'º'
				citiesResult.rows[i].value = Number(citiesResult.rows[i].value)
			}
			return citiesResult.rows
		}

		client.query(stateQuery, (err, stateResult) => {
			var state = processStateRows(stateResult)
			client.query(citiesQuery, (err, citiesResult) => {
				var cities = processCitiesResult(citiesResult)
				response.send({
					'state': state,
					'cities': citiesResult.rows
				})
				response.end()
			})
		})

	}

	return Map;
}