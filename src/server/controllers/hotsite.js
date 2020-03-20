var languageJson = require('../assets/lang/language.json');

module.exports = function (app) {
    let Controller = {};
    let self = {};

    self.getLanguageText = function(lang) {

        let txt = {};

        txt.abstract                  = languageJson['hotsite']['abstract'][lang];
        txt.hover_btn_info            = languageJson['hotsite']['hover_btn_info'][lang];
        txt.hover_btn_access_platform = languageJson['hotsite']['hover_btn_access_platform'][lang];
        txt.about                     = languageJson['hotsite']['about'].map( function( elem ) {return elem[lang]});
        txt.about_title               = languageJson['hotsite']['about_title'][lang];
        txt.innovations               = languageJson['hotsite']['innovations'].map( function( elem ) {return elem[lang]});
        txt.innovations_title         = languageJson['hotsite']['innovations_title'][lang];
        txt.how_to_use                = languageJson['hotsite']['how_to_use'].map( function( elem ) {return elem[lang]});
        txt.how_to_use_title          = languageJson['hotsite']['how_to_use_title'][lang];
        txt.fip                       = languageJson['hotsite']['fip'].map( function( elem ) {return elem[lang]});
        txt.fip_title                 = languageJson['hotsite']['fip_title'][lang];
        txt.team_title                = languageJson['hotsite']['team_title'][lang];

        return txt;
    };
    Controller.languagesTexts = function(request, response) {
        let lang =  request.param('lang');
        response.status(200).send(self.getLanguageText(lang));
        response.end();
    };

    return Controller;
};