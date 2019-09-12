var fs = require('fs');
const req = require('request');

module.exports = function (app) {

	const config = app.config;

	var Internal = {}
	var Controller = {}

	Controller.periods = function (request, response) {

		var queryResult = request.queryResult

		var result = []
		var years = []

		queryResult.forEach(function (row) {
			if (row.classname.startsWith('D')) {
				years.push(Number(row.classname.slice(2)))
			}
		})

		for (var i = 0; i < years.length - 1; i++) {
			result.push({
				startYear: years[i + 1],
				endYear: years[i],
				label: years[i + 1] + '/' + years[i]
			})
		}

		response.send(result)
		response.end();

	}

	Controller.timeseries = function (request, response) {

		var queryResult = request.queryResult
		
		var indicatorYear = Number(request.param('year', 2018));;

		var anthropicArea = 0
		var deforestationArea = 0

		var result
		var resultByYear = {}

		queryResult.forEach(function (row) {

			var year = Number(row['year'])
			var area = Number(row['areamunkm'])

			if (year > 2000) {
				if (!resultByYear[year])
					resultByYear[year] = 0.0

				resultByYear[year] += area

			} else {
				anthropicArea += area
			}

		})

		for (i = 2001; i < 2012; i = i + 2) {
			resultByYear[i] = resultByYear[i + 1] / 2
			resultByYear[i + 1] = resultByYear[i + 1] / 2
		}

		var series = []

		for (var year in resultByYear) {

			series.push({
				'name': year,
				'value': resultByYear[year],
				'year': year
			})

			if (year < indicatorYear) {
				anthropicArea += resultByYear[year]
			} else if (year == (indicatorYear)) {
				deforestationArea = resultByYear[year]
			}
		}

		result = {
			name: "Área desmatada",
			series: series,
			indicator: {
				anthropic: anthropicArea,
				deforestation: deforestationArea,
				totalArea: 2045064
			}
		}

		response.send(result)
		response.end()

	}

	Controller.states = function (request, response) {

		var year = Number(request.param('year', 2017));

		var queryResult = request.queryResult

		var resultBySource = {
			prodes_amz: {},
			prodes_cerrado: {}
		}

		queryResult.forEach(function (row) {
			region = row['region']
			source = row['source']
			if (region) {
				if (!resultBySource[region])
					resultBySource[source][region] = 0.0

				resultBySource[source][region] += Number(row['areamunkm'])
			}

		})

		var regionResult = [];

		for (var region in resultBySource['prodes_cerrado']) {
			if (resultBySource['prodes_amz'] && resultBySource['prodes_amz'][region] && year != 2008) {
				resultBySource['prodes_cerrado'][region] += resultBySource['prodes_amz'][region]
			}

			regionResult.push({
				'name': region,
				'value': resultBySource['prodes_cerrado'][region],
			})
		}

		var result = {
			series: regionResult
		}

		response.send(result)
		response.end()

	}

	Controller.cities = function (request, response) {

		var queryResult = request.queryResult

		var index = 1;
		for (var i = 0; i < 10; i++) {
			queryResult[i].index = index++ + 'º'
			queryResult[i].value = Number(queryResult[i].value)
		}

		response.send(queryResult)
		response.end()

	}

	Controller.largest = function (request, response) {

		var queryResult = request.queryResult

		response.send(queryResult[0])
		response.end()

	}

	Controller.infoUTFGrid = function (request, response) {
		var layername = request.param('layername');
		var filter = request.param('msfilter');
		var tile = request.param('tile');

		req(
			config["ows_host"] + '/ows?layers=' + layername + '&MSFILTER=' + filter + '&mode=tile&tile=' + tile + '&tilemode=gmap&map.imagetype=utfgrid', {
			json: true
		}, (err, res, body) => {
			if (err) {
				return console.log(err);
			}
			response.send(body)
			response.end();
		});



	}
	return Controller;
}