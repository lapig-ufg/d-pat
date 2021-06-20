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
        return "SELECT distinct text, value, type, cd_geocmu FROM regions WHERE unaccent(text) ILIKE unaccent(${key}%) AND type in ('state', 'city') LIMIT 10";
    }

    Query.searchregion = function() {
        return "SELECT text, value, type, cd_geocmu FROM regions WHERE unaccent(value) ILIKE unaccent(${key}) AND type = (${type}) LIMIT 10";
    }

    Query.cdgeocmu = function() {
        return "SELECT text, value, type, cd_geocmu FROM regions WHERE cd_geocmu=${key}";
    }

    Query.cars = function() {
        return "SELECT cod_car as text, uf, area_km2, cd_geocmu, ST_AsGeoJSON(geom) geojson FROM car_cerrado WHERE unaccent(cod_car) ILIKE unaccent(${key}%) order by area_km2 DESC LIMIT 10";
    }

    Query.ucs = function(params) {
        var key = params['key']

        return "SELECT nome || ' - ' || uf as text, uf, origin_table, cd_geocmu, ST_AsGeoJSON(geom) geojson FROM v_ucs WHERE unaccent(nome) ILIKE unaccent('%" + key + "%') order by nome ASC LIMIT 10";
    }


    return Query;

}