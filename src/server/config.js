var appRoot = require('app-root-path');

module.exports = function(app) {
	
	var config = {
		"appRoot": appRoot, 
		"clientDir": appRoot + "/../client/dist/",
		"dbpath": '/home/leandro/Tmp/FREL/d-pat.sqlite',
		"langDir": appRoot + "/lang",
		"logDir": appRoot + "/log/",
		"mongo": {
			"host": "localhost",
			"port": "27017",
			"dbname": "tvi"
		},
		"port": 3000,
	};

	if(process.env.NODE_ENV == 'prod') {
		config["mongo"]["port"] = "27017"
		config["port"] = "4000"
		config['dbpath'] = "/data/catalog/Ocultos/d-pat.sqlite"


	return config;

}