const unzipper = require("unzipper"),
	fs = require("fs"),
	ogr2ogr = require("ogr2ogr");

module.exports = function(app) {
	const config = app.config;

	const Internal = {};
	const Uploader = {};

	/**
    Directory where the code will to put tmp files**/
	Internal.dirUpload = config.tmp;

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
		"shp.xml",
		"sbx",
		"sbn",
		"geojson",
	];
	Internal.spatialFiles = ["shp", "kml", "geojson"];

	Internal.clearCache = function(data, callback) {
		return callback(true, data);

		fs.readdir(dir_upload, (err, files) => {
			files = files.filter(file => file.includes(Internal.targetFilesName));
			let len = files.length;
			for (const file of files) {
				fs.unlink(dir_upload + "/" + file, err => {
					if (--len <= 0) {
						callback(true, data);
					}
				});
			}
		});
	};

	Internal.toGeoJson = function(shapfile, callback) {
		let geojson = ogr2ogr(shapfile).timeout(300000); // 5 minutes

		geojson.exec(function(er, data) {
			if (er) {
				Internal.response
					.status(400)
					.send("Something is wrong, please try again!");
				console.error("FILE: ", shapfile, " | ERROR: ", er);
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
					let target_path =
						Internal.dirTarget +
						"/" +
						fileName
							.split("/")
							.pop()
							.toLowerCase() +
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
			Internal.response.status(400).send("You file can not be extracted!");
			console.error("FILE: ", Internal.targetFilesName, " | ERROR: ", e.stack);
		}

		if (!fs.existsSync(Internal.targetFilesName)) {
			Internal.response.status(400).send("This is not a spatial file!");
			fs.unlinkSync(Internal.tmpPath);
			console.error(
				"FILE: ",
				Internal.targetFilesName,
				" | ERROR: ",
				"This is not a spatial file!",
			);
			return;
		}

		if (Internal.targetFilesName.split(".").pop() == "geojson") {
			fs.readFile(Internal.targetFilesName, "utf8", function(err, data) {
				if (err) {
					Internal.response
						.status(400)
						.send("It's not possible to read your file!");
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
			response.status(400).send("This request does not have a spatial file!");
			console.error(
				"FILE: ",
				request.files.shapefile,
				" | ERROR: ",
				"This request does not have a spatial file!",
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
