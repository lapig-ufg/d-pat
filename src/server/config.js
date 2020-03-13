var appRoot = require('app-root-path');

module.exports = function (app) {

	var appProducao = '/storage/dpat-files';

	var config = {
		"appRoot": appRoot,
		"clientDir": appRoot + "/../client/dist/",
		"langDir": appRoot + "/lang",
		"logDir": appRoot + "/log/",
		"tmp": appRoot + "/tmp/",
		"fieldDataDir": appRoot + '/media/campo/',
		"uploadDataDir": appRoot + "/uploads/",
		"downloadDataDir": appProducao + "/download-dpat/",
		"pg": {
			"user": 'postgres',
			// "user": 'fip_cerrado',
			"host": '10.0.0.14',
			// "host": 'localhost',
			"database": 'fip_cerrado',
			"password": 'postgres',
			// "password": 'fip_cerrado123',
			"port": 5432,
			// "port": 5433,
			"debug": true
		},
		"port": 3000,
		// "ows_host" : 'http://localhost:5001',
		"ows_host": 'http://ows.lapig.iesa.ufg.br',
		"ows": "http://ows.lapig.iesa.ufg.br",
		"lapig-maps": 'http://maps.lapig.iesa.ufg.br/time-series/MOD13Q1_NDVI/values?'

	};

	if (process.env.NODE_ENV == 'prod') {
		config['dbpath'] = "/data/catalog/Ocultos/d-pat.sqlite"
		config["pg"] = {
			"user": 'fip_cerrado',
			"host": '172.18.0.4',
			"database": 'fip_cerrado',
			"password": 'fip_cerrado123',
			"port": 5432,
			"debug": true
		}
		config["clientDir"] = appRoot + "/../client/dist/lapig-dpat/"
		config["ows_host"] = "http://ows.lapig.iesa.ufg.br"
		config["fieldDataDir"] = appProducao + "/campo-dpat/"
		config["uploadDataDir"] = appProducao + "/upload-dpat/"

	}

	return config;

}