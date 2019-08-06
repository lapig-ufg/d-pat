module.exports = function(app) {

	const merge = require('merge')
	
	var queries = app.database.queries
	var client = app.database.client
	
	var Internal = {}

	Internal.parseParams = function(request, queriesOfController) {
		return merge(queriesOfController.defaultParams, request.params, request.query, request.body);
	}

	Internal.defaultController = function(request, response) {
		var queryResult = request.queryResult
		response.send(queryResult.rows)
		response.end()
	}

	return function(request, response, next) {
		
		var hasController = (request.route.stack.length > 1)
		var pathParts = request.path.split('/')
		var controller = pathParts[2]
		var method = pathParts[3]
		
		if (controller in queries && method in queries[controller]) {
			
			var queriesOfController = queries[controller]

			var params = Internal.parseParams(request, queriesOfController)
			var query = queriesOfController[method](params)

			var callback = function(queryResult) {
				request.queryResult = queryResult

				if (hasController) {
					next()
				} else {
					Internal.defaultController(request, response)
				}
			}
			
			client.query(query, params, callback)
		
		} else {
			next()
		}

	};
};