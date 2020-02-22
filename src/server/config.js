var appRoot = require('app-root-path');

module.exports = function(app) {
	
	var config = {
		"appRoot": appRoot, 
		"clientDir": appRoot + "/../client/dist/",
		"langDir": appRoot + "/lang",
		"logDir": appRoot + "/log/",
		"remoteFieldDataDir": '/media/campo/',
		"fieldDataDir": appRoot+ '/media/campo/',
		"pg": {
			"user": 'postgres',
			// "user": 'fip_cerrado',
			"host": '10.0.0.14',
		// "host": 'localhost',
			"database": 'fip_cerrado',
			"password": 'postgres',
		//   "password": 'fip_cerrado123',
			"port": 5432,
		//   "port": 5433,
			"debug": true
		},
		"port": 3000,
		// "ows_host" : 'http://localhost:5001',
		// "ows" : 'http://localhost:5001',
		"ows_host" : 'http://ows.lapig.iesa.ufg.br',
		"ows": "http://ows.lapig.iesa.ufg.br"
		
	};

	if(process.env.NODE_ENV == 'prod') {
		// config["mongo"]["port"] = "27017"
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
		// config["ows_host"] = "http://localhost:5001"
		config["fieldDataDir"] = "/STORAGE/d-pat-campo/"
		config["remoteFieldDataDir"] = "/STORAGE/d-pat-campo/"
	}
	
	return config;

}