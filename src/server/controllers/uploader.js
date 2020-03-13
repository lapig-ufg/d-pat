const unzipper = require("unzipper"),
	fs = require("fs"),
	path = require('path'),
	ogr2ogr = require("ogr2ogr");

module.exports = function(app) {
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
	];
	Internal.spatialFiles = ["shp", "kml", "geojson"];

	Internal.clearCache = function(data, callback) {
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

	Internal.toGeoJson = function(shapfile, callback) {
		let geojson = ogr2ogr(shapfile).timeout(300000); // 5 minutes

		geojson.exec(function(er, data) {
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

	Internal.extractFiles = async function(zip, callback) {
		try {
			for await (const entry of zip) {
				const arrayName = entry.path.split(".");
				const fileName = arrayName[0];
				const type = entry.type; // 'Directory' or 'File'
				const size = entry.vars.uncompressedSize; // There is also compressedSize;
				const extension = arrayName.pop();

				if (type == "Directory") continue;

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

					if(extension == "kml"){
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
			fs.readFile(Internal.targetFilesName, "utf8", function(err, data) {
				if (err) {
					Internal.response
						.status(400)
						.send(languageJson['upload_messages']['cant_read_file'][Internal.language]);
					fs.unlinkSync(Internal.tmpPath);
					console.error("FILE: ", Internal.targetFilesName, " | ERROR: ", err);
					return;
				}
				Internal.response.status(200).send(data);
				fs.unlinkSync(Internal.tmpPath);
			});
		} else {
			callback(Internal.targetFilesName, Internal.clearCache);
		}
	};

	Internal.finish = function(finished, geoJson) {
		if (finished) {
			Internal.response.status(200).send(JSON.stringify(geoJson));
			fs.unlinkSync(Internal.tmpPath);
		}
	};

	Internal.doRequest = function(request, response) {
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

	Uploader.getGeoJson = function(request, response) {
		Internal.doRequest(request, response);
	};

	return Uploader;
};
