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

		/*if(origin == 'prodes'){
			return [
				{
					id: 'pontos_campo',
					sql:"SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs, prodes_id as desmat_id, latitude, longitude FROM pontos_campo where prodes_id = ${gid}"
				},
				{
					id: 'prodes',
					sql: "SELECT areamunkm, sucept_desmat, bfm_pct as bfm, lat, long, rect_bbox(geom) as polygon FROM prodes_cerrado WHERE gid = ${gid}"
					// sql: "SELECT ST_AsGeoJSON(geom) geojson, area_km2 FROM regions WHERE type=${type} AND value=${region}"
				},
				{
					id: 'car',
					sql:"SELECT rl.area_km2 as area_reserva_legal_total, ST_AREA(app.geom::GEOGRAPHY) as area_app_total, ST_AREA(ST_Intersection(prodes.geom, car.geom)) as area_desmatada, c.area_app as areaapp, c.qnt_nascente as qnt_nascente, c.area_reserva_legal as area_rl, car.gid as cargid, car.cod_car as codcar, car.area_ha as areacar, car.data_ref as datarefcar, rect_bbox(car.geom) as bboxcar FROM car_desmat c "
					+ " INNER JOIN car_cerrado car on car.idt_imovel = c.idt_imovel" 
					+ " INNER JOIN geo_car_reserva_legal_cerrado rl on rl.idt_imovel = c.idt_imovel "
					+ " INNER JOIN geo_car_app_cerrado app on app.idt_imovel = c.idt_imovel "
					+ " INNER JOIN prodes_cerrado prodes on prodes.gid = " + gid 
					+ " WHERE c.prodes_id = " + gid + " order by 1"				
				}
			]
		}
		else{
			return [
				{
					id: 'pontos_campo',
					sql:"SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs, deter_id as desmat_id, latitude, longitude FROM pontos_campo where deter_id = ${gid}"
				},
				{
					id: 'deter',
					sql: "SELECT areamunkm, sucept_desmat, null as bfm, lat, long, rect_bbox(geom) as polygon FROM deter_cerrado WHERE gid = ${gid}"
				},
				{
					id: 'car',
					sql:"SELECT rl.area_km2 as area_reserva_legal_total, ST_AREA(app.geom::GEOGRAPHY) as area_app_total, c.area_desmatada as area_desmatada, c.area_app as areaapp, c.qnt_nascente as qnt_nascente, c.area_reserva_legal as area_rl, car.gid as cargid, car.cod_car as codcar, car.area_ha as areacar, car.data_ref as datarefcar, rect_bbox(car.geom) as bboxcar FROM car_desmat c INNER JOIN car_cerrado car on car.idt_imovel = c.idt_imovel" 
					+ " INNER JOIN geo_car_reserva_legal_cerrado rl on rl.idt_imovel = c.idt_imovel "
					+ " INNER JOIN geo_car_app_cerrado app on app.idt_imovel = c.idt_imovel "
					+ " INNER JOIN deter_cerrado prodes on prodes.gid = ${gid}"
					+ " WHERE c.deter_id = ${gid} order by 1"
				}
			]
		}*/
		return [
			{
				id: 'pontos_campo',
				sql:"SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs, " + origin +"_id as desmat_id, latitude, longitude FROM pontos_campo where " + origin +"_id = " + gid
			},
			{
				id: 'prodes',
				sql: "SELECT areamunkm, sucept_desmat, bfm_pct as bfm, lat, long, rect_bbox(geom) as polygon FROM " + origin + "_cerrado WHERE gid = " + gid 
				// sql: "SELECT ST_AsGeoJSON(geom) geojson, area_km2 FROM regions WHERE type=${type} AND value=${region}"
			},
			{
				id: 'car',
				sql:"SELECT ST_AREA(ST_Intersection(prodes.geom, car.geom)::GEOGRAPHY) / 1000000 as area_desmatada , ST_AREA(app.geom::GEOGRAPHY) /1000000 as area_app_total, "
				+ " ST_AREA(rl.geom::GEOGRAPHY) / 1000000 as area_reserva_legal_total, c.area_app as areaapp, c.qnt_nascente as qnt_nascente, c.area_reserva_legal as area_rl, car.gid as cargid, car.cod_car as codcar, car.area_ha as areacar, car.data_ref as datarefcar, rect_bbox(car.geom) as bboxcar FROM car_desmat c "
				+ " INNER JOIN car_cerrado car on car.idt_imovel = c.idt_imovel" 
				+ " INNER JOIN geo_car_reserva_legal_cerrado rl on rl.idt_imovel = c.idt_imovel "
				+ " INNER JOIN geo_car_app_cerrado app on app.idt_imovel = c.idt_imovel "
				+ " INNER JOIN "+ origin + "_cerrado prodes on prodes.gid = c." + origin + "_id "
				+ " WHERE c."+ origin + "_id = " + gid  + " order by area_desmatada DESC"				
			}
		]

	}

	return Query;

}