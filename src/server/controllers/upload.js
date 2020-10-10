const unzipper = require("unzipper"),
	fs = require("fs"),
	path = require('path'),
	ogr2ogr = require("ogr2ogr");

var configJS = require('../config.js')()
const gjv = require("geojson-validation");
var epsg = require('epsg');
const repro = require("reproject")
const moment = require("moment");

const { Pool, Client } = require('pg')
const pool = new Pool(configJS['pg'])

module.exports = function (app) {
	const config = app.config;

	const Internal = {};
	const Uploader = {};

	const jsonPath = path.join(__dirname, '..', 'assets', 'lang', 'language.json');
	const languageJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

	/**
    Directory where the code will to put tmp files**/
	Internal.dirUpload = config.uploadDataDir;

	Internal.targetFilesName = null;
	Internal.dirTarget = null;
	Internal.tmpPath = null;
	Internal.language = null;
	Internal.response = {};
	Internal.geojson = {}

	Internal.acceptedFiles = [
		"dbf",
		"map",
		"prj",
		"qlx",
		"shp",
		"shx",
		"sld",
		"qpj",
		"cpg",
		"qix",
		"kml",
		"sbx",
		"sbn",
		"geojson",
		"xml"
	];
	Internal.spatialFiles = ["shp", "kml", "geojson"];

	Internal.clearCache = function (data, callback) {
		return callback(true, data);

		// fs.readdir(dir_upload, (err, files) => {
		// 	files = files.filter(file => file.includes(Internal.targetFilesName));
		// 	let len = files.length;
		// 	for (const file of files) {
		// 		fs.unlink(dir_upload + "/" + file, err => {
		// 			if (--len <= 0) {
		// 				callback(true, data);
		// 			}
		// 		});
		// 	}
		// });
	};

	Internal.toGeoJson = function (shapfile, callback) {
		let geojson = ogr2ogr(shapfile).timeout(300000); // 5 minutes

		geojson.exec(function (er, data) {
			if (er) {
				Internal.response
					.status(400)
					.send(languageJson['upload_messages']['cant_parse_file'][Internal.language]);
				console.error("FILE: ", shapfile, " | ERROR: ", er);
				fs.unlinkSync(Internal.tmpPath);
				return;
			} else {
				callback(data, Internal.finish);
			}
		});
	};

	Internal.extractFiles = async function (zip, callback) {
		let countShps = 0;
		try {
			for await (const entry of zip) {
				const arrayName = entry.path.split(".");
				const fileName = arrayName[0];
				const type = entry.type; // 'Directory' or 'File'
				const size = entry.vars.uncompressedSize; // There is also compressedSize;
				const extension = arrayName.pop();

				if (type == "Directory") continue;

				if (fileName.includes('MACOS')) continue;

				if(extension === 'shp') countShps++;

				if(countShps > 1){
					Internal.response.status(400).send(languageJson['upload_messages']['only_one_shp'][Internal.language]);
					console.error("FILE: ", Internal.targetFilesName, "Only one .shp file permitted");
					return;
				}

				Internal.dirTarget =
					Internal.dirUpload +
					fileName
						.split("/")
						.pop()
						.toLowerCase();

				if (!fs.existsSync(Internal.dirTarget)) {
					fs.mkdirSync(Internal.dirTarget);
				}

				if (type == "File" && Internal.acceptedFiles.includes(extension)) {
					let time = "";

					if (extension == "kml") {
						time = "-" + new Date().getTime();
					}

					let target_path =
						Internal.dirTarget +
						"/" +
						fileName
							.split("/")
							.pop()
							.toLowerCase() +
						time +
						"." +
						extension;

					let file = fs.createWriteStream(target_path);

					entry.pipe(file);

					if (Internal.spatialFiles.includes(extension)) {
						Internal.targetFilesName = file.path;
					}
				} else {
					entry.autodrain();
				}
			}
		} catch (e) {
			Internal.response.status(400).send(languageJson['upload_messages']['cant_extract'][Internal.language]);
			console.error("FILE: ", Internal.targetFilesName, " | ERROR: ", e.stack);
			fs.unlinkSync(Internal.tmpPath);
		}

		if (!fs.existsSync(Internal.targetFilesName)) {
			Internal.response.status(400).send(languageJson['upload_messages']['no_spatial_file'][Internal.language]);
			fs.unlinkSync(Internal.tmpPath);
			console.error(
				"FILE: ",
				Internal.targetFilesName,
				" | ERROR: ",
				languageJson['upload_messages']['no_spatial_file'][Internal.language],
			);
			return;
		}

		if (Internal.targetFilesName.split(".").pop() == "geojson") {
			fs.readFile(Internal.targetFilesName, "utf8", function (err, data) {
				if (err) {
					Internal.response
						.status(400)
						.send(languageJson['upload_messages']['cant_read_file'][Internal.language]);
					fs.unlinkSync(Internal.tmpPath);
					console.error("FILE: ", Internal.targetFilesName, " | ERROR: ", err);
					return;
				}
				let geoJson = JSON.parse(data)

				let token = Internal.saveToPostGis(geoJson);
				geoJson.token = token;

				if (gjv.valid(geoJson)) {
					Internal.response.status(200).send(JSON.stringify(geoJson));
					fs.unlinkSync(Internal.tmpPath);
				}
				else {
					Internal.response.status(400).send(languageJson['upload_messages']['invalid_geojson'][Internal.language]);
					fs.unlinkSync(Internal.tmpPath);
					console.error("FILE: ", Internal.targetFilesName, " | ERROR: ");
				}

			});
		} else {
			callback(Internal.targetFilesName, Internal.clearCache);
		}
	};

	Internal.finish = function (finished, geoJson) {
		if (finished) {

			geoJson = repro.toWgs84(geoJson, undefined, epsg);

			let token = Internal.saveToPostGis(geoJson);
			geoJson.token = token;

			if (gjv.valid(geoJson)) {
				Internal.response.status(200).send(JSON.stringify(geoJson));
				fs.unlinkSync(Internal.tmpPath);
			}
			else {
				Internal.response.status(400).send(languageJson['upload_messages']['invalid_geojson'][Internal.language]);
				fs.unlinkSync(Internal.tmpPath);
				console.error("ERROR: ");
			}
		}
	};

	Internal.import_feature = function (token) {
		var data_atualizacao = new Date(moment().format('YYYY-MM-DD HH:mm'))

		if (Internal.geojson.type.toUpperCase() == 'FeatureCollection'.toUpperCase()) {
			for (const [index, feature] of Internal.geojson.features.entries()) {
				let geom = JSON.stringify((feature.geometry))
				Internal.insertToPostgis(token, geom, data_atualizacao)
			}
		}
		else if (Internal.geojson.type.toUpperCase() == 'Feature'.toUpperCase()) {
			let geom = JSON.stringify((Internal.geojson.geometry))
			Internal.insertToPostgis(token, geom, data_atualizacao)
		}
	};

	Internal.insertToPostgis = async function (token, geom, data_atualizacao) {

		let INSERT_STATEMENT = 'INSERT INTO upload_shapes (token, geom, data_insercao) values ($1, ST_Transform(ST_SetSRID(ST_Force2D(ST_GeomFromGeoJSON($2)),$3), 4674), $4) returning token;'

		let makeValid = 'select ST_MAKEVALID(geom) from upload_shapes where token= $1'

		const client = await pool.connect()
		try {
			await client.query('BEGIN')
			/* for initial population*/
			var rowValues = [token, geom, 4326, data_atualizacao]
			const res = await client.query(INSERT_STATEMENT, rowValues)
			console.log(token + ' inserted.')

			var rowValuesValid = [token]
			const resValid = await client.query(makeValid, rowValuesValid)
			console.log(token, " validado!")

			await client.query('COMMIT')
		} catch (e) {
			console.error("Doing rollback - ", e)
			await client.query('ROLLBACK')
			throw e
		} finally {
			client.release()
		}
	}

	Internal.saveToPostGis = function (geojson) {
		let token = new Date().getTime()
		Internal.geojson = geojson;

		Internal.import_feature(token)

		return token;
	};

	Internal.doRequest = function (request, response) {
		/** Reset Variables */
		Internal.targetFilesName = null;
		Internal.dirTarget = null;
		Internal.tmpPath = null;

		Internal.language = request.param("lang");

		Internal.response = response;

		/** When using data come in "request.files" regardless of the attribute "shapefile". **/
		if (request.files.shapefile.length > 0) {
			Internal.tmpPath = request.files.shapefile[0].path;
		} else {
			response.status(400).send(languageJson['upload_messages']['has_not_spatial_file'][Internal.language]);
			console.error(
				"FILE: ",
				request.files.shapefile,
				" | ERROR: ",
				languageJson['upload_messages']['has_not_spatial_file'][Internal.language],
			);
			return;
		}

		/** The way to copy the uploaded file. **/
		const src = fs.createReadStream(Internal.tmpPath);

		const zip = src.pipe(unzipper.Parse({ forceStream: true }));

		Internal.extractFiles(zip, Internal.toGeoJson);
	};

	Uploader.getGeoJson = function (request, response) {
		Internal.doRequest(request, response);
	};

	Uploader.desmatperyear = function (request, response) {

		try {
			var queryResult = request.queryResult['desmat_per_year_prodes']

			var resultByYear = []
			queryResult.forEach(function (row) {

				var year = Number(row['year'])
				var area = Number(row['area_desmat'])

				resultByYear.push({
					'area_desmat': area,
					'year': year
				})
			});

			queryResult = request.queryResult['area_upload']
			let info_area = {
				area_upload: queryResult[0]['area_upload']
			}

			queryResult = request.queryResult['geojson_upload']
			info_area.geojson = queryResult[0]['geojson']

			queryResult = request.queryResult['desmat_per_year_deter']
			var resultByYearDeter = []

			queryResult.forEach(function (row) {

				var year = Number(row['year'])
				var area = Number(row['area_desmat'])

				resultByYearDeter.push({
					'area_desmat': area,
					'year': year
				})
			});

			queryResult = request.queryResult['regions_pershape']
			var regions = []

			queryResult.forEach(function (row) {

				regions.push({
					'type': row['type'],
					'name': row['value']
				})
			});

			// Accepts the array and key
			const groupBy = (array, key) => {
				// Return the end result
				return array.reduce((result, currentValue) => {
					// If an array already present for key, push it to the array. Else create an array and push the object
					(result[currentValue[key]] = result[currentValue[key]] || []).push(
						currentValue
					);
					// Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
					return result;
				}, {}); // empty object is the initial value for result object
			};

			// Group by color as key to the person array
			const regionGroupedByType = groupBy(regions, 'type');

			let res = {
				regions_intersected: regionGroupedByType,
				prodes: resultByYear,
				deter: resultByYearDeter,
				shape_upload: info_area,
				car: []
			}

			response.status(200).send(res);
			response.end()

		}
		catch (err) {
			response.status(400).send(languageJson['upload_messages']['spatial_relation_error'][Internal.language]);
			response.end()
		}



	};

	Uploader.carspertoken = function (request, response) {
		try {

			var queryResult = request.queryResult['car']
			var car = []

			queryResult.forEach(function (row) {

				car.push({
					cod_car: row['codcar'],
					area_car: Number(row['areacar']),
					area_desmat_per_car: Number(row['area_desmatada_per_car']),
					area_rl: Number(row['area_reserva_legal_total_per_car']),
					area_desmat_rl: Number(row['area_desmat_rl_per_car']),
					area_app: Number(row['area_app_total_per_car']),
					area_desmat_app: Number(row['area_desmat_app_per_car'])
				})
			});

			let stringified = car.map(i => JSON.stringify(i));
			var car_final = stringified.filter((k, idx) => stringified.indexOf(k) === idx)
				.map(j => JSON.parse(j))

			response.status(200).send(car_final);
			response.end()

		}
		catch (err) {
			response.status(400).send(languageJson['upload_messages']['spatial_relation_error'][Internal.language]);
			response.end()
		}

	};

	return Uploader;
};
