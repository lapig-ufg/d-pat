module.exports = function(app) {

    var Internal = {}
    var Query = {};

    Query.desmatperyear = function(params) {

        return [{
                id: 'desmat_per_year_prodes',
                sql: "SELECT p.year, SUM(ST_AREA(ST_Intersection(p.geom,up.geom)::GEOGRAPHY) / 1000000.0) as area_desmat FROM prodes_cerrado p INNER JOIN upload_shapes up on ST_INTERSECTS(p.geom, up.geom) where p.year IS NOT NULL and up.token= ${token} GROUP BY 1 order by 1 desc"
            },
            {
                id: 'desmat_per_year_deter',
                sql: "SELECT date_part('year', p.view_date) as year, SUM(ST_AREA(ST_Intersection(p.geom,up.geom)::GEOGRAPHY) / 1000000.0) as area_desmat FROM deter_cerrado p INNER JOIN upload_shapes up on ST_INTERSECTS(p.geom, up.geom) where  p.view_date IS NOT NULL and up.token= ${token} GROUP BY 1 order by 1 desc"
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
            }

        ]

    }


    Query.carspertoken = function(params) {
        return [{
                id: 'car',
                sql: "SELECT car.cod_car as codcar, SUM(ST_AREA(ST_Intersection(desmatamento.geom, car.geom)::GEOGRAPHY) / 1000000.0) as area_desmatada_per_car , SUM(ST_AREA(app.geom::GEOGRAPHY) / 1000000.0) as area_app_total_per_car, " +
                    "SUM(ST_AREA(rl.geom::GEOGRAPHY) / 1000000.0) as area_reserva_legal_total_per_car, SUM(ST_AREA(ST_Intersection(desmatamento.geom, rl.geom)::GEOGRAPHY) / 1000000.0) as area_desmat_rl_per_car, " +
                    "SUM(ST_AREA(ST_Intersection(desmatamento.geom, app.geom)::GEOGRAPHY) / 1000000.0) as area_desmat_app_per_car , " +
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
                id: 'next',
                sql: 'select true'
            }
        ]
    }

    Query.findgeojsonbytoken = function(params) {
        return [{
                id: 'area_upload',
                sql: "select token, SUM(ST_AREA(geom::GEOGRAPHY) / 1000000.0) as area_upload from upload_shapes where token= ${token} group by 1"
            },
            {
                id: 'geojson_upload',
                sql: "select ST_ASGEOJSON(ST_Transform(ST_Multi(ST_Union(geom)), 4674)) as geojson from upload_shapes where token= ${token}"
            },
            {
                id: 'next',
                sql: 'select true'
            }
        ]
    }

    Query.terraclass = function(params) {

        var token = params['token']
        return [{
                id: 'terraclass',
                sql: "SELECT b.name as lulc, b.color as color, SUM(ST_AREA(ST_Transform(ST_Intersection(p.geom, up.geom),4674)::GEOGRAPHY) / 1000000.0) as area_lulc FROM uso_solo_terraclass p INNER JOIN graphic_colors b on unaccent(b.name) ilike unaccent(p.classe) AND b.table_rel = 'uso_solo_terraclass' " +
                    " INNER JOIN upload_shapes up on ST_INTERSECTS(p.geom, up.geom) " +
                    " where up.token= ${token}" +
                    " GROUP BY 1,2 ORDER BY 3 DESC",
            },
            {
                id: 'focos_calor',
                sql: "select f.ano as year, count(f.fid) as qnt from focos_calor_2000a2020 f inner join upload_shapes up on st_contains(up.geom, f.geom) where f.ano >= 2013 AND up.token= ${token} group by 1 order by 1",
            },
        ]
    }

    Query.focos = function(params) {

        var token = params['token']
        return [{
                id: 'focos_calor',
                sql: "select f.ano as year, count(f.fid) as qnt from focos_calor_2000a2020 f inner join upload_shapes up on st_contains(up.geom, f.geom) where f.ano >= 2013 AND up.token= ${token} group by 1 order by 1",
            },
            {
                id: 'next',
                sql: 'select true'
            }
        ]
    }

    Query.queimadas = function(params) {

        var token = params['token']
        console.log(token)
        return [{
                id: 'queimadas_mcd64',
                sql: "SELECT p.year, SUM((ST_AREA(ST_Intersection(ST_MAKEVALID(p.geom),up.geom)::GEOGRAPHY) / 1000000.0)) as area_queimada FROM cicatrizes_2001a2020_mcd64a1 p " +
                    " INNER JOIN upload_shapes up on ST_INTERSECTS(p.geom, up.geom) where p.year IS NOT NULL and up.token= ${token} GROUP BY 1 order by 1 desc"
            },
            {
                id: 'queimadas_inpe',
                sql: "SELECT p.year, SUM((ST_AREA(ST_Intersection(ST_MAKEVALID(p.geom),up.geom)::GEOGRAPHY) / 1000000.0)) as area_queimada FROM cicatrizes_queimadas_2015a2019_inpe p " +
                    " INNER JOIN upload_shapes up on ST_INTERSECTS(p.geom, up.geom) where p.year IS NOT NULL and up.token= ${token} GROUP BY 1 order by 1 desc"
            },
            {
                id: 'next',
                sql: 'select true'
            }
        ]
    }


    return Query;

};