module.exports = function (app) {

    var Internal = {}
    var Query = {};

    Query.desmatperyear = function (params) {

        return [{
            id: 'desmat_per_year_prodes',
            sql: "SELECT p.year, SUM(ST_AREA(safe_intersection(p.geom,up.geom)::GEOGRAPHY) / 1000000.0) as area_desmat FROM prodes_cerrado p INNER JOIN upload_shapes up on ST_INTERSECTS(p.geom, up.geom) where p.year IS NOT NULL and up.token= ${token} GROUP BY 1 order by 1 desc"
        },
        {
            id: 'desmat_per_year_deter',
            sql: "SELECT date_part('year', p.view_date) as year, SUM(ST_AREA(safe_intersection(p.geom,up.geom)::GEOGRAPHY) / 1000000.0) as area_desmat FROM deter_cerrado p INNER JOIN upload_shapes up on ST_INTERSECTS(p.geom, up.geom) where  p.view_date IS NOT NULL and up.token= ${token} GROUP BY 1 order by 1 desc"
        },
        {
            id: 'regions_pershape',
            sql: "select r.type as type , unaccent(r.text), r.text as value  from regions r INNER JOIN upload_shapes up on ST_Intersects(up.geom,r.geom ) where r.type not in ('biome') and up.token= ${token} group by 1,2,3 order by 2"
        },
        {
            id: 'area_upload',
            sql: "select token, SUM(ST_AREA(geom::GEOGRAPHY) / 1000000.0) as area_upload from upload_shapes where token= ${token} group by 1"
        },
        {
            id: 'geojson_upload',
            sql: "select  ST_ASGEOJSON(ST_Transform(ST_Multi(ST_Union(geom)), 4674)) as geojson from upload_shapes where token= ${token} "
        },
        {
            id: 'car',
            sql: "SELECT car.cod_car as codcar, SUM(ST_AREA(safe_intersection(desmatamento.geom, car.geom)::GEOGRAPHY) / 1000000.0) as area_desmatada_per_car , SUM(ST_AREA(app.geom::GEOGRAPHY) / 1000000.0) as area_app_total_per_car, " +
                "SUM(ST_AREA(rl.geom::GEOGRAPHY) / 1000000.0) as area_reserva_legal_total_per_car, SUM(ST_AREA(safe_intersection(desmatamento.geom, rl.geom)::GEOGRAPHY) / 1000000.0) as area_desmat_rl_per_car, " +
                "SUM(ST_AREA(safe_intersection(desmatamento.geom, app.geom)::GEOGRAPHY) / 1000000.0) as area_desmat_app_per_car , " +
                "SUM(car.area_ha / 100.0) as areacar FROM car_desmat c " +
                "INNER JOIN car_cerrado car on car.idt_imovel = c.idt_imovel " +
                "INNER JOIN geo_car_reserva_legal_cerrado rl on rl.idt_imovel = c.idt_imovel  " +
                " INNER JOIN geo_car_app_cerrado app on app.idt_imovel = c.idt_imovel " +
                " INNER JOIN  prodes_cerrado desmatamento on desmatamento.gid = c.prodes_id " +
                " INNER JOIN upload_shapes up on ST_INTERSECTS(up.geom, car.geom) " +
                " WHERE desmatamento.year >= 2013 and up.token= ${token}" +
                "group by 1 order by 2 desc limit 50"
        },
        {
            id: 'make_valid_geom',
            sql: "select ST_Transform(ST_MAKEVALID(geom), 4674) from upload_shapes where token= ${token} "
        },
        ]

    }



    return Query;

};