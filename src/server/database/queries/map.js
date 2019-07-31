module.exports = function(app) {

	var Internal = {}
	var Query = {};

	Query.defaultParams = {
		'type': 'biome',
		'region': 'Cerrado'
	}

	Query.extent = function() {
		return "SELECT ST_AsGeoJSON(geom) geojson FROM regions WHERE type=${type} AND value=${region}";
	}

	Query.search = function() {
		return "SELECT text, value, type FROM regions WHERE text ILIKE ${key}% AND type in ('state', 'city')";
	}

	Query.field = function() {
		return "SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs FROM pontos_campo";
	}

	return Query;

}