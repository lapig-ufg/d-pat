module.exports = function(app) {

    var dataInjector = app.middleware.dataInjector
    var map = app.controllers.map;

    app.get('/service/map/descriptor', map.descriptor);
    app.get('/service/map/search', dataInjector);
    app.get('/service/map/searchregion', dataInjector);
    app.get('/service/map/cdgeocmu', dataInjector);
    app.get('/service/map/cars', dataInjector);
    app.get('/service/map/ucs', dataInjector);
    app.get('/service/map/extent', dataInjector, map.extent);
    app.get('/service/map/titles', map.titles);
    app.get('/service/map/controls', map.controls);
    app.get('/service/map/getowsdomain', map.host);


}