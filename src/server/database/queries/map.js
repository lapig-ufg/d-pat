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
		return "SELECT text, value, type FROM regions WHERE text ILIKE ${key}% AND type in ('state', 'city') LIMIT 10";
	}

	Query.field = function(params) {
		
		let origin = params['origin']
		let gid = params['gid']

		if(origin == 'prodes'){
			return [
				{
					id: 'pontos_campo',
					sql:"SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs, prodes_id as desmat_id, latitude, longitude FROM pontos_campo limit 5"
				},
				{
					id: 'prodes',
					sql: "SELECT areamunkm, sucept_desmat, bfm_pct as bfm, lat, long, rect_bbox(geom) as polygon FROM prodes_cerrado WHERE gid = ${gid}"
					// sql: "SELECT ST_AsGeoJSON(geom) geojson, area_km2 FROM regions WHERE type=${type} AND value=${region}"
				}
			]
		}
		else{
			return [
				{
					id: 'pontos_campo',
					sql:"SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs, deter_id as desmat_id, latitude, longitude FROM pontos_campo limit 5"
				},
				{
					id: 'deter',
					sql: "SELECT areamunkm, sucept_desmat, null as bfm, lat, long, rect_bbox(geom) as polygon FROM deter_cerrado WHERE gid = ${gid}"
				}
			]
		}
	}

	return Query;

}