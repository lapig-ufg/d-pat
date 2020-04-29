module.exports = function(app) {

	var Internal = {}
	var Query = {};

	Query.defaultParams = {
		'type': 'biome',
		'region': 'Cerrado'
	}

	Query.extent = function() {
		return "SELECT ST_AsGeoJSON(geom) geojson, area_km2 FROM regions WHERE type=${type} AND value=${region}";
	}

	Query.search = function() {
		return "SELECT text, value, type, cd_geocmu FROM regions WHERE unaccent(text) ILIKE unaccent(${key}%) AND type in ('state', 'city') LIMIT 10";
	}


	return Query;

}