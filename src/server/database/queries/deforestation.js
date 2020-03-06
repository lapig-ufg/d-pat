module.exports = function (app) {

	var Internal = {}
	var Query = {};

	Query.defaultParams = {
		'year': 2017,
		'amount': 1
	}

	Internal.regionFilter = function (type, region) {
		if (type == 'city')
			return " AND county = ${region}"
		else if (type == 'state')
			return " AND uf = ${region}"
		else
			return ''
	}

	Query.periods = function () {
		return "SELECT DISTINCT classname FROM prodes_cerrado ORDER BY classname DESC";
	}

	Query.indicators = function (params) {

		var type = params['type']

		return " SELECT classname, source, SUM(areamunkm) as areamunkm " +
			" FROM prodes_cerrado " +
			" WHERE classname != 'AGUA' " + Internal.regionFilter(type) +
			" GROUP BY 1,2 " +
			" ORDER BY classname ASC;";
	}

	Query.timeseries = function (params) {

		var type = params['type']
		var region = params['region']

		return [
			{
				id: 'timeseries',
				sql:" SELECT year, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
									" FROM prodes_cerrado " +
									" WHERE year IS NOT NULL " + Internal.regionFilter(type) +
									" GROUP BY 1;"
			},
			{
				id: 'extent',
				sql: "SELECT area_km2 as areaRegion, text as name FROM regions WHERE type=${type} AND value=${region}"
			}
		]
		/* ----> For future referece on the return pattern for two or more queries as dictionaries on [id, sql] 

		return " SELECT year, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
			" FROM prodes_cerrado " +
			" WHERE year IS NOT NULL " + Internal.regionFilter(type) +
			" GROUP BY 1;"*/
	}

	Query.states = function () {
		return " SELECT UPPER(uf) AS region, 'prodes_cerrado' source, SUM(areamunkm) as areamunkm " +
			" FROM prodes_cerrado " +
			" WHERE year = ${year} " +
			" GROUP BY 1,2 " +
			" ORDER BY 3 DESC;";
	}

	Query.cities = function (params) {

		var year = params['year']
		var type = params['type']

		return " SELECT county AS name, UPPER(uf) as uf," +
			(Number(year) < 2013 ? "SUM(areamunkm)/2" : "SUM(areamunkm)") + " as value " +
			" FROM prodes_cerrado " +
			" WHERE year = ${year} AND areamunkm > 0" +
			Internal.regionFilter(type) +
			" GROUP BY 1,2 " +
			" ORDER BY 3 DESC" +
			" LIMIT 10;";
	}

	Query.largest = function (params) {
		return "SELECT view_date,county,uf, ST_ASGEOJSON(geom) FROM prodes_cerrado WHERE year = ${year} ORDER BY areamunkm DESC LIMIT ${amount}"
	};

	Query.illegal = function (params) {

		var year = params['year']
		var type = params['type']

		return [
			{
				id: 'app',
				sql: "SELECT * from desmat_on_APP where year = " + year + Internal.regionFilter(type) + " LIMIT 10;"
			},
			{
				id: 'rl',
				sql: "SELECT * from desmat_on_RL where year = " + year  + Internal.regionFilter(type) + " LIMIT 10;"
			}
		]
	};


	Query.modis = function (params) {

		var gid = params['gid']
		var table = params['table']


		return [
			{
				id: 'centroid',
				sql: "SELECT gid, st_y(ST_PointOnSurface(geom)) as lat, st_x(ST_PointOnSurface(geom)) as long from " + table+"_cerrado where gid = " + gid + ";"
			}
		]
	};


	return Query;

};