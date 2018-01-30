var appRoot = require('app-root-path');

module.exports = function(app) {
	
	var config = {
		"appRoot": appRoot, 
		"clientDir": appRoot + "/../client",
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
	}

	return config;

}
