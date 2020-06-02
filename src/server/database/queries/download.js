module.exports = function (app) {

    var Internal = {}
    var Query = {};

    Query.csv = function (params) {

        let layer  = params.layer;
        let region = params.selectedRegion;
        let time   = params.times;

        let mapper = {
            "bi_ce_prodes_desmatamento_100_fip" : "select gid,view_date, cd_geocmu, uf, sucept_desmat, bfm_pct, year, classefip, sum(areamunkm) from prodes_cerrado",
            "bi_ce_deter_desmatamento_100_fip" : "select gid,view_date, cd_geocmu, uf, sucept_desmat, bfm_pct, date_part('year', deter_cerrado.view_date) AS year, classefip, sum(areamunkm) from deter_cerrado",
            "bi_ce_prodes_antropico_100_fip" : "select gid,view_date, cd_geocmu, uf, sucept_desmat, bfm_pct, year, classefip, sum(areamunkm) from prodes_cerrado"
        }

        let sqlQuery = mapper[layer.selectedType];

        if(region.type == 'city')
        {
            sqlQuery += " WHERE cd_geocmu='"+region.cd_geocmu+"'";
        }
        else if (region.type == 'state')
        {
            sqlQuery += " WHERE uf='"+region.value+"'";
        }

        sqlQuery+= " GROUP BY 1,2,3,4,5,6,7,8"

        return [

            {
                id: 'csv',
                sql:  sqlQuery
            },
            {
                id: 'next',
                sql: "select true"
            }
        ]
    }

    return Query;

};
