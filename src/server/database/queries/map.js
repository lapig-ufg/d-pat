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

		return [
			{
				id: 'pontos_campo',
				sql:"SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs, " + origin +"_id as desmat_id, latitude, longitude, campo FROM pontos_campo where " + origin +"_id = " + gid
			},
			{
				id: 'desmatamento',
				sql: "SELECT areamunkm, sucept_desmat, bfm_pct as bfm, lat, long, rect_bbox(geom) as polygon FROM " + origin + "_cerrado WHERE gid = " + gid 
				// sql: "SELECT ST_AsGeoJSON(geom) geojson, area_km2 FROM regions WHERE type=${type} AND value=${region}"
			},
			{
				id: 'car',
				sql:"SELECT ST_AREA(ST_Intersection(desmatamento.geom, car.geom)::GEOGRAPHY) / 1000000.0 as area_desmatada , ST_AREA(app.geom::GEOGRAPHY) / 1000000.0 as area_app_total, "
				+ " ST_AREA(rl.geom::GEOGRAPHY) / 1000000.0 as area_reserva_legal_total, c.qnt_nascente as qnt_nascente, ST_AREA(ST_Intersection(desmatamento.geom, rl.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_rl, "
				+ " ST_AREA(ST_Intersection(desmatamento.geom, app.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_app , "
				+ " car.gid as cargid, car.cod_car as codcar, car.area_ha / 100.0 as areacar, car.data_ref as datarefcar, rect_bbox(car.geom) as bboxcar FROM car_desmat c "
				+ " INNER JOIN car_cerrado car on car.idt_imovel = c.idt_imovel" 
				+ " INNER JOIN geo_car_reserva_legal_cerrado rl on rl.idt_imovel = c.idt_imovel "
				+ " INNER JOIN geo_car_app_cerrado app on app.idt_imovel = c.idt_imovel "
				+ " INNER JOIN "+ origin + "_cerrado desmatamento on desmatamento.gid = c." + origin + "_id "
				+ " WHERE c."+ origin + "_id = " + gid  + " order by area_desmatada DESC"				
			}
		]

	}

	return Query;

}