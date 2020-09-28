var csv = require('csv'); 
var fs = require('fs');

var copyFiles = function(id, filePrefix, inputDir, outputDir) {

  var count = 0;

  if (fs.existsSync(inputDir)) {
    fs.readdirSync(inputDir).forEach(filepath => {
      canCopy = true
      if (filePrefix != undefined) {
        canCopy = filepath.startsWith(filePrefix)
      }

      if(canCopy) {

        
        inputFile = inputDir + filepath
        outputDirAux = outputDir + id + '/'

        if(fs.existsSync(outputDirAux) == false) {
          fs.mkdirSync(outputDirAux)
        } 

        ext = filepath.split('.')[1]

        count = count + 1
        outputFile = outputDirAux + id + '_' + count + '.'+ ext
      
        console.log("Coping " + outputFile)
        fs.copyFileSync(inputFile, outputFile);

      }
    });
  }
}

fs.readFile('fip_campos_r.csv', 'utf8', function(err, data){
      
    var rows = data.split(/\n/);

    for(var i=1; i < rows.length - 1 ; i++) {
      var row = rows[i];
      var col = row.split(/\,/)
      
      var id = col[0];
      var title = col[3];
      var voo = col[4];
      var pasta = col[1];
      var subpasta = col[2];

      inputDirCamera = 'dados/fotos_camera/'+pasta+'/'+subpasta+'/'
      outputDirCamera = 'dados_padronizados/fotos_camera/'

      inputDirDrone = 'dados/fotos_drone_c/'+pasta+'/'+voo+"/"
      outputDirDrone = 'dados_padronizados/fotos_drone/'

      inputDirDroneV = 'dados/videos_drone_c/'+pasta+'/'+voo+"/"
      outputDirDroneV = 'dados_padronizados/videos_drone/'

      copyFiles(id, title, inputDirCamera, outputDirCamera)
      if (voo) {
        copyFiles(id, undefined, inputDirDrone, outputDirDrone)
        copyFiles(id, undefined, inputDirDroneV, outputDirDroneV)
      }
    }

  });