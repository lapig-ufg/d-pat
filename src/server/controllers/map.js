var fs = require('fs');

module.exports = function(app){
	var Controller = {}
	var Internal = {}

	var client = app.database.client
	var queries = app.database.queries.map

	Internal.getFiles = function(path) {
		if (fs.existsSync(path)) {
	    return fs.readdirSync(path)
	  } else{
	  	return []
	  }
	}

	Internal.fieldFiles = function(id) {

		var fotosCamera = app.config.fieldDataDir + '/fotos_camera/' + id
		var fotosDrone = app.config.fieldDataDir + '/fotos_drone/' + id
		var videosDrone = app.config.fieldDataDir + '/videos_drone/' + id

		return {
			'videos_drone': Internal.getFiles(videosDrone),
			'fotos_drone': Internal.getFiles(fotosDrone),
			'fotos_camera': Internal.getFiles(fotosCamera)
		}

	}

	Controller.fieldData = function(request, response) {
		var id = request.param('id')
		var category = request.param('category')
		var filename = request.param('filename')

		var filepath = app.config.fieldDataDir + '/' + category + '/' + id + '/' + filename

		response.sendFile(filepath);

	}

	Controller.field = function(request, response) {
		
		var result = []
		var queryResult = request.queryResult

		queryResult.rows.forEach(function(row) {

			var campoId = row['campo_id']
			var files = Internal.fieldFiles(campoId)

			result.push({
				'type': 'Feature',
      	'geometry': JSON.parse(row['geojson']),
      	'properties': {
      		'campo_id': campoId,
      		'data': row['data'],
      		'usocobertura': row['cobertura'],
      		'obs': row['obs'],
      		'videos_drone': files['videos_drone'],
      		'fotos_drone': files['fotos_drone'],
      		'fotos_camera': files['fotos_camera']
      	}
			})
		})

		response.send({
			"type": "FeatureCollection",
			"features": result
		})
    response.end();

	}

	Controller.extent = function(request, response) {

		var queryResult = request.queryResult

		var result = {
      'type': 'Feature',
      'geometry': JSON.parse(queryResult.rows[0]['geojson'])
    }

		response.send(result)
    response.end();

	}

	Controller.search = function(request, response) {

		var queryResult = request.queryResult
		response.send(queryResult.rows)
	  response.end();

	}

	return Controller;
}