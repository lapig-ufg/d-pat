var appRoot = require('app-root-path');

module.exports = function(app) {
	
	var config = {
		"appRoot": appRoot, 
		"clientDir": appRoot + "/../client/dist/",
		"langDir": appRoot + "/lang",
		"logDir": appRoot + "/log/",
		"remoteFieldDataDir": '/data/fotos_campo/',
		"fieldDataDir": appRoot+ '/media/',
		"pg": {
			"user": 'postgres',
		  "host": '10.0.0.14',
		// "host": 'localhost',
		  "database": 'fip_cerrado',
		  "password": 'postgres',
		  "port": 5432,
		//   "port": 5433,
		  "debug": true
		},
		"port": 3000,
		// "ows_host" : 'http://localhost:5001',
		"ows_host" : 'http://ows.lapig.iesa.ufg.br',

	};

	if(process.env.NODE_ENV == 'prod') {
		// config["mongo"]["port"] = "27017"
		config["port"] = "4000"
		config['dbpath'] = "/data/catalog/Ocultos/d-pat.sqlite"
		config["pg"] = {
			"user": 'postgres',
		  "host": '200.137.217.158',
		  "database": 'fip_cerrado',
		  "password": 'postgres',
		  "port": 5432,
		  "debug": true
		}
		config["clientDir"] = appRoot + "/../client/dist/lapig-dpat/"
		config["ows_host"] = "http://ows.lapig.iesa.ufg.br"
	}
	
	return config;

}