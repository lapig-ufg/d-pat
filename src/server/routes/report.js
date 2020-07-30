module.exports = function (app) {

    var dataInjector = app.middleware.dataInjector
    var report = app.controllers.report;

    app.get('/service/projeto/field/', dataInjector, report.field);
    app.get('/service/projeto/field/:category/:id/:filename', report.fieldData);
    app.get('/service/projeto/textreport', report.textreport);

    app.post('/service/projeto/store', dataInjector, report.store);
    app.get('/service/projeto/reportByToken/:token', dataInjector, report.reportByToken);
}
