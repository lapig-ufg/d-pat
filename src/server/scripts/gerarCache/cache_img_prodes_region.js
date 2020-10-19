var t = require('tiles-in-bbox'),
	async = require('async'),
	request = require('request');
var bottom = -33.752081
var left = -73.990450
var top = 5.271841
var right = -28.835908
// var layername = process.argv[2]
var layername = "cp_prodes_por_region_city_fip_img"
//var layername = "prodes_por_region_fip_utfgrid"
//var otherParams = "startyear=2000&endyear=2015"
// var otherParams = process.argv[3]
var multipleRequests = 10
/*var bbox = { bottom : -33.752081, left : -73.990450, top : 5.271841, right : -28.835908 } //Brazil*/
var bbox = { bottom: -24.6846260, left: -60.1094198, top: -2.3262773, right: -41.5220189 } //Cerrado

var years = [2002, 2004, 2006, 2008, 2010, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]

var urls = []

for (var year = (years.length - 1); year >= 0; year--) {
	console.log("Year: " + years[year])
	for (var zoom = 0; zoom <= 9; zoom++) {
		var tiles = t.tilesInBbox(bbox, zoom)

		tiles.forEach(function (tile) {
			var url = "http://127.0.0.1:3000/ows"
				+ "?layers=" + layername
				+ "&mode=tile"
				+ "&tilemode=gmap"
				+ "&map.imagetype=png"
				// + "&map.imagetype=utfgrid"
				+ "&tile=" + [tile.x, tile.y, tile.z].join('+')

			url += "&MSFILTER=1=1 AND year=" + years[year]

			urls.push(url)
		})
	}
}


var requests = []

urls.forEach(function (url) {
	requests.push(function (next) {
		console.log("Caching " + url)
		request(url, function (error, response, body) {
			next()
		});
	});
})

async.parallelLimit(requests, multipleRequests)
