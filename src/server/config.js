const appRoot = require('app-root-path');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
	throw result.error;
}
const { parsed: env } = result;

module.exports = function (app) {

	var appProducao = env.APP_PRODUCAO;

	var config = {
		"appRoot": appRoot,
		"pathTimeSeries": appRoot + "/integration/py/time-series/time_series.py",
		"clientDir": appRoot + env.CLIENT_DIR,
		"langDir": appRoot + env.LANG_DIR,
		"logDir": appRoot + env.LOG_DIR,
		"tmp": appRoot + env.TMP,
		"fieldDataDir": appRoot + env.FIELD_DATA_DIR,
		"uploadDataDir": appRoot + env.UPLOAD_DATA_DIR,
		"downloadDataDir": appRoot + env.DOWNLOAD_DATA_DIR,
		"pg": {
			"user": env.PG_USER,
			"host": env.PG_HOST,
			"database": env.PG_DATABASE,
			"password": env.PG_PASSWORD,
			"port": env.PG_PORT,
			"debug": env.PG_DEBUG,
			"max": 20,
			"idleTimeoutMillis": 0,
			"connectionTimeoutMillis": 0,

		},
		"port": env.PORT,
		"ows_host": env.OWS_HOST,
		"ows": env.OWS,
		"lapig-maps": env.LAPIG_MAPS

	};

	if (process.env.NODE_ENV == 'prod') {
		config['dbpath'] = env.DB_PATH
		config["pg"] = {
			"user": env.PG_USER,
			"host": env.PG_HOST,
			"database": env.PG_DATABASE,
			"password": env.PG_PASSWORD,
			"port": env.PG_PORT,
			"debug": env.PG_DEBUG,
			"max": 20,
			"idleTimeoutMillis": 0,
			"connectionTimeoutMillis": 0,
		};
		config["clientDir"] = appRoot + env.CLIENT_DIR;
		config["ows_host"] = env.OWS_HOST;
		config["fieldDataDir"] = appProducao + env.FIELD_DATA_DIR;
		config["uploadDataDir"] = appProducao + env.UPLOAD_DATA_DIR;
		config["downloadDataDir"] = appProducao + env.DOWNLOAD_DATA_DIR;

	}

	return config;
}