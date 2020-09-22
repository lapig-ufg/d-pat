module.exports = function (app) {

    var Internal = {}
    var Query = {};

    Query.desmatperyear = function (params) {

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
            sql: "select r.type as type , r.text as value from regions r INNER JOIN upload_shapes up on ST_Intersects(up.geom,r.geom ) where r.type not in ('biome') and up.token= ${token} group by 1,2 order by 1,2"
        },
        {
            id: 'info_upload',
            sql: "select ST_ASGEOJSON(geom) as geojson,  SUM(ST_AREA(geom::GEOGRAPHY) / 1000000.0) as area_upload from upload_shapes where token= ${token} group by 1"
        },
        ]

    }



    return Query;

};