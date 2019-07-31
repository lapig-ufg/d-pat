module.exports = function(app) {

	const merge = require('merge')
	
	var queries = app.database.queries
	var client = app.database.client
	
	var Internal = {}

	Internal.parseParams = function(request, queriesOfController) {
		return merge(queriesOfController.defaultParams, request.params, request.query, request.body);
	}

	return function(request, response, next) {
		
		var pathParts = request.path.split('/')
		var controller = pathParts[2]
		var method = pathParts[3]
		
		if (controller in queries && method in queries[controller]) {
			
			var queriesOfController = queries[controller]

			var params = Internal.parseParams(request, queriesOfController)
			var query = queriesOfController[method](params)

			var callback = function(queryResult) {
				request.queryResult = queryResult
				next()
			}
			
			client.query(query, params, callback)
		
		} else {
			next()
		}

	};
};