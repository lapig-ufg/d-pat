module.exports = function (app) {

	var Internal = {}
	var Query = {};

	Query.field = function (params) {

		let origin = params['origin']
		let gid = params['gid']

		console.log(origin, gid)

		return [
			{
				id: 'pontos_campo',
				sql: "SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs, " + origin + "_id as desmat_id, latitude, longitude, campo FROM pontos_campo where " + origin + "_id = " + gid
			},
			{
				id: 'desmatamento',
				sql: "SELECT areamunkm, sucept_desmat, sucept_desmat_peq, sucept_desmat_grd, bfm_pct as bfm, lat, long, rect_bbox(geom) as polygon, classefip FROM " + origin + "_cerrado WHERE gid = " + gid
			},
			{
				id: 'car',
				sql: "SELECT ST_AREA(ST_Intersection(desmatamento.geom, car.geom)::GEOGRAPHY) / 1000000.0 as area_desmatada , ST_AREA(app.geom::GEOGRAPHY) / 1000000.0 as area_app_total, "
					+ " ST_AREA(rl.geom::GEOGRAPHY) / 1000000.0 as area_reserva_legal_total, c.qnt_nascente as qnt_nascente, ST_AREA(ST_Intersection(desmatamento.geom, rl.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_rl, "
					+ " ST_AREA(ST_Intersection(desmatamento.geom, app.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_app , "
					+ " car.gid as cargid, car.cod_car as codcar, car.area_ha / 100.0 as areacar, car.data_ref as datarefcar, rect_bbox(car.geom) as bboxcar FROM car_desmat c "
					+ " INNER JOIN car_cerrado car on car.idt_imovel = c.idt_imovel"
					+ " INNER JOIN geo_car_reserva_legal_cerrado rl on rl.idt_imovel = c.idt_imovel "
					+ " INNER JOIN geo_car_app_cerrado app on app.idt_imovel = c.idt_imovel "
					+ " INNER JOIN " + origin + "_cerrado desmatamento on desmatamento.gid = c." + origin + "_id "
					+ " WHERE c." + origin + "_id = " + gid + " order by area_desmatada DESC"
			},
			{
				id: 'validacao_amostral',
				sql: "SELECT lon,lat,d_2000,d_2001,d_2002,d_2003,d_2004,d_2005,d_2006,d_2007,d_2008,d_2009,d_2010,d_2011,d_2012,d_2013,d_2014,d_2015,d_2016,d_2017,d_2018,classe,prodes_id FROM validacao_amostral WHERE prodes_id = " + gid
			},
			{
				id: 'abc',
				sql: "SELECT rect_bbox(prop.geom) as bboxprop, abc.*"
					+ " from prodes_fip_abc abc "
					+ " inner join fip_abc_cerrado_perimetro_prop prop on prop.chave_id = abc.chave_id "
					+ " where abc.prodes_id = " + gid + ";"
			},
			{
				id: 'areas_especiais',
				sql: "SELECT pd.ti_dist, ST_AREA(ST_Intersection(ti.geom,desmatamento.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_ti, ti.name as ti_nom, pd.ti_gid,"
					+ " rect_bbox(ST_Envelope(ST_Union(ti.geom,desmatamento.geom))) as bbox_ti,"
					+ " pd.q_dist, ST_AREA(ST_Intersection(q.geom, desmatamento.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_q, q.nm_comunid as q_nom, pd.q_gid,"
					+ " rect_bbox(ST_Envelope(ST_Union(desmatamento.geom,q.geom))) As bbox_q,"
					+ " pd.ucpi_dist, ST_AREA(ST_Intersection(ucpi.geom, desmatamento.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_ucpi, ucpi.nome as ucpi_nom, pd.ucpi_gid,"
					+ " rect_bbox(ST_Envelope(ST_Union(desmatamento.geom,ucpi.geom))) As bbox_ucpi,"
					+ " pd.ucus_dist, ST_AREA(ST_Intersection(ucus.geom, desmatamento.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_ucus, ucus.nome as ucus_nom, pd.ucus_gid,"
					+ " rect_bbox(ST_Envelope(ST_Union(desmatamento.geom,ucus.geom))) As bbox_ucus"
					// + " pd.ap_dist, ST_AREA(ST_Intersection(ap.geom, desmatamento.geom)::GEOGRAPHY) / 1000000.0 as area_desmat_ap, pd.ap_nom, pd.ap_gid,"
					// + " rect_bbox(ST_Envelope(ST_Union(desmatamento.geom,ap.geom))) As bbox_ap"
					+ " FROM " + origin + "_distancias pd"
					+ " INNER JOIN " + origin + "_cerrado desmatamento on desmatamento.gid = pd." + origin + "_id"
					+ " INNER JOIN terras_indigenas ti on pd.ti_gid = ti.gid"
					+ " INNER JOIN areas_quilombolas q on pd.q_gid = q.gid"
					+ " INNER JOIN ucs_protecao_integral ucpi on ucpi.gid = pd.ucpi_gid"
					+ " INNER JOIN ucs_uso_sustentavel ucus on ucus.gid = pd.ucus_gid"
					// + " INNER JOIN areas_prioritarias ap on ap.gid = pd.ap_gid"
					+ " WHERE desmatamento.gid = " + gid
			}

		]

	};

	Query.store = function (params) {
		params['params'] = Buffer.from(JSON.stringify(params['params'])).toString('base64');
		return [
			{
				id: 'store',
				sql: "INSERT INTO relatorios(\n" +
					"\ttoken, date,  params)\n" +
					"\tVALUES (${token}, NOW(), ${params}) RETURNING token;"
			},
			{
				id: 'next',
				sql: "select true"
			}
		]
	};

	Query.reportByToken = function (params) {
		return [
			{
				id: 'reportByToken',
				sql: "SELECT id, token, params, TO_CHAR(date,'DD/MM/YYYY HH:mm:ss') as data FROM relatorios WHERE token = '" + params['token'] + "';"
			},
			{
				id: 'next',
				sql: "select true"
			}
		]
	};

	return Query;

}
