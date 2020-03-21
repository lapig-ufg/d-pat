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
				sql: "SELECT areamunkm, sucept_desmat, sucept_desmat_peq, sucept_desmat_grd, bfm_pct as bfm, lat, long, rect_bbox(geom) as polygon, classefip FROM " + origin + "_cerrado WHERE gid = " + gid 
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
			},
			{
				id: 'validacao_amostral',
				sql: "SELECT lon,lat,d_2000,d_2001,d_2002,d_2003,d_2004,d_2005,d_2006,d_2007,d_2008,d_2009,d_2010,d_2011,d_2012,d_2013,d_2014,d_2015,d_2016,d_2017,d_2018,classe,prodes_id FROM validacao_amostral WHERE prodes_id = " + gid 
			}

		]

	}

	return Query;

}