var fs = require("fs");
var languageJson = require('../assets/lang/language.json');
var path = require('path');

module.exports = function (app) {
    var Controller = {};
    var Internal = {};

    const config = app.config;

    var client = app.database.client;
    var queries = app.database.queries.map;


    Internal.filterLanguage = function filterItems(query, array) {
        return array.filter(function (el) {
            if (el[0] === query) {
                return el[1];
            }
        })
    };


    Internal.getMetadata = function (metadata, language) {
        let _metadata = [];

        metadata.forEach(function (data) {
            _metadata.push({ 'title': data.title[language], 'description': data.description[language] });
        });

        return _metadata;

    };


    Controller.extent = function (request, response) {
        var queryResult = request.queryResult;

        var result = {
            type: "Feature",
            geometry: JSON.parse(queryResult[0].geojson),
            area_km2: queryResult[0].area_km2
        };

        response.send(result);
        response.end();
    };

    Controller.descriptor = function (request, response) {

        var language = request.param('lang')

        var result = {
            regionFilterDefault: "",
            type: languageJson["descriptor"]["type_of_information_label"][language],
            groups: [
                {
                    id: "desmatamento",
                    label: languageJson["descriptor"]["desmatamento"]["label"][language],
                    group_expanded: true,
                    layers: [{
                        id: "desmatamento_prodes",
                        label: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["label"][language],
                        visible: true,
                        selectedType: "prodes_por_region_city_fip_img",
                        metadata: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]['metadata'],
                        types: [{
                            value: "prodes_por_region_city_fip_img",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["prodes_por_region_city_fip_img"]["view_value"][language],
                            opacity: 1,
                            order: 1,
                            download: [],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["prodes_por_region_city_fip_img"]["timelabel"][language],
                            timeSelected: "year=2021",
                            timeHandler: "msfilter",
                            times: [{
                                value: "year=2002",
                                Viewvalue: "2000/2002",
                                year: 2002
                            },
                            {
                                value: "year=2004",
                                Viewvalue: "2002/2004",
                                year: 2004
                            },
                            {
                                value: "year=2006",
                                Viewvalue: "2004/2006",
                                year: 2006
                            },
                            {
                                value: "year=2008",
                                Viewvalue: "2006/2008",
                                year: 2008
                            },
                            {
                                value: "year=2010",
                                Viewvalue: "2008/2010",
                                year: 2010
                            },
                            {
                                value: "year=2012",
                                Viewvalue: "2010/2012",
                                year: 2012
                            },
                            {
                                value: "year=2013",
                                Viewvalue: "2012/2013",
                                year: 2013
                            },
                            {
                                value: "year=2014",
                                Viewvalue: "2013/2014",
                                year: 2014
                            },
                            {
                                value: "year=2015",
                                Viewvalue: "2014/2015",
                                year: 2015
                            },
                            {
                                value: "year=2016",
                                Viewvalue: "2015/2016",
                                year: 2016
                            },
                            {
                                value: "year=2017",
                                Viewvalue: "2016/2017",
                                year: 2017
                            },
                            {
                                value: "year=2018",
                                Viewvalue: "2017/2018",
                                year: 2018
                            },
                            {
                                value: "year=2019",
                                Viewvalue: "2018/2019",
                                year: 2019
                            },
                            {
                                value: "year=2020",
                                Viewvalue: "2019/2020",
                                year: 2020
                            },
                            {
                                value: "year=2021",
                                Viewvalue: "2020/2021",
                                year: 2021
                            }
                            ]
                        },
                        {
                            value: "prodes_por_region_state_fip_img",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["prodes_por_region_state_fip_img"]["view_value"][language],
                            opacity: 1,
                            order: 1,
                            download: [],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["prodes_por_region_state_fip_img"]["timelabel"][language],
                            timeSelected: "year=2021",
                            timeHandler: "msfilter",
                            times: [{
                                value: "year=2002",
                                Viewvalue: "2000/2002",
                                year: 2002
                            },
                            {
                                value: "year=2004",
                                Viewvalue: "2002/2004",
                                year: 2004
                            },
                            {
                                value: "year=2006",
                                Viewvalue: "2004/2006",
                                year: 2006
                            },
                            {
                                value: "year=2008",
                                Viewvalue: "2006/2008",
                                year: 2008
                            },
                            {
                                value: "year=2010",
                                Viewvalue: "2008/2010",
                                year: 2010
                            },
                            {
                                value: "year=2012",
                                Viewvalue: "2010/2012",
                                year: 2012
                            },
                            {
                                value: "year=2013",
                                Viewvalue: "2012/2013",
                                year: 2013
                            },
                            {
                                value: "year=2014",
                                Viewvalue: "2013/2014",
                                year: 2014
                            },
                            {
                                value: "year=2015",
                                Viewvalue: "2014/2015",
                                year: 2015
                            },
                            {
                                value: "year=2016",
                                Viewvalue: "2015/2016",
                                year: 2016
                            },
                            {
                                value: "year=2017",
                                Viewvalue: "2016/2017",
                                year: 2017
                            },
                            {
                                value: "year=2018",
                                Viewvalue: "2017/2018",
                                year: 2018
                            },
                            {
                                value: "year=2019",
                                Viewvalue: "2018/2019",
                                year: 2019
                            },
                            {
                                value: "year=2020",
                                Viewvalue: "2019/2020",
                                year: 2020
                            },
                            {
                                value: "year=2021",
                                Viewvalue: "2020/2021",
                                year: 2021
                            }
                            ]
                        },
                        {
                            value: "bi_ce_prodes_desmatamento_100_fip",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["bi_ce_prodes_desmatamento_100_fip"]["view_value"][language],
                            opacity: 1,
                            order: 1,
                            download: ['csv', 'shp'],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["bi_ce_prodes_desmatamento_100_fip"]["timelabel"][language],
                            timeSelected: "year=2021",
                            timeHandler: "msfilter",
                            times: [{
                                value: "year=2002",
                                Viewvalue: "2000/2002",
                                year: 2002
                            },
                            {
                                value: "year=2004",
                                Viewvalue: "2002/2004",
                                year: 2004
                            },
                            {
                                value: "year=2006",
                                Viewvalue: "2004/2006",
                                year: 2006
                            },
                            {
                                value: "year=2008",
                                Viewvalue: "2006/2008",
                                year: 2008
                            },
                            {
                                value: "year=2010",
                                Viewvalue: "2008/2010",
                                year: 2010
                            },
                            {
                                value: "year=2012",
                                Viewvalue: "2010/2012",
                                year: 2012
                            },
                            {
                                value: "year=2013",
                                Viewvalue: "2012/2013",
                                year: 2013
                            },
                            {
                                value: "year=2014",
                                Viewvalue: "2013/2014",
                                year: 2014
                            },
                            {
                                value: "year=2015",
                                Viewvalue: "2014/2015",
                                year: 2015
                            },
                            {
                                value: "year=2016",
                                Viewvalue: "2015/2016",
                                year: 2016
                            },
                            {
                                value: "year=2017",
                                Viewvalue: "2016/2017",
                                year: 2017
                            },
                            {
                                value: "year=2018",
                                Viewvalue: "2017/2018",
                                year: 2018
                            },
                            {
                                value: "year=2019",
                                Viewvalue: "2018/2019",
                                year: 2019
                            },
                            {
                                value: "year=2020",
                                Viewvalue: "2019/2020",
                                year: 2020
                            },
                            {
                                value: "year=2021",
                                Viewvalue: "2020/2021",
                                year: 2021
                            }
                            ]
                        },
                        {
                            value: "bi_ce_prodes_desmatamento_pontos_campo_fip",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["bi_ce_prodes_desmatamento_pontos_campo_fip"]["view_value"][language],
                            opacity: 1,
                            order: 1,
                            download: ['csv', 'shp'],
                            regionFilter: true,
                        },
                        {
                            value: "bi_ce_prodes_desmatamento_abc_fip",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["bi_ce_prodes_desmatamento_abc_fip"]["view_value"][language],
                            opacity: 1,
                            order: 1,
                            download: ['csv', 'shp'],
                            regionFilter: true,
                        }
                        ]
                    },
                    {
                        id: "desmatamento_deter",
                        label: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["label"][language],
                        visible: false,
                        download: true,
                        metadata: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]['metadata'],
                        selectedType: "bi_ce_deter_desmatamento_100_fip",
                        types: [{
                            value: "bi_ce_deter_desmatamento_100_fip",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["view_value"][language],
                            opacity: 1,
                            order: 1,
                            download: ['csv', 'shp'],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["timelabel"][language],
                            timeSelected: "view_date > '2021-01-01'",
                            timeHandler: "msfilter",
                            times: [
                                {
                                    value: "view_date > '2021-01-01'",
                                    Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["times"]["view_date > '2021-01-01'"][language]
                                },
                                {
                                    value: "view_date > '2020-01-01'",
                                    Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["times"]["view_date > '2020-01-01'"][language]
                                },
                                {
                                    value: "view_date > '2019-01-01'",
                                    Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["times"]["view_date > '2019-01-01'"][language]
                                },
                                {
                                    value: "view_date > '2018-01-01'",
                                    Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["times"]["view_date > '2018-01-01'"][language]
                                }
                            ]
                        },
                        {
                            value: "bi_ce_deter_desmatamento_pontos_campo_fip",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_pontos_campo_fip"]["view_value"][language],
                            opacity: 1,
                            order: 1,
                            download: ['csv', 'shp'],
                            regionFilter: true,
                        }
                        ]
                    },
                    {
                        id: "antropico",
                        label: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]['metadata'],
                        selectedType: "bi_ce_prodes_antropico_100_fip",
                        types: [{
                            value: "bi_ce_prodes_antropico_100_fip",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["view_value"][language],
                            opacity: 0.8,
                            order: 2,
                            download: ['shp'],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["timelabel"][language],
                            timeSelected: "year < 2021",
                            timeHandler: "msfilter",
                            times: [{
                                value: "year < 2002",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2002"][language]
                            },
                            {
                                value: "year < 2004",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2004"][language]
                            },
                            {
                                value: "year < 2006",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2006"][language]
                            },
                            {
                                value: "year < 2008",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2008"][language]
                            },
                            {
                                value: "year < 2010",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2010"][language]
                            },
                            {
                                value: "year < 2012",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2012"][language]
                            },
                            {
                                value: "year < 2013",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2013"][language]
                            },
                            {
                                value: "year < 2014",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2014"][language]
                            },
                            {
                                value: "year < 2015",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2015"][language]
                            },
                            {
                                value: "year < 2016",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2016"][language]
                            },
                            {
                                value: "year < 2017",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2017"][language]
                            },
                            {
                                value: "year < 2018",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2018"][language]
                            },
                            {
                                value: "year < 2019",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2019"][language]
                            },
                            {
                                value: "year < 2020",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2020"][language]
                            },
                            {
                                value: "year < 2021",
                                Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["times"]["year < 2021"][language]
                            }
                            ]
                        }]
                    },
                    {
                        id: "susceptibilidade",
                        label: languageJson["descriptor"]["desmatamento"]["layers"]["susceptibilidade"]["label"][language],
                        visible: false,
                        selectedType: "bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig",
                        metadata: languageJson["descriptor"]["desmatamento"]["layers"]["susceptibilidade"]['metadata'],
                        types: [{
                            value: "bi_ce_susceptibilidade_desmatamento_menores_100_na_lapig",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["susceptibilidade"]["types"]["bi_ce_susceptibilidade_desmatamento_menores_100_na_lapig"]["view_value"][language],
                            order: 5,
                            download: ['tif'],
                            opacity: 1
                        },
                        {
                            value: "bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig",
                            Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["susceptibilidade"]["types"]["bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig"]["view_value"][language],
                            order: 5,
                            download: ['tif'],
                            opacity: 1
                        }
                        ]
                    }

                    ]
                },
                {
                    id: "areas_queimadas",
                    label: languageJson["descriptor"]["areas_queimadas"]["label"][language],
                    group_expanded: false,
                    layers: [{
                        id: "queimadas",
                        label: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]['metadata'],
                        selectedType: "cicatrizes_queimadas_2015a2019",
                        types: [{
                            value: "cicatrizes_queimadas_2015a2019",
                            Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2015a2019"]["view_value"][language],
                            opacity: 0.8,
                            order: 2,
                            download: ['shp'],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2015a2019"]["timelabel"][language],
                            timeSelected: "year = 2019",
                            timeHandler: "msfilter",
                            times: [{
                                value: "year = 2015",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2015a2019"]["times"]["year = 2015"][language]
                            },
                            {
                                value: "year = 2016",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2015a2019"]["times"]["year = 2016"][language]
                            },
                            {
                                value: "year = 2017",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2015a2019"]["times"]["year = 2017"][language]
                            },
                            {
                                value: "year = 2018",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2015a2019"]["times"]["year = 2018"][language]
                            },
                            {
                                value: "year = 2019",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2015a2019"]["times"]["year = 2019"][language]
                            },
                            ]
                        },
                        {
                            value: "cicatrizes_queimadas_2001a2020_mcd64a1",
                            Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["view_value"][language],
                            opacity: 0.8,
                            order: 2,
                            download: ['shp'],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["timelabel"][language],
                            timeSelected: "year = 2020",
                            timeHandler: "msfilter",
                            times: [{
                                value: "year = 2001",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2001"][language]
                            },
                            {
                                value: "year = 2002",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2002"][language]
                            },
                            {
                                value: "year = 2003",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2003"][language]
                            },
                            {
                                value: "year = 2004",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2004"][language]
                            },
                            {
                                value: "year = 2005",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2005"][language]
                            },
                            {
                                value: "year = 2006",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2006"][language]
                            },
                            {
                                value: "year = 2007",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2007"][language]
                            },
                            {
                                value: "year = 2008",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2008"][language]
                            },
                            {
                                value: "year = 2009",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2009"][language]
                            },
                            {
                                value: "year = 2010",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2010"][language]
                            },
                            {
                                value: "year = 2011",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2011"][language]
                            },
                            {
                                value: "year = 2012",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2012"][language]
                            },
                            {
                                value: "year = 2013",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2013"][language]
                            },
                            {
                                value: "year = 2014",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2014"][language]
                            },
                            {
                                value: "year = 2015",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2015"][language]
                            },
                            {
                                value: "year = 2016",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2016"][language]
                            },
                            {
                                value: "year = 2017",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2017"][language]
                            },
                            {
                                value: "year = 2018",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2018"][language]
                            },
                            {
                                value: "year = 2019",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2019"][language]
                            },
                            {
                                value: "year = 2020",
                                Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["queimadas"]["types"]["cicatrizes_queimadas_2001a2020_mcd64a1"]["times"]["year = 2020"][language]
                            }
                            ]
                        },
                        ]
                    },
                    {
                        id: "frequencia_queimada",
                        label: languageJson["descriptor"]["areas_queimadas"]["layers"]["frequencia_queimada"]["label"][language],
                        visible: false,
                        selectedType: "bi_ce_frequencia_queimada_ufmg",
                        // metadata: languageJson["descriptor"]["areas_queimadas"]["layers"]["frequencia_queimada"]['metadata'],
                        types: [{
                            value: "bi_ce_frequencia_queimada_ufmg",
                            Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["frequencia_queimada"]["types"]["bi_ce_frequencia_queimada_ufmg"]["view_value"][language],
                            order: 5,
                            download: ['tif'],
                            opacity: 1
                        }]
                    },
                    {
                        id: "focos_calor",
                        label: languageJson["descriptor"]["areas_queimadas"]["layers"]["focos_calor"]["label"][language],
                        visible: false,
                        selectedType: "focos_calor_regions_city_img",
                        metadata: languageJson["descriptor"]["areas_queimadas"]["layers"]["focos_calor"]['metadata'],
                        types: [{
                            value: "focos_calor_regions_city_img",
                            Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["focos_calor"]["types"]["focos_calor_regions_city_img"]["view_value"][language],
                            opacity: 1,
                            order: 5,
                            download: [],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["areas_queimadas"]["layers"]["focos_calor"]["types"]["focos_calor_regions_city_img"]["timelabel"][language],
                            timeSelected: "year=2020",
                            timeHandler: "msfilter",
                            times: [{
                                value: "year=2000",
                                Viewvalue: "2000",
                                year: 2000
                            },
                            {
                                value: "year=2001",
                                Viewvalue: "2001",
                                year: 2001
                            },
                            {
                                value: "year=2002",
                                Viewvalue: "2002",
                                year: 2002
                            },
                            {
                                value: "year=2003",
                                Viewvalue: "2003",
                                year: 2003
                            },
                            {
                                value: "year=2004",
                                Viewvalue: "2004",
                                year: 2004
                            },
                            {
                                value: "year=2005",
                                Viewvalue: "2005",
                                year: 2005
                            },
                            {
                                value: "year=2006",
                                Viewvalue: "2006",
                                year: 2006
                            },
                            {
                                value: "year=2007",
                                Viewvalue: "2007",
                                year: 2007
                            },
                            {
                                value: "year=2008",
                                Viewvalue: "2008",
                                year: 2008
                            },
                            {
                                value: "year=2009",
                                Viewvalue: "2009",
                                year: 2009
                            },
                            {
                                value: "year=2010",
                                Viewvalue: "2010",
                                year: 2010
                            },
                            {
                                value: "year=2011",
                                Viewvalue: "2011",
                                year: 2011
                            },
                            {
                                value: "year=2012",
                                Viewvalue: "2012",
                                year: 2012
                            },
                            {
                                value: "year=2013",
                                Viewvalue: "2013",
                                year: 2013
                            },
                            {
                                value: "year=2014",
                                Viewvalue: "2014",
                                year: 2014
                            },
                            {
                                value: "year=2015",
                                Viewvalue: "2015",
                                year: 2015
                            },
                            {
                                value: "year=2016",
                                Viewvalue: "2016",
                                year: 2016
                            },
                            {
                                value: "year=2017",
                                Viewvalue: "2017",
                                year: 2017
                            },
                            {
                                value: "year=2018",
                                Viewvalue: "2018",
                                year: 2018
                            },
                            {
                                value: "year=2019",
                                Viewvalue: "2019",
                                year: 2019
                            },
                            {
                                value: "year=2020",
                                Viewvalue: "2020",
                                year: 2020
                            }
                            ]
                        },
                        {
                            value: "focos_calor_regions_state_img",
                            Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["focos_calor"]["types"]["focos_calor_regions_state_img"]["view_value"][language],
                            opacity: 1,
                            order: 5,
                            download: [],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["areas_queimadas"]["layers"]["focos_calor"]["types"]["focos_calor_regions_state_img"]["timelabel"][language],
                            timeSelected: "year=2020",
                            timeHandler: "msfilter",
                            times: [{
                                value: "year=2000",
                                Viewvalue: "2000",
                                year: 2000
                            },
                            {
                                value: "year=2001",
                                Viewvalue: "2001",
                                year: 2001
                            },
                            {
                                value: "year=2002",
                                Viewvalue: "2002",
                                year: 2002
                            },
                            {
                                value: "year=2003",
                                Viewvalue: "2003",
                                year: 2003
                            },
                            {
                                value: "year=2004",
                                Viewvalue: "2004",
                                year: 2004
                            },
                            {
                                value: "year=2005",
                                Viewvalue: "2005",
                                year: 2005
                            },
                            {
                                value: "year=2006",
                                Viewvalue: "2006",
                                year: 2006
                            },
                            {
                                value: "year=2007",
                                Viewvalue: "2007",
                                year: 2007
                            },
                            {
                                value: "year=2008",
                                Viewvalue: "2008",
                                year: 2008
                            },
                            {
                                value: "year=2009",
                                Viewvalue: "2009",
                                year: 2009
                            },
                            {
                                value: "year=2010",
                                Viewvalue: "2010",
                                year: 2010
                            },
                            {
                                value: "year=2011",
                                Viewvalue: "2011",
                                year: 2011
                            },
                            {
                                value: "year=2012",
                                Viewvalue: "2012",
                                year: 2012
                            },
                            {
                                value: "year=2013",
                                Viewvalue: "2013",
                                year: 2013
                            },
                            {
                                value: "year=2014",
                                Viewvalue: "2014",
                                year: 2014
                            },
                            {
                                value: "year=2015",
                                Viewvalue: "2015",
                                year: 2015
                            },
                            {
                                value: "year=2016",
                                Viewvalue: "2016",
                                year: 2016
                            },
                            {
                                value: "year=2017",
                                Viewvalue: "2017",
                                year: 2017
                            },
                            {
                                value: "year=2018",
                                Viewvalue: "2018",
                                year: 2018
                            },
                            {
                                value: "year=2019",
                                Viewvalue: "2019",
                                year: 2019
                            },
                            {
                                value: "year=2020",
                                Viewvalue: "2020",
                                year: 2020
                            }
                            ]
                        },
                        {
                            value: "pontos_foco_calor_fip",
                            Viewvalue: languageJson["descriptor"]["areas_queimadas"]["layers"]["focos_calor"]["types"]["pontos_foco_calor_fip"]["view_value"][language],
                            opacity: 1,
                            order: 5,
                            download: [],
                            regionFilter: true,
                            timeLabel: languageJson["descriptor"]["areas_queimadas"]["layers"]["focos_calor"]["types"]["pontos_foco_calor_fip"]["timelabel"][language],
                            timeSelected: "ano=2020",
                            timeHandler: "msfilter",
                            times: [{
                                value: "ano=2000",
                                Viewvalue: "2000",
                                year: 2000
                            },
                            {
                                value: "ano=2001",
                                Viewvalue: "2001",
                                year: 2001
                            },
                            {
                                value: "ano=2002",
                                Viewvalue: "2002",
                                year: 2002
                            },
                            {
                                value: "ano=2003",
                                Viewvalue: "2003",
                                year: 2003
                            },
                            {
                                value: "ano=2004",
                                Viewvalue: "2004",
                                year: 2004
                            },
                            {
                                value: "ano=2005",
                                Viewvalue: "2005",
                                year: 2005
                            },
                            {
                                value: "ano=2006",
                                Viewvalue: "2006",
                                year: 2006
                            },
                            {
                                value: "ano=2007",
                                Viewvalue: "2007",
                                year: 2007
                            },
                            {
                                value: "ano=2008",
                                Viewvalue: "2008",
                                year: 2008
                            },
                            {
                                value: "ano=2009",
                                Viewvalue: "2009",
                                year: 2009
                            },
                            {
                                value: "ano=2010",
                                Viewvalue: "2010",
                                year: 2010
                            },
                            {
                                value: "ano=2011",
                                Viewvalue: "2011",
                                year: 2011
                            },
                            {
                                value: "ano=2012",
                                Viewvalue: "2012",
                                year: 2012
                            },
                            {
                                value: "ano=2013",
                                Viewvalue: "2013",
                                year: 2013
                            },
                            {
                                value: "ano=2014",
                                Viewvalue: "2014",
                                year: 2014
                            },
                            {
                                value: "ano=2015",
                                Viewvalue: "2015",
                                year: 2015
                            },
                            {
                                value: "ano=2016",
                                Viewvalue: "2016",
                                year: 2016
                            },
                            {
                                value: "ano=2017",
                                Viewvalue: "2017",
                                year: 2017
                            },
                            {
                                value: "ano=2018",
                                Viewvalue: "2018",
                                year: 2018
                            },
                            {
                                value: "ano=2019",
                                Viewvalue: "2019",
                                year: 2019
                            },
                            {
                                value: "ano=2020",
                                Viewvalue: "2020",
                                year: 2020
                            }
                            ]
                        }
                        ]
                    },
                    ]
                },
                {
                    id: "areas_especiais",
                    label: languageJson["descriptor"]["areas_especiais"]["label"][language],
                    group_expanded: false,
                    layers: [{
                        id: "terra_indigena",
                        label: languageJson["descriptor"]["areas_especiais"]["layers"]["terra_indigena"]["label"][language],
                        visible: false,
                        selectedType: "terra_indigena_cerrado",
                        types: [{
                            value: "terra_indigena_cerrado",
                            Viewvalue: languageJson["descriptor"]["areas_especiais"]["layers"]["terra_indigena"]["types"]["terra_indigena_cerrado"]["view_value"][language],
                            metadata: languageJson["descriptor"]["areas_especiais"]["layers"]["terra_indigena"]["types"]['terra_indigena_cerrado']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    },
                    {
                        id: "quilombola",
                        label: languageJson["descriptor"]["areas_especiais"]["layers"]["quilombola"]["label"][language],
                        visible: false,
                        selectedType: "areas_quilombola_cerrado",
                        types: [{
                            value: "areas_quilombola_cerrado",
                            Viewvalue: languageJson["descriptor"]["areas_especiais"]["layers"]["quilombola"]["types"]["areas_quilombola_cerrado"]["view_value"][language],
                            metadata: languageJson["descriptor"]["areas_especiais"]["layers"]["quilombola"]["types"]['areas_quilombola_cerrado']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    },
                    {
                        id: "ucs",
                        label: languageJson["descriptor"]["areas_especiais"]["layers"]["ucs"]["label"][language],
                        visible: false,
                        selectedType: "ucs_uso_sustentavel_cerrado",
                        types: [{
                            value: "ucs_uso_sustentavel_cerrado",
                            Viewvalue: languageJson["descriptor"]["areas_especiais"]["layers"]["ucs"]["types"]["ucs_uso_sustentavel_cerrado"]["view_value"][language],
                            metadata: languageJson["descriptor"]["areas_especiais"]["layers"]["ucs"]["types"]['ucs_uso_sustentavel_cerrado']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        },
                        {
                            value: "ucs_protecao_integral_cerrado",
                            Viewvalue: languageJson["descriptor"]["areas_especiais"]["layers"]["ucs"]["types"]["ucs_protecao_integral_cerrado"]["view_value"][language],
                            metadata: languageJson["descriptor"]["areas_especiais"]["layers"]["ucs"]["types"]['ucs_protecao_integral_cerrado']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }
                        ]
                    },
                    {
                        id: "areas_prioritarias",
                        label: languageJson["descriptor"]["areas_especiais"]["layers"]["areas_prioritarias"]["label"][language],
                        visible: false,
                        selectedType: "areas_prioritarias_cerrado",
                        types: [
                            {
                                value: "areas_prioritarias_cerrado",
                                Viewvalue: languageJson["descriptor"]["areas_especiais"]["layers"]["areas_prioritarias"]["types"]["areas_prioritarias_cerrado"]["view_value"][language],
                                //metadata:languageJson["descriptor"]["areas_car"]["layers"]["car"]['car_imoveis_cerrado_fip']['metadata'],
                                regionFilter: true,
                                opacity: 0.8,
                                order: 3,
                                download: ['shp']
                            }
                        ]
                    }
                    ]
                },
                {
                    id: "areas_car",
                    label: languageJson["descriptor"]["areas_car"]["label"][language],
                    group_expanded: false,
                    layers: [{
                        id: "car",
                        label: languageJson["descriptor"]["areas_car"]["layers"]["car"]["label"][language],
                        visible: false,
                        selectedType: "car_imoveis_cerrado_fip",
                        types: [{
                            value: "car_imoveis_cerrado_fip",
                            Viewvalue: languageJson["descriptor"]["areas_car"]["layers"]["car"]["types"]["car_imoveis_cerrado_fip"]["view_value"][language],
                            metadata: languageJson["descriptor"]["areas_car"]["layers"]["car"]["types"]['car_imoveis_cerrado_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    },
                    {
                        id: "reserva_legal",
                        label: languageJson["descriptor"]["areas_car"]["layers"]["reserva_legal"]["label"][language],
                        visible: false,
                        selectedType: "car_reserva_legal_cerrado_fip",
                        types: [{
                            value: "car_reserva_legal_cerrado_fip",
                            Viewvalue: languageJson["descriptor"]["areas_car"]["layers"]["reserva_legal"]["types"]["car_reserva_legal_cerrado_fip"]["view_value"][language],
                            metadata: languageJson["descriptor"]["areas_car"]["layers"]["reserva_legal"]["types"]['car_reserva_legal_cerrado_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    },
                    {
                        id: "app",
                        label: languageJson["descriptor"]["areas_car"]["layers"]["app"]["label"][language],
                        visible: false,
                        selectedType: "car_app_cerrado_fip",
                        types: [{
                            value: "car_app_cerrado_fip",
                            Viewvalue: languageJson["descriptor"]["areas_car"]["layers"]["app"]["types"]["car_app_cerrado_fip"]["view_value"][language],
                            metadata: languageJson["descriptor"]["areas_car"]["layers"]["app"]["types"]['car_app_cerrado_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    },
                    {
                        id: "nascente",
                        label: languageJson["descriptor"]["areas_car"]["layers"]["nascente"]["label"][language],
                        visible: false,
                        selectedType: "car_nascente_cerrado_fip",
                        types: [{
                            value: "car_nascente_cerrado_fip",
                            Viewvalue: languageJson["descriptor"]["areas_car"]["layers"]["nascente"]["types"]["car_nascente_cerrado_fip"]["view_value"][language],
                            metadata: languageJson["descriptor"]["areas_car"]["layers"]["nascente"]["types"]['car_nascente_cerrado_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    }
                    ]
                },
                {
                    id: "uso_da_terra",
                    label: languageJson["descriptor"]["uso_da_terra"]["label"][language],
                    group_expanded: false,
                    layers: [{
                        id: "uso_solo",
                        label: languageJson["descriptor"]["uso_da_terra"]["layers"]["uso_solo"]["label"][language],
                        visible: false,
                        selectedType: "uso_solo_terraclass_fip",
                        types: [{
                            value: "uso_solo_terraclass_fip",
                            Viewvalue: "TerraClass-Cerrado - 2013",
                            metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]["uso_solo"]['uso_solo_terraclass_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        },
                        {
                            value: "uso_solo_terraclass_2018_fip",
                            Viewvalue: "TerraClass-Cerrado - 2018",
                            metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]["uso_solo"]['uso_solo_terraclass_2018_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        },
                        {
                            value: "uso_solo_probio_fip",
                            Viewvalue: "PROBIO-Cerrado - 2002",
                            metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]["uso_solo"]['uso_solo_probio_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        },
                        {
                            value: "vegetacao_cerrado_fip",
                            Viewvalue: "Vegetação Pretérita (IBGE) - 2019",
                            metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]["uso_solo"]['vegetacao_cerrado_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }
                        ]
                    },
                    {
                        id: "agricultura",
                        label: languageJson["descriptor"]["uso_da_terra"]["layers"]["agricultura"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]["agricultura"]['agricultura_agrosatelite_fip']['metadata'],
                        selectedType: "agricultura_agrosatelite_fip",
                        types: [{
                            value: "agricultura_agrosatelite_fip",
                            Viewvalue: "Agrosatélite 2013/2014",
                            metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]["agricultura"]['agricultura_agrosatelite_fip']['metadata'],
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    },
                    {
                        id: "floresta_plantada",
                        label: languageJson["descriptor"]["uso_da_terra"]["layers"]["floresta_plantada"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]['floresta_plantada']['metadata'],
                        selectedType: "floresta_plantada_fip",
                        types: [{
                            value: "floresta_plantada_fip",
                            Viewvalue: "Transparent World",
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    }
                    ]
                },
                {
                    id: "infraestrutura",
                    label: languageJson["descriptor"]["infraestrutura"]["label"][language],
                    group_expanded: false,
                    layers: [{
                        id: "osm_rodovias",
                        label: languageJson["descriptor"]["infraestrutura"]["layers"]["osm_rodovias"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["infraestrutura"]["layers"]['osm_rodovias']['metadata'],
                        selectedType: "osm_rodovias",
                        types: [{
                            value: "osm_rodovias",
                            Viewvalue: "Open Street Map",
                            regionFilter: true,
                            opacity: 0.8,
                            download: ['shp'],
                            order: 3
                        }]
                    },
                    {
                        id: "armazens",
                        label: languageJson["descriptor"]["infraestrutura"]["layers"]["armazens"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["infraestrutura"]["layers"]['armazens']['metadata'],
                        selectedType: "armazens_fip",
                        types: [{
                            value: "armazens_fip",
                            Viewvalue: "LAPIG",
                            regionFilter: true,
                            opacity: 0.8,
                            download: ['shp'],
                            order: 3
                        }]
                    },
                    {
                        id: "frigorificos",
                        label: languageJson["descriptor"]["infraestrutura"]["layers"]["frigorificos"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["infraestrutura"]["layers"]['frigorificos']['metadata'],
                        selectedType: "armazens_fip",
                        selectedType: "matadouros_e_frigorificos",
                        types: [{
                            value: "matadouros_e_frigorificos",
                            Viewvalue: "LAPIG",
                            regionFilter: true,
                            opacity: 0.8,
                            download: ['shp'],
                            order: 3
                        }]
                    }
                    ]
                },
                {
                    id: "geofisico",
                    label: languageJson["descriptor"]["geofisico"]["label"][language],
                    group_expanded: false,
                    layers: [{
                        id: "altitude",
                        label: languageJson["descriptor"]["geofisico"]["layers"]["altitude"]["label"][language],
                        visible: false,
                        download: true,
                        metadata: languageJson["descriptor"]["geofisico"]["layers"]['altitude']['metadata'],
                        selectedType: "bi_ce_srtm_altitude_30_2000_lapig",
                        types: [{
                            value: "bi_ce_srtm_altitude_30_2000_lapig",
                            Viewvalue: "SRTM",
                            opacity: 0.8,
                            order: 3,
                            download: ['tif']
                        }]
                    },
                    {
                        id: "declividade",
                        label: languageJson["descriptor"]["geofisico"]["layers"]["declividade"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["geofisico"]["layers"]['declividade']['metadata'],
                        selectedType: "bi_ce_srtm_declividade_30_2000_lapig",
                        types: [{
                            value: "bi_ce_srtm_declividade_30_2000_lapig",
                            Viewvalue: "SRTM",
                            opacity: 0.8,
                            order: 3,
                            download: ['tif']
                        }]
                    }
                    ]
                },
                {
                    id: "edafoclimaticos",
                    label: languageJson["descriptor"]["edafoclimaticos"]["label"][language],
                    group_expanded: false,
                    layers: [{
                        id: "solos",
                        label: languageJson["descriptor"]["edafoclimaticos"]["layers"]["solos"]["label"][language],
                        visible: false,
                        metadata: languageJson["descriptor"]["edafoclimaticos"]["layers"]['solos']['metadata'],
                        selectedType: "solos_ibge",
                        types: [{
                            value: "solos_ibge",
                            Viewvalue: "IBGE",
                            regionFilter: true,
                            opacity: 0.8,
                            order: 3,
                            download: ['shp']
                        }]
                    },
                    {
                        id: "precipitacao",
                        label: languageJson["descriptor"]["edafoclimaticos"]["layers"]["precipitacao"]["label"][language],
                        visible: false,
                        download: true,
                        metadata: languageJson["descriptor"]["edafoclimaticos"]["layers"]['precipitacao']['metadata'],
                        selectedType: "bi_ce_precipitacao_historica_30_lapig",
                        types: [{
                            value: "bi_ce_precipitacao_historica_30_lapig",
                            Viewvalue: "TRMM/GPM",
                            opacity: 0.8,
                            download: ['tif'],
                            order: 3
                        }]
                    }
                    ]
                },
                //  @todo REMOVE
                {
                    id: "imagens",
                    label: languageJson["descriptor"]["imagens"]["label"][language],
                    group_expanded: false,
                    layers: [{
                        id: "satelite",
                        label: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["label"][language],
                        visible: false,
                        selectedType: "landsat",
                        types: [{
                            value: "landsat",
                            Viewvalue: "Landsat",
                            order: 10,
                            download: [],
                            opacity: 1,
                            metadata: languageJson["descriptor"]["imagens"]["layers"]['satelite']['landsat']['metadata'],
                            timeLabel: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["timelabel"][language],
                            timeSelected: "bi_ce_mosaico_landsat_completo_30_2021_fip",
                            timeHandler: "layername",
                            times: [{
                                value: "bi_ce_mosaico_landsat_completo_30_2000_fip",
                                Viewvalue: "2000"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2002_fip",
                                Viewvalue: "2002"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2004_fip",
                                Viewvalue: "2004"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2006_fip",
                                Viewvalue: "2006"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2008_fip",
                                Viewvalue: "2008"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2010_fip",
                                Viewvalue: "2010"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2012_fip",
                                Viewvalue: "2012"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2013_fip",
                                Viewvalue: "2013"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2014_fip",
                                Viewvalue: "2014"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2015_fip",
                                Viewvalue: "2015"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2016_fip",
                                Viewvalue: "2016"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2017_fip",
                                Viewvalue: "2017"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2018_fip",
                                Viewvalue: "2018"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2019_fip",
                                Viewvalue: "2019"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2020_fip",
                                Viewvalue: "2020"
                            },
                            {
                                value: "bi_ce_mosaico_landsat_completo_30_2021_fip",
                                Viewvalue: "2021"
                            }
                            ]
                        },
                        {
                            value: "sentinel",
                            Viewvalue: "Sentinel",
                            order: 10,
                            download: [],
                            opacity: 1,
                            metadata: languageJson["descriptor"]["imagens"]["layers"]['satelite']['sentinel']['metadata'],
                            timeLabel: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["timelabel"][language],
                            timeSelected: "bi_ce_mosaico_sentinel_10_2020_lapig",
                            timeHandler: "layername",
                            times: [{
                                value: "bi_ce_mosaico_sentinel_10_2016_lapig",
                                Viewvalue: "2016"
                            },
                            {
                                value: "bi_ce_mosaico_sentinel_10_2017_lapig",
                                Viewvalue: "2017"
                            },
                            {
                                value: "bi_ce_mosaico_sentinel_10_2018_lapig",
                                Viewvalue: "2018"
                            },
                            {
                                value: "bi_ce_mosaico_sentinel_10_2019_lapig",
                                Viewvalue: "2019"
                            },
                            {
                                value: "bi_ce_mosaico_sentinel_10_2020_lapig",
                                Viewvalue: "2020"
                            }

                            ]
                        },
                        {
                            value: "planet",
                            Viewvalue: "Planet",
                            order: 10,
                            download: [],
                            opacity: 1,
                            metadata: languageJson["descriptor"]["imagens"]["layers"]['satelite']['sentinel']['metadata'],
                            timeLabel: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["timelabel"][language],
                            timeSelected: "global_quarterly_2021q3_mosaic",
                            timeHandler: "layername",
                            times: [{
                                value: "global_quarterly_2016q1_mosaic",
                                Viewvalue: "2016/1ºTri"
                            },
                            {
                                value: "global_quarterly_2016q2_mosaic",
                                Viewvalue: "2016/2ºTri"
                            },
                            {
                                value: "global_quarterly_2016q3_mosaic",
                                Viewvalue: "2016/3ºTri"
                            },
                            {
                                value: "global_quarterly_2016q4_mosaic",
                                Viewvalue: "2016/4ºTri"
                            },
                            {
                                value: "global_quarterly_2017q1_mosaic",
                                Viewvalue: "2017/1ºTri"
                            },
                            {
                                value: "global_quarterly_2017q2_mosaic",
                                Viewvalue: "2017/2ºTri"
                            },
                            {
                                value: "global_quarterly_2017q3_mosaic",
                                Viewvalue: "2017/3ºTri"
                            },
                            {
                                value: "global_quarterly_2017q4_mosaic",
                                Viewvalue: "2017/4ºTri"
                            },
                            {
                                value: "global_quarterly_2018q1_mosaic",
                                Viewvalue: "2018/1ºTri"
                            },
                            {
                                value: "global_quarterly_2018q2_mosaic",
                                Viewvalue: "2018/2ºTri"
                            },
                            {
                                value: "global_quarterly_2018q3_mosaic",
                                Viewvalue: "2018/3ºTri"
                            },
                            {
                                value: "global_quarterly_2018q4_mosaic",
                                Viewvalue: "2018/4ºTri"
                            },
                            {
                                value: "global_quarterly_2019q1_mosaic",
                                Viewvalue: "2019/1ºTri"
                            },
                            {
                                value: "global_quarterly_2019q2_mosaic",
                                Viewvalue: "2019/2ºTri"
                            },
                            {
                                value: "global_quarterly_2019q3_mosaic",
                                Viewvalue: "2019/3ºTri"
                            },
                            {
                                value: "global_quarterly_2019q4_mosaic",
                                Viewvalue: "2019/4ºTri"
                            },
                            {
                                value: "global_quarterly_2020q1_mosaic",
                                Viewvalue: "2020/1ºTri"
                            },
                            {
                                value: "global_quarterly_2020q2_mosaic",
                                Viewvalue: "2020/2ºTri"
                            },
                            {
                                value: "global_quarterly_2020q3_mosaic",
                                Viewvalue: "2020/3ºTri"
                            },
                            {
                                value: "global_quarterly_2020q4_mosaic",
                                Viewvalue: "2020/4ºTri"
                            },
                            {
                                value: "global_quarterly_2021q1_mosaic",
                                Viewvalue: "2021/1ºTri"
                            },
                            {
                                value: "global_quarterly_2021q2_mosaic",
                                Viewvalue: "2021/2ºTri"
                            },
                            {
                                value: "global_quarterly_2021q3_mosaic",
                                Viewvalue: "2021/3ºTri"
                            }
                            ]
                        }
                        ]
                    }]
                }
            ],
            basemaps: [{
                id: "basemaps",
                defaultBaseMap: "mapbox",
                types: [{
                    value: "mapbox",
                    viewValue: languageJson["descriptor"]["basemaps"]["types"]["mapbox"][language],
                    visible: true
                },
                {
                    value: "googlemaps",
                    viewValue: languageJson["descriptor"]["basemaps"]["types"]["googlemaps"][language],
                    visible: false
                },
                {
                    value: "satelite",
                    viewValue: languageJson["descriptor"]["basemaps"]["types"]["satelite"][language],
                    visible: false
                },
                {
                    value: "estradas",
                    viewValue: languageJson["descriptor"]["basemaps"]["types"]["estradas"][language],
                    visible: false
                },
                {
                    value: "relevo",
                    viewValue: languageJson["descriptor"]["basemaps"]["types"]["relevo"][language],
                    visible: false
                },
                {
                    value: "planet",
                    viewValue: languageJson["descriptor"]["basemaps"]["types"]["planet"][language],
                    visible: false
                }
                ]
            }],
            limits: [{
                id: "limits_bioma",
                types: [{
                    value: "limite_cerrado",
                    Viewvalue: languageJson["descriptor"]["limits"]["types"]["limite_cerrado"][language],
                    metadata: languageJson["descriptor"]["limits"]["types"]["limite_cerrado"]['metadata'],
                    visible: true,
                    layer_limits: true,
                    opacity: 1
                },
                {
                    value: "estados",
                    Viewvalue: languageJson["descriptor"]["limits"]["types"]["estados"][language],
                    metadata: languageJson["descriptor"]["limits"]["types"]["estados"]['metadata'],
                    visible: false,
                    layer_limits: true,
                    opacity: 1
                },
                {
                    value: "municipios_cerrado",
                    Viewvalue: languageJson["descriptor"]["limits"]["types"]["municipios_cerrado"][language],
                    metadata: languageJson["descriptor"]["limits"]["types"]["municipios_cerrado"]['metadata'],
                    visible: false,
                    layer_limits: true,
                    opacity: 1
                }
                ],
                selectedType: "limite_cerrado"
            }]
        };

        response.send(result);
        response.end();
    };

    Controller.titles = function (request, response) {

        var language = request.param('lang')

        var result = {
            legendTitle: languageJson["legends_box_title"][language],
            region_report_tooltip: languageJson["region_report_tooltip"][language],
            utfgrid: {
                area: languageJson["mini_report_utfgrid"]["area"][language],
                city: languageJson["mini_report_utfgrid"]["city"][language],
                detection_date: languageJson["mini_report_utfgrid"]["detection_date"][language],
                susceptibility: languageJson["mini_report_utfgrid"]["susceptibility"][language],
                field_number: languageJson["mini_report_utfgrid"]["field_number"][language],
                not_computed_message: languageJson["mini_report_utfgrid"]["not_computed_message"][language],
                undisclosed_message: languageJson["mini_report_utfgrid"]["undisclosed_message"][language],
                click_more_text: languageJson["mini_report_utfgrid"]["click_more_text"][language],
                click_more_municipio: languageJson["mini_report_utfgrid"]["click_more_municipio"][language],
                label_year: languageJson["mini_report_utfgrid"]["label_year"][language],
                label_area_app: languageJson["mini_report_utfgrid"]["label_area_app"][language],
                label_area_rl: languageJson["mini_report_utfgrid"]["label_area_rl"][language],
                area_property: languageJson["mini_report_utfgrid"]["area_property"][language],
                area_explorada: languageJson["mini_report_utfgrid"]["area_explorada"][language],
                producao: languageJson["mini_report_utfgrid"]["producao"][language],
                tecnologia: languageJson["mini_report_utfgrid"]["tecnologia"][language],
                area_tecnologia: languageJson["mini_report_utfgrid"]["area_tecnologia"][language],
            },
            layer_box: {
                title: languageJson["layer_box"]["title"][language],
                label_data: languageJson["layer_box"]["label_data"][language],
                label_mapabase: languageJson["layer_box"]["label_mapabase"][language],
                label_limits: languageJson["layer_box"]["label_limits"][language],
                label_upload: languageJson["layer_box"]["label_upload"][language],
                map: languageJson["layer_box"]["map"][language],
                statistics: languageJson["layer_box"]["statistics"][language],
                label_upload_msg: languageJson["layer_box"]["label_upload_msg"][language],
                label_upload_title_file: languageJson["layer_box"]["label_upload_title_file"][language],
                label_upload_max_size_msg: languageJson["layer_box"]["label_upload_max_size_msg"][language],
                search_placeholder_region: languageJson["layer_box"]["search_placeholder_region"][language],
                search_placeholder_car: languageJson["layer_box"]["search_placeholder_car"][language],
                search_placeholder_uc: languageJson["layer_box"]["search_placeholder_uc"][language],
                search_placeholder_coordinate: languageJson["layer_box"]["search_placeholder_coordinate"][language],
                search_lateral_title: languageJson["layer_box"]["search_lateral_title"][language],
                search_loading: languageJson["layer_box"]["search_loading"][language],
                search_failed_region: languageJson["layer_box"]["search_failed_region"][language],
                search_failed_car: languageJson["layer_box"]["search_failed_car"][language],
                search_failed_uc: languageJson["layer_box"]["search_failed_uc"][language],
                search_failed_coordinate: languageJson["layer_box"]["search_failed_coordinate"][language],
                label_upload_token: languageJson["layer_box"]["label_upload_token"][language],
                label_total_area: languageJson["layer_box"]["label_total_area"][language],
                label_analyzed_area_title: languageJson["layer_box"]["label_analyzed_area_title"][language],
                header_table_deforested: languageJson["layer_box"]["header_table_deforested"][language],
                header_table_city: languageJson["layer_box"]["header_table_city"][language],
                header_table_state: languageJson["layer_box"]["header_table_state"][language],
                table_prodes_title: languageJson["layer_box"]["table_prodes_title"][language],
                table_deter_title: languageJson["layer_box"]["table_deter_title"][language],
                table_city_title: languageJson["layer_box"]["table_city_title"][language],
                table_state_title: languageJson["layer_box"]["table_state_title"][language],
                btn_analyze: languageJson["layer_box"]["btn_analyze"][language],
                btn_search: languageJson["layer_box"]["btn_search"][language],
                btn_clear: languageJson["layer_box"]["btn_clear"][language],
                warning: languageJson["layer_box"]["warning"][language],
                not_found: languageJson["layer_box"]["not_found"][language],
                label_upload_tooltip: languageJson["layer_box"]["label_upload_tooltip"][language],
                car_title: languageJson["layer_box"]["car_title"][language],
                car_title_searching: languageJson["layer_box"]["car_title_searching"][language],
                car_table_headers: languageJson["layer_box"]["car_table_headers"][language],
                car_title_report: languageJson["layer_box"]["car_title_report"][language],
                upload_submit: languageJson["layer_box"]["upload_submit"][language],
                upload_search: languageJson["layer_box"]["upload_search"][language],
                map_coordinate: languageJson["layer_box"]["map_coordinate"][language],
                terraclass_2013_card: languageJson["layer_box"]["terraclass_2013_card"][language],
                terraclass_msg_2013_searching: languageJson["layer_box"]["terraclass_msg_2013_searching"][language],
                chart_terraclass_2013_title: languageJson["layer_box"]["chart_terraclass_2013_title"][language],
                terraclass_2018_card: languageJson["layer_box"]["terraclass_2018_card"][language],
                terraclass_msg_2018_searching: languageJson["layer_box"]["terraclass_msg_2018_searching"][language],
                chart_terraclass_2018_title: languageJson["layer_box"]["chart_terraclass_2018_title"][language],
                focos_calor_card: languageJson["layer_box"]["focos_calor_card"][language],
                focos_calor_msg_searching: languageJson["layer_box"]["focos_calor_msg_searching"][language],
                chart_focos_calor_title: languageJson["layer_box"]["chart_focos_calor_title"][language],
                queimadas_card: languageJson["layer_box"]["queimadas_card"][language],
                queimadas_msg_searching: languageJson["layer_box"]["queimadas_msg_searching"][language],
                chart_queimadas_title: languageJson["layer_box"]["chart_queimadas_title"][language],

            },
            descriptor: languageJson["descriptor"]

        };

        response.send(result);
        response.end();
    };

    Controller.controls = function (request, response) {
        var language = request.param('lang');

        var controlsJson = languageJson["controls"];

        var result = {};

        Object.keys(controlsJson).forEach(function (key, index) {
            result[key] = controlsJson[key][language];
        });

        response.send(result);
        response.end();

    };

    Controller.host = function (request, response) {

        var baseUrls = config.ows_domains.split(",");

        for (let i = 0; i < baseUrls.length; i++) {
            baseUrls[i] += "/ows"
        }

        response.send(baseUrls);
        response.end();
    }


    return Controller;
};
