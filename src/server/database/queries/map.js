module.exports = function(app) {

	var Internal = {}
	var Query = {};

	Internal.regionFilter = function(type, region) {
		if (type == 'city')
  		return " AND county = '"+region+"'"
  	else if (type == 'state')
  		return "AND uf = '"+region+"'"
  	else
  		return ''
	}

	Query.extent = function() {
		return "SELECT ST_AsGeoJSON(geom) geojson FROM regions WHERE type=$1 AND value=$2";
	}

	Query.search = function() {
		return "SELECT text, value, type FROM regions WHERE text ILIKE $1 AND type in ('state', 'city')";
	}

	Query.periods = function() {
		return "SELECT DISTINCT classname FROM prodes_cerrado ORDER BY classname DESC";
	}

	Query.indicators = function(type, region) {
		return 	" SELECT classname, source, SUM(areamunkm) as areamunkm " +
						" FROM prodes_cerrado " +
						" WHERE classname != 'AGUA' " + Internal.regionFilter(type, region) +
						" GROUP BY 1,2 " +
						" ORDER BY classname ASC;";
	}

	Query.deforestationTimeseries = function(type, region) {

		return " SELECT year, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
								" FROM prodes_cerrado " +
								" WHERE year IS NOT NULL " + Internal.regionFilter(type, region) +
								" GROUP BY 1;";
	}

	Query.deforestationStates = function() {
		return " SELECT INITCAP(uf) AS region, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
								" FROM prodes_cerrado " +
								" WHERE classname = $1 " + 
								" GROUP BY 1,2 " +
								" ORDER BY 3 DESC;";
	}

	Query.deforestationCities = function(year, type, region) {
		return 	" SELECT county AS name, INITCAP(uf) as uf," +
							( Number(year) < 2013 ? "SUM(areamunkm)/2" : "SUM(areamunkm)" )  + " as value "+
						" FROM prodes_cerrado " +
						" WHERE classname = $1 AND areamunkm > 0" +
							Internal.regionFilter(type, region) +
						" GROUP BY 1,2 " +
						" ORDER BY 3 DESC" +
						" LIMIT 10;";
	}

	Query.fieldValidation = function() {
		return "SELECT ST_AsGeoJSON(geom) geojson, id AS campo_id, data, cobertura, obs FROM pontos_campo";
	}

	return Query;

}