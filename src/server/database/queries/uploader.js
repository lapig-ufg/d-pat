module.exports = function (app) {

    var Internal = {}
    var Query = {};



    Query.desmatperyear = function (params) {

        var type = params['type']
        var shape = params['shape']

        var polygon = "'" + type.toUpperCase() + "((";

        polygon += shape.join(',')

        polygon += "))', 4674"

        console.log(polygon)

        return [{
            id: 'desmat_per_year_prodes',
            // sql: " SELECT year, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
            // 	" FROM prodes_cerrado " +
            //     " INNER JOIN () 

            //     WHERE year IS NOT NULL " + Internal.regionFilter(type) +
            // 	" GROUP BY 1;"
            sql: 'select true'
        },
        {
            id: 'extent',
            sql: "SELECT area_km2 as areaRegion, text as name FROM regions WHERE type=${type} AND value=${region}"
        }
        ]
    }









    return Query;

};