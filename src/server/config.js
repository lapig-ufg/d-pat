var appRoot = require('app-root-path');

module.exports = function(app) {
	
	var config = {
		"appRoot": appRoot, 
		"clientDir": appRoot + "/../client/dist/",
		"langDir": appRoot + "/lang",
		"logDir": appRoot + "/log/",
		"fieldDataDir": '/home/leandro/Projects/campo/',
		"pg": {
			"user": 'postgres',
		//   "host": '10.0.0.14',
		  "host": 'localhost',
		  "database": 'fip_cerrado',
		  "password": 'postgres',
		//   "port": 5432,
		  "port": 5433,
		  "debug": true
		},
		"port": 3000,
	};

	if(process.env.NODE_ENV == 'prod') {
		config["mongo"]["port"] = "27017"
		config["port"] = "4000"
		config['dbpath'] = "/data/catalog/Ocultos/d-pat.sqlite"
	}
	
	return config;

}