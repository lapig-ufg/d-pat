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
					sql: "SELECT areamunkm, sucept_desmat, bfm_pct as bfm, lat, long, (ST_EXTENT((ST_BUFFER(geom::GEOGRAPHY,1000))::GEOMETRY)) as polygon FROM prodes_cerrado WHERE gid = ${gid} GROUP BY 1,2,3,4,5"
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
					sql: "SELECT areamunkm, sucept_desmat, null as bfm, lat, long, ST_EXTENT((ST_BUFFER(geom::GEOGRAPHY,1000))::GEOMETRY) as polygon FROM deter_cerrado WHERE gid = ${gid} GROUP BY 1,2,3,4,5"
				}
			]
		}
	}

	return Query;

}