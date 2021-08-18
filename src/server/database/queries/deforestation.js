module.exports = function(app) {

    var Internal = {}
    var Query = {};

    Query.defaultParams = {
        'year': 2019,
        'amount': 1
    }

    Internal.regionFilter = function(type, region) {

        if (type == 'city')
            return " AND county = ${region}"
        else if (type == 'state')
            return " AND uf = ${region}"
        else
            return ''
    }

    Query.periods = function() {
        return "SELECT DISTINCT classname FROM prodes_cerrado ORDER BY classname DESC";
    }

    Query.indicators = function(params) {

        var type = params['type']
        var region = params['region']
        var year = params['year']


        return [{
                id: 'uso_solo_terraclass',
                sql: "select r.text as region, r.area_km2 as area_region, lc.classe_lulc, total_area_classe_lulc, desmat_area_classe_lulc, lc.color, lc.year from prodes_regions_lulc lc inner join regions r on " +
                    "(r.gid = lc.region_id) where lc.fonte = 'terraclass' and lc.type = '" + type + "' AND unaccent(r.value) ilike unaccent('" + region + "') and lc.year = " + year + " ORDER BY 5 DESC;"

            },
            {
                id: 'uso_solo_terraclass_2018',
                sql: "select r.text as region, r.area_km2 as area_region, lc.classe_lulc, total_area_classe_lulc, desmat_area_classe_lulc, lc.color, lc.year from prodes_regions_lulc lc inner join regions r on " +
                    "(r.gid = lc.region_id) where lc.fonte = 'terraclass_2018' and lc.type = '" + type + "' AND unaccent(r.value) ilike unaccent('" + region + "') and lc.year = " + year + " ORDER BY 5 DESC;"

            },
            {
                id: 'uso_solo_probio',
                sql: "select r.text as region, r.area_km2 as area_region, lc.classe_lulc, total_area_classe_lulc, desmat_area_classe_lulc, lc.color, lc.year from prodes_regions_lulc lc inner join regions r on " +
                    "(r.gid = lc.region_id) where lc.fonte = 'probio' and lc.type = '" + type + "' AND unaccent(r.value) ilike unaccent('" + region + "') and lc.year = " + year + " ORDER BY 5 DESC;"

            },
            {
                id: 'uso_solo_agrosatelite',
                sql: "select r.text as region, r.area_km2 as area_region, lc.classe_lulc, total_area_classe_lulc, desmat_area_classe_lulc, lc.color, lc.year from prodes_regions_lulc lc inner join regions r on " +
                    "(r.gid = lc.region_id) where lc.fonte = 'agrosatelite' and lc.type = '" + type + "' AND unaccent(r.value) ilike unaccent('" + region + "') and lc.year = " + year + " ORDER BY 5 DESC;"

            }

        ]
    }

    Query.timeseries = function(params) {

        var type = params['type']
        var region = params['region']

        return [{
                id: 'timeseries',
                sql: " SELECT year, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
                    " FROM prodes_cerrado " +
                    " WHERE year IS NOT NULL and classname <> 'R_2018'" + Internal.regionFilter(type) +
                    " GROUP BY 1;"
            },
            {
                id: 'extent',
                sql: "SELECT area_km2 as areaRegion, text as name FROM regions WHERE type=${type} AND value=${region}"
            }
        ]
    }

    Query.states = function() {
        return " SELECT UPPER(uf) AS region, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
            " FROM prodes_cerrado " +
            " WHERE year = ${year} " +
            " GROUP BY 1,2 " +
            " ORDER BY 3 DESC;";
    }

    Query.cities = function(params) {

        var year = params['year']
        var type = params['type']
        var amount = params['amount']

        return " SELECT county AS name, UPPER(uf) as uf," +
            (Number(year) < 2013 ? "SUM(areamunkm)/2" : "SUM(areamunkm)") + " as value " +
            " FROM prodes_cerrado " +
            " WHERE year = ${year} AND areamunkm > 0" +
            Internal.regionFilter(type) +
            " GROUP BY 1,2 " +
            " ORDER BY 3 DESC" +
            " LIMIT " + Number(amount) + ";";
    }

    Query.largest = function(params) {
        return "SELECT view_date,county,uf, ST_ASGEOJSON(geom) FROM prodes_cerrado WHERE year = ${year} ORDER BY areamunkm DESC LIMIT ${amount}"
    };

    Query.illegal = function(params) {

        var year = params['year']
        var type = params['type']
        var amount = params['amount']
        Number(amount) < 3 ? amount = 10 : amount;

        return [{
                id: 'app',
                sql: "SELECT * from desmat_on_APP where year = " + year + Internal.regionFilter(type) + " LIMIT " + Number(amount) + ";",
            },
            {
                id: 'rl',
                sql: "SELECT * from desmat_on_RL where year = " + year + Internal.regionFilter(type) + " LIMIT " + Number(amount) + ";"
            }
        ]
    };

    Query.app = function(params) {

        var year = params['year']
        var type = params['type']
        var amount = params['amount']

        return "SELECT * from desmat_on_APP where year = " + year + Internal.regionFilter(type) + " LIMIT " + Number(amount) + ";"
    };

    Query.rl = function(params) {

        var year = params['year']
        var type = params['type']
        var amount = params['amount']

        return "SELECT * from desmat_on_RL where year = " + year + Internal.regionFilter(type) + " LIMIT " + Number(amount) + ";"

    };

    Query.modis = function(params) {

        var gid = params['gid']
        var table = params['table']
        return [{
            id: 'centroid',
            sql: "SELECT gid, st_y(ST_PointOnSurface(geom)) as lat, st_x(ST_PointOnSurface(geom)) as long from " + table + "_cerrado where gid = " + gid + ";"
        }]
    };

    Query.regionreport = function(params) {

        var type = params['type']
        var region = params['region']

        let regionfilter = ""
        if (type == 'city')
            regionfilter = " AND cd_geocmu = ${region}"
        else if (type == 'state')
            regionfilter = " AND region_name ilike unaccent(${region})"
        else
            return ''

        return [{
                id: 'metadata',
                sql: "select '" + type + "' as type, region_display, area_region, sum(area_prodes) as area_antropica from info_prodes_regions where region_type = '" + type + "' " + regionfilter + " group by 1,2,3"
            },
            {
                id: 'estastica_anual',
                sql: "select rect_bbox(geometry) as bbox,region_display, area_region, area_prodes, area_app, area_rl, year from info_prodes_regions where region_type = '" + type + "' " + regionfilter + " order by year"
            }
        ]


    };


    return Query;

};