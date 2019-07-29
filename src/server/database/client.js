const { Pool, Client } = require('pg')

module.exports = function(app) {

		var Internal = {}
		var Client = {}

		const config = app.config;
		Internal['pool'] = new Pool(config['pg'])

		Client.init = function(callback) {
			Internal['pool'].connect((err, client, release) => {
				if (err)
					return console.error('Error acquiring client', err.stack)

				Internal['client'] = client
				Internal['release'] = release

				callback()

			})
		};

		Client.query = function(sqlQuery, params, callback) {
			const start = Date.now()
			
			if (callback === undefined)
				callback = params

			return Internal['client'].query(sqlQuery, params, (err, result) => {

				if (err !== null)
					console.error(err)
				else if (config['pg']['debug']) {
					const duration = Date.now() - start
					console.log('Executed query', { sqlQuery, duration, rows: result.rowCount })
				}

				callback(result)
			})

		}

		return Client;
};