module.exports = function (app) {

	var hotsite = app.controllers.hotsite;

	app.get('/service/hotsite/lang', hotsite.languagesTexts);
}
