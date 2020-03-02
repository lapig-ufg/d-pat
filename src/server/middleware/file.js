module.exports = function (app) {
    const fs     = require('fs')
    const path   = require('path')
    const multer = require('multer')
    const config = app.config;

    if (!fs.existsSync(config.tmp)){
        fs.mkdirSync(config.tmp);
    }
    
    const upload = multer({
        dest: config.tmp,
        
        fileFilter: function (req, file, cb) {
           
            var filetypes = /kmz|zip/;
            var mimetype = filetypes.test(file.mimetype);
            var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
            if (mimetype && extname) {
            return cb(null, true);
            }
            
            cb("Error: File upload only supports the following filetypes - " + filetypes);
        }
      });

	/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "shapefile". **/
    const filesAccepted = upload.fields([{ name: 'shapefile', maxCount: 1}]);
    
	return filesAccepted; 

};