var fs = require('fs');

module.exports = function (app) {
  var Controller = {}
  var Internal = {}

  var client = app.database.client
  var queries = app.database.queries.map

  Internal.getFiles = function (path) {
    if (fs.existsSync(path)) {
      return fs.readdirSync(path)
    } else {
      return []
    }
  }

  Internal.fieldFiles = function (id) {

    var fotosCamera = app.config.fieldDataDir + '/fotos_camera/' + id
    var fotosDrone = app.config.fieldDataDir + '/fotos_drone/' + id
    var videosDrone = app.config.fieldDataDir + '/videos_drone/' + id

    return {
      'videos_drone': Internal.getFiles(videosDrone),
      'fotos_drone': Internal.getFiles(fotosDrone),
      'fotos_camera': Internal.getFiles(fotosCamera)
    }

  }

  Controller.fieldData = function (request, response) {
    var id = request.param('id')
    var category = request.param('category')
    var filename = request.param('filename')

    var filepath = app.config.fieldDataDir + '/' + category + '/' + id + '/' + filename

    response.sendFile(filepath);

  }

  Controller.field = function (request, response) {

    var result = []
    var queryResult = request.queryResult

    queryResult.rows.forEach(function (row) {

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

  Controller.extent = function (request, response) {

    var queryResult = request.queryResult

    var result = {
      'type': 'Feature',
      'geometry': JSON.parse(queryResult.rows[0]['geojson'])
    }

    response.send(result)
    response.end();

  }

  Controller.descriptor = function (request, response) {

    var result = {
      "regionFilterDefault": "",
      "groups": [{
          "id": "desmatamento",
          "label": "Desmatamento",
          "group_expanded": true,
          "layers": [{
              "id": "desmatamento",
              "label": "Desmatamentos - PRODES-Cerrado",
              "visible": true,
              "selectedType": 'bi_ce_prodes_desmatamento_100_fip',
              "types": [{
                "value": "bi_ce_prodes_desmatamento_100_fip",
                "Viewvalue": "Polígonos",
                "opacity": 1,
                "order": 1,
                "regionFilter": true,
                "timeLabel": "Período",
                "timeSelected": "year=2018",
                "timeHandler": "msfilter",
                "times": [{
                    "value": "year=2002",
                    "Viewvalue": "2000/2002",
                    "year": 2002
                  },
                  {
                    "value": "year=2004",
                    "Viewvalue": "2002/2004",
                    "year": 2004
                  },
                  {
                    "value": "year=2006",
                    "Viewvalue": "2004/2006",
                    "year": 2006
                  },
                  {
                    "value": "year=2008",
                    "Viewvalue": "2006/2008",
                    "year": 2008
                  },
                  {
                    "value": "year=2010",
                    "Viewvalue": "2008/2010",
                    "year": 2010
                  },
                  {
                    "value": "year=2012",
                    "Viewvalue": "2010/2012",
                    "year": 2012
                  },
                  {
                    "value": "year=2013",
                    "Viewvalue": "2012/2013",
                    "year": 2013
                  },
                  {
                    "value": "year=2014",
                    "Viewvalue": "2013/2014",
                    "year": 2014
                  },
                  {
                    "value": "year=2015",
                    "Viewvalue": "2014/2015",
                    "year": 2015
                  },
                  {
                    "value": "year=2016",
                    "Viewvalue": "2015/2016",
                    "year": 2016
                  },
                  {
                    "value": "year=2017",
                    "Viewvalue": "2016/2017",
                    "year": 2017
                  },
                  {
                    "value": "year=2018",
                    "Viewvalue": "2017/2018",
                    "year": 2018
                  }
                ]
              }]
            },
            {
              "id": "desmatamento",
              "label": "Alertas - DETER-Cerrado",
              "visible": false,
              "selectedType": 'bi_ce_deter_desmatamento_100_fip',
              "types": [{
                  "value": "bi_ce_deter_desmatamento_100_fip",
                  "Viewvalue": "Polígonos",
                  "opacity": 1,
                  "order": 1,
                  "regionFilter": false,
                  "timeLabel": "Período",
                  "timeSelected": "view_date > (current_date - interval '90' day)",
                  "timeHandler": "msfilter",
                  "times": [{
                      "value": "view_date > (current_date - interval '90' day)",
                      "Viewvalue": "Últimos 90 dias"
                    },
                    {
                      "value": "view_date > '2019-01-01'",
                      "Viewvalue": "Desde 2019"
                    },
                    {
                      "value": "view_date > '2018-01-01'",
                      "Viewvalue": "Desde 2018"
                    },
                  ]
                },
                {
                  "value": "bi_ce_deter_desmatamento_alta_suceptibilidade_100_fip",
                  "Viewvalue": "Polígonos com alta suceptibilidade",
                  "opacity": 1,
                  "order": 1,
                  "regionFilter": false,
                  "timeLabel": "Período",
                  "timeSelected": "view_date > (current_date - interval '90' day)",
                  "timeHandler": "msfilter",
                  "times": [{
                      "value": "view_date > (current_date - interval '90' day)",
                      "Viewvalue": "Últimos 90 dias"
                    },
                    {
                      "value": "view_date > '2019-01-01'",
                      "Viewvalue": "Desde 2019"
                    },
                    {
                      "value": "view_date > '2018-01-01'",
                      "Viewvalue": "Desde 2018"
                    },
                  ]
                }
              ]
            },
            {
              "id": "",
              "label": "Susceptibilidade a Desmatamentos",
              "visible": false,
              "selectedType": 'bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig',
              "types": [{
                  "value": "bi_ce_susceptibilidade_desmatamento_menores_100_na_lapig",
                  "Viewvalue": "Polígonos pequenos (< 0.5 km2)",
                  "order": 5,
                  "opacity": 1
                },
                {
                  "value": "bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig",
                  "Viewvalue": "Polígonos grandes (> 0.5 km2)",
                  "order": 5,
                  "opacity": 1
                }
              ]
            }
          ]
        },
        {
          "id": "uso_da_terra",
          "label": "Uso da Terra",
          "group_expanded": false,
          "layers": [{
              "id": "antropico",
              "label": "Antrópico - PRODES-Cerrado",
              "visible": false,
              "selectedType": 'bi_ce_prodes_antropico_100_fip',
              "types": [{
                "value": "bi_ce_prodes_antropico_100_fip",
                "Viewvalue": "Polígonos",
                "opacity": 0.8,
                "order": 2,
                "regionFilter": true,
                "timeLabel": "Período",
                "timeSelected": "year < 2018",
                "timeHandler": "msfilter",
                "times": [{
                    "value": "year < 2002",
                    "Viewvalue": "até 2002"
                  },
                  {
                    "value": "year < 2004",
                    "Viewvalue": "até 2004"
                  },
                  {
                    "value": "year < 2006",
                    "Viewvalue": "até 2006"
                  },
                  {
                    "value": "year < 2008",
                    "Viewvalue": "até 2008"
                  },
                  {
                    "value": "year < 2010",
                    "Viewvalue": "até 2010"
                  },
                  {
                    "value": "year < 2012",
                    "Viewvalue": "até 2012"
                  },
                  {
                    "value": "year < 2013",
                    "Viewvalue": "até 2013"
                  },
                  {
                    "value": "year < 2014",
                    "Viewvalue": "até 2014"
                  },
                  {
                    "value": "year < 2015",
                    "Viewvalue": "até 2015"
                  },
                  {
                    "value": "year < 2016",
                    "Viewvalue": "até 2016"
                  },
                  {
                    "value": "year < 2017",
                    "Viewvalue": "até 2017"
                  },
                  {
                    "value": "year < 2018",
                    "Viewvalue": "até 2018"
                  }
                ]
              }]
            },
            {
              "id": "terraclass",
              "label": "Uso e Cobertura da Terra",
              "visible": false,
              "selectedType": 'uso_solo_terraclass_fip',
              "types": [{
                  "value": "uso_solo_terraclass_fip",
                  "Viewvalue": "TerraClass-Cerrado - 2013",
                  "opacity": 0.8,
                  "order": 3
                },
                {
                  "value": "bi_ce_cobertura_vegetal_250_2002_mma",
                  "Viewvalue": "PROBIO-Cerrado - 2002",
                  "opacity": 0.8,
                  "order": 3
                },
                {
                  "value": "agricultura_agrosatelite_fip",
                  "Viewvalue": "Agricultura - Agrosatélite 2013/2014",
                  "opacity": 0.8,
                  "order": 3
                }
              ]
            },
            {
              "id": "floresta_plantada",
              "label": "Floresta Plantada",
              "visible": false,
              "selectedType": 'floresta_plantada_fip',
              "types": [{
                "value": "floresta_plantada_fip",
                "Viewvalue": "Transparent World",
                "opacity": 0.8,
                "order": 3
              }]
            }
          ]
        },
        {
          "id": "infraestrutura",
          "label": "Infraestrutura",
          "group_expanded": false,
          "layers": [{
              "id": "osm_rodovias",
              "label": "Malha Viária (Federal/Estadual)",
              "visible": false,
              "selectedType": 'osm_rodovias',
              "types": [{
                "value": "osm_rodovias",
                "Viewvalue": "Rodovias - Open Street Map",
                "opacity": 0.8,
                "order": 3
              }]
            },
            {
              "id": "armazens",
              "label": "Armazéns",
              "visible": false,
              "selectedType": 'armazens_fip',
              "types": [{
                "value": "armazens_fip",
                "Viewvalue": "Armazéns - LAPIG",
                "opacity": 0.8,
                "order": 3
              }]
            },
            {
              "id": "frigorificos",
              "label": "Matadouros e Frigoríficos",
              "visible": false,
              "selectedType": 'matadouros_e_frigorificos',
              "types": [{
                "value": "matadouros_e_frigorificos",
                "Viewvalue": "Frigoríficos - LAPIG",
                "opacity": 0.8,
                "order": 3
              }]
            }
          ]
        },
        {
          "id": "geofisico",
          "label": "Geofísico",
          "group_expanded": false,
          "layers": [{
              "id": "altitude",
              "label": "Altitude",
              "visible": false,
              "selectedType": 'bi_ce_srtm_altitude_30_2000_lapig',
              "types": [{
                "value": "bi_ce_srtm_altitude_30_2000_lapig",
                "Viewvalue": "Altitude - SRTM",
                "opacity": 0.8,
                "order": 3
              }]
            },
            {
              "id": "declividade",
              "label": "Declividade",
              "visible": false,
              "selectedType": 'bi_ce_srtm_declividade_30_2000_lapig',
              "types": [{
                "value": "bi_ce_srtm_declividade_30_2000_lapig",
                "Viewvalue": "Declividade - SRTM",
                "opacity": 0.8,
                "order": 3
              }]
            }
          ]
        },
        {
          "id": "edafoclimaticos",
          "label": "Edafoclimáticos",
          "group_expanded": false,
          "layers": [{
              "id": "solos",
              "label": "Solos (1:250.000)",
              "visible": false,
              "selectedType": 'solos_ibge',
              "types": [{
                "value": "solos_ibge",
                "Viewvalue": "Solos - IBGE",
                "opacity": 0.8,
                "order": 3
              }]
            },
            {
              "id": "precipitacao",
              "label": "Média da Precipitação Acumulada",
              "visible": false,
              "selectedType": 'bi_ce_precipitacao_historica_30_lapig',
              "types": [{
                "value": "bi_ce_precipitacao_historica_30_lapig",
                "Viewvalue": "Precipitação - TRMM/GPM",
                "opacity": 0.8,
                "order": 3
              }]
            }
          ]
        },
        {
          "id": "imagens",
          "label": "Acervo de Imagens",
          "group_expanded": false,
          "layers": [{
            "id": "satelite",
            "label": "Mosaico de Imagens",
            "visible": false,
            "selectedType": 'landsat',
            "types": [{
                "value": "landsat",
                "Viewvalue": "Landsat",
                "order": 10,
                "opacity": 1,
                "timeLabel": "Ano",
                "timeSelected": "bi_ce_mosaico_landsat_completo_30_2018_fip",
                "timeHandler": "layername",
                "times": [{
                    "value": 'bi_ce_mosaico_landsat_completo_30_2000_fip',
                    "Viewvalue": "2000"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2002_fip',
                    "Viewvalue": "2002"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2004_fip',
                    "Viewvalue": "2004"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2006_fip',
                    "Viewvalue": "2006"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2008_fip',
                    "Viewvalue": "2008"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2010_fip',
                    "Viewvalue": "2010"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2012_fip',
                    "Viewvalue": "2012"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2013_fip',
                    "Viewvalue": "2013"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2014_fip',
                    "Viewvalue": "2014"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2015_fip',
                    "Viewvalue": "2015"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2016_fip',
                    "Viewvalue": "2016"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2017_fip',
                    "Viewvalue": "2017"
                  },
                  {
                    "value": 'bi_ce_mosaico_landsat_completo_30_2018_fip',
                    "Viewvalue": "2018"
                  }
                ]
              },
              {
                "value": "sentinel",
                "Viewvalue": "Sentinel",
                "order": 10,
                "opacity": 1,
                "timeLabel": "Ano",
                "timeSelected": "bi_ce_mosaico_sentinel_10_2017_lapig",
                "timeHandler": "layername",
                "times": [{
                    "value": 'bi_ce_mosaico_sentinel_10_2016_lapig',
                    "Viewvalue": "2016"
                  },
                  {
                    "value": 'bi_ce_mosaico_sentinel_10_2017_lapig',
                    "Viewvalue": "2017"
                  },
                ]
              }
            ]
          }]
        }
      ],
      "basemaps": [{
        "id": "basemaps",
        "defaultBaseMap": 'mapbox',
        "types": [{
            "value": "mapbox",
            "viewValue": "Geopolítico",
            "visible": true
          },
          {
            "value": "satelite",
            "viewValue": "Satélite",
            "visible": false
          },
          {
            "value": "estradas",
            "viewValue": "Estradas",
            "visible": false
          },
          {
            "value": "relevo",
            "viewValue": "Relevo",
            "visible": false
          }
        ]

      }],
      "limits": [{
        "id": "limits_bioma",
        "types": [{
            "value": "biomas",
            "Viewvalue": "Cerrado",
            "visible": true,
            "layer_limits": true,
            "opacity": 1
          },
          {
            "value": "estados",
            "Viewvalue": "Estados",
            "visible": false,
            "layer_limits": true,
            "opacity": 1
          },
          {
            "value": "municipios",
            "Viewvalue": "Municípios",
            "visible": false,
            "layer_limits": true,
            "opacity": 1
          }
        ],
        "selectedType": 'biomas',
      }]
    }

    response.send(result)
    response.end();

  }



  return Controller;
}