var fs = require('fs');
const req = require('request');
var languageJson = require('../assets/lang/language.json');

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

	function numberFormat(numero) {
		numero = numero.toFixed(2).split('.');
		numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
		return numero.join(',');
	}

	Controller.timeseries = function (request, response) {

		var statePreposition = [
			"AL",
			"GO",
			"MT",
			"MS",
			"MG",
			"PE",
			"RO",
			"RR",
			"SC",
			"SP",
			"SE"
		];

		var type = request.param('type')
		var region = request.param('region')
		var language = request.param('lang')

		var queryResult = request.queryResult["timeseries"]

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


		var queryResultExtent = request.queryResult["extent"]

		var areaRegion = queryResultExtent[0].arearegion

		var percentArea = (anthropicArea * 100) / areaRegion


		var regionTypeBr = ""
		if (language == "pt-br") {

			regionTypeBr = "O bioma ";

			if (type == "city") {
				regionTypeBr = "O Município de ";
			} else if (type == "state") {
				if (statePreposition.find(e => e === region))
					regionTypeBr = "O Estado de ";
				else if (region === "BA" || region === "PB")
					regionTypeBr = "O Estado da ";
				else regionTypeBr = "O Estado do ";
			}

			regionTypeBr += queryResultExtent[0].name

		}
		else if(language == "en-us"){
			regionTypeBr = "The " + region + " " + type;

			if (type == "city") {
				regionTypeBr = "The City of " + queryResultExtent[0].name;
			} else if (type == "state") {
					regionTypeBr = "The State of " + queryResultExtent[0].name;
			}
		}

		var text = languageJson["charts_box_timeseries"]["text"][language].split("?");

		result = {
				title: languageJson["charts_box_title"][language],
				label: languageJson["charts_box_timeseries"]["label"][language],
				name: languageJson["charts_box_timeseries"]["name"][language],
				series: series,
				indicator: {
					anthropic: anthropicArea,
					deforestation: deforestationArea,
					totalArea: 2045064
				},
				getText: regionTypeBr + text[1] + numberFormat(parseFloat(anthropicArea)) + text[2] + numberFormat(parseFloat(percentArea)) + text[3],
				  type: "line"

		}

		response.send(result)
		response.end()

	}

	Controller.states = function (request, response) {

		var language = request.param('lang')

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
				label: languageJson["charts_box_states"]["label"][language],
				description: languageJson["charts_box_states"]["description"][language],
				nameChart: languageJson["charts_box_states"]["name"][language],
				series: regionResult
		}

		response.send(result)
		response.end()

	}

	Controller.cities = function (request, response) {

		var language = request.param('lang')

		var queryResult = request.queryResult

		var index = 1;
		for (var i = 0; i < 10; i++) {
			queryResult[i].index = index++ + 'º'
			queryResult[i].value = Number(queryResult[i].value)
		}

		var result = {
			label: languageJson["charts_box_cities"]["label"][language],
			description: languageJson["charts_box_cities"]["description"][language],
			title: languageJson["charts_box_cities"]["title"][language],
			tooltip: languageJson["charts_box_cities"]["tooltip_text"][language],
			series: queryResult
		}

		response.send(result)
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

	Controller.illegal = function (request, response) {

		var language = request.param('lang')

		var queryResultAPP = request.queryResult["app"];


		var index = 1;
		for (var i = 0; i < 10; i++) {
			queryResultAPP[i].index = (index++) + 'º'
			queryResultAPP[i].value = Number(queryResultAPP[i].value)
		}


		var queryResultRL = request.queryResult["rl"];
		index = 1;
		for (var i = 0; i < 10; i++) {
			queryResultRL[i].index = (index++) + 'º'
			queryResultRL[i].value = Number(queryResultRL[i].value)
		}



		var resultAPP = {
			label: languageJson["charts_box_app"]["label"][language],
			description: languageJson["charts_box_app"]["description"][language],
			titles: languageJson["charts_box_cities"]["title"][language],
			series: queryResultAPP
		}

		var resultRL = {
			label: languageJson["charts_box_rl"]["label"][language],
			description: languageJson["charts_box_rl"]["description"][language],
			titles: languageJson["charts_box_cities"]["title"][language],
			series: queryResultRL
		}

		response.send({
			resultAPP,
			resultRL
		})
		response.end()

	}


	return Controller;
}