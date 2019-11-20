var fs = require("fs");

module.exports = function (app) {
  var Controller = {};
  var Internal = {};

  var client = app.database.client;
  var queries = app.database.queries.map;

  Internal.getFiles = function (path) {
    if (fs.existsSync(path)) {
      return fs.readdirSync(path);
    } else {
      return [];
    }
  };

  Internal.fieldFiles = function (id) {
    // var fotosCamera = app.config.fieldDataDir + '/fotos_camera/' + id
    var fotosCamera = app.config.fieldDataDir + "/fotos_camera/" + id;
    var fotosDrone = app.config.fieldDataDir + "/fotos_drone/" + id;
    var videosDrone = app.config.fieldDataDir + "/videos_drone/" + id;

    // console.log(fotosCamera)

    return {
      videos_drone: Internal.getFiles(videosDrone),
      fotos_drone: Internal.getFiles(fotosDrone),
      fotos_camera: Internal.getFiles(fotosCamera)
    };
  };

  Controller.fieldData = function (request, response) {
    var id = request.param("id");
    var category = request.param("category");
    var filename = request.param("filename");

    var filepath = app.config.fieldDataDir + "/" + category + "/" + id + "/" + filename;

    response.sendFile(filepath);
  };

  Controller.field = function (request, response) {
    var gid = request.param("gid");
    var origin_table = request.param("origin");
    var year = request.param("year");

    var resultCampo = [];
    var queryResultCampo = request.queryResult["pontos_campo"];

    queryResultCampo.forEach(function (row) {
      var campoId = row["campo_id"];
      var files = Internal.fieldFiles(campoId);

      resultCampo.push({
        geometry: JSON.parse(row["geojson"]),
        campo_id: campoId,
        data_visita: row["data"],
        usocobertura: row["cobertura"],
        obs: row["obs"],
        videos_drone: files["videos_drone"],
        fotos_drone: files["fotos_drone"],
        fotos_camera: files["fotos_camera"],
        prodes_id: row["desmat_id"],
        latitude: row["latitude"],
        longitude: row["longitude"]
      });
    });

    var queryResultDesmat = request.queryResult["desmatamento"];

    var urlsLandsatMontadas = [];

    let box;
    let area;
    let prob_suscept;
    let prob_bfast;
    let lat, long;
    queryResultDesmat.forEach(function (row) {
      box = row["polygon"]
        .replace("BOX(", "")
        .replace(")", "")
        .split(" ")
        .join(",");
      area = parseFloat(row["areamunkm"]);
      prob_suscept = parseFloat(row["sucept_desmat"]);
      prob_bfast = parseFloat(row["bfm"]);
      lat = parseFloat(row["lat"]);
      long = parseFloat(row["long"]);
    });

    let sizeSrc = 768;
    let sizeThumb = 400;

    for (let ano = 2000; ano <= 2018; ano++) {
      urlsLandsatMontadas.push({
        url: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          ano + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid,
        year: ano,
        thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          ano + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid
      });

      if (ano < 2012) {
        ano++;
      }
    }
    let urlSentinel;

    if (year < 2016) {
      urlSentinel = {
        thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          year + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid,

        src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          year + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid
      };
    } else { 
      urlSentinel = {
        thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_sentinel_10_" +
          year + "_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid,

        src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_sentinel_10_" +
        year + "_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid
      };
    }
    // let urlSentinel = (app.config.ows_host + '/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_sentinel_10_2017_lapig,bi_ce_' +
    // origin_table + '_desmatamento_100_fip&bbox=' + box + '&TRANSPARENT=TRUE&srs=EPSG:4674&width=512&height=512&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=' + gid);

    let urlSuscept = "";
    let typeSuscept = "";
    let legendSuscept = "";
    if (area >= 0.5) {
      urlSuscept = {
        thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          year + "_fip,bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" +
          box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" + sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid,

        src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" + year +
          "_fip,bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" +
          box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid
      };
      typeSuscept = "superior";
      legendSuscept =
        app.config.ows_host +
        "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig&format=image/png";
    } else {
      urlSuscept = {
        thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          year + "_fip,bi_ce_susceptibilidade_desmatamento_menores_100_na_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" +
          box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" + sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" +
          gid,

        src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          year + "_fip,bi_ce_susceptibilidade_desmatamento_menores_100_na_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" +
          box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" + sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" +
          gid
      };
      typeSuscept = "inferior";
      legendSuscept =
        app.config.ows_host +
        "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=bi_ce_susceptibilidade_desmatamento_menores_100_na_lapig&format=image/png";
    }

    let urlBfast = {
      thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
        year + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip,bi_ce_bfast_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
        sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFAST=t.gid=" +
        gid + "&TABLEFAST=" + origin_table + "_cerrado",

      src: app.config.ows_host +
        "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" + year + "_fip,bi_ce_" + origin_table +
        "_desmatamento_100_fip,bi_ce_bfast_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" + sizeSrc + "&height=" + sizeSrc +
        "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFAST=t.gid=" + gid + "&TABLEFAST=" + origin_table + "_cerrado"
    };
    let legendBfast =
      app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=bi_ce_bfast_fip&format=image/png";

    var imagesDesmat = {
      urlsLandSat: urlsLandsatMontadas,
      urlSentinel: urlSentinel,
      urlBfast: {
        urlBfast: urlBfast,
        legend: legendBfast,
        pct_bfast: prob_bfast
      },
      suscept: {
        urlSuscept: urlSuscept,
        type: typeSuscept,
        prob_suscept: prob_suscept,
        legend: legendSuscept
      }
    };

    var infoDesmat = {
      descricao: "Laudo-" + origin_table.toUpperCase(),
      area: area,
      latitude: lat,
      longitude: long
    };

    var queryCar = request.queryResult["car"];

    var urlsLandsatMontadas = [];

    var vetCar = [];
    let cargid;
    let boxCar;
    let cod_car;
    let area_car;
    let data_ref_car;
    let qnt_nascente;
    let area_desmat_rl, area_desmat_app;
    let area_reserva_legal_total, area_app_total;
    queryCar.forEach(function (row) {

      boxCar = row["bboxcar"]
        .replace("BOX(", "")
        .replace(")", "")
        .split(" ")
        .join(",");
      area_car = parseFloat(row["areacar"]);
      cod_car = row["codcar"];
      data_ref_car = row["datarefcar"];
      area_desmat_rl = parseFloat(row["area_desmat_rl"]);
      area_desmat_app = parseFloat(row["area_desmat_app"]);
      qnt_nascente = parseInt(row["qnt_nascente"]);
      area_desmatada = parseFloat(row["area_desmatada"]);
      cargid = parseInt(row["cargid"]);
      area_reserva_legal_total = parseFloat(row["area_reserva_legal_total"]);
      area_app_total = parseFloat(row["area_app_total"]);

      let urlCar = {};
      let metaDataCar = {};

      if (boxCar == undefined) {
        urlCar = {
          show: false
        };
      } else {
        urlCar = {
          show: true,
          thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "car_reserva_legal_cerrado_fip_laudo," + "car_app_cerrado_fip_laudo," + "car_nascente_cerrado_fip_laudo," +
            "car_imoveis_cerrado_fip_laudo," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + boxCar + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSCAR=c." + origin_table + "_id=" + gid + "&MSFILTERCAR=car.gid=" + cargid,

          src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "car_imoveis_cerrado_fip_laudo," + "car_reserva_legal_cerrado_fip_laudo," + "car_app_cerrado_fip_laudo," + "car_nascente_cerrado_fip_laudo," +
            "car_imoveis_cerrado_fip_laudo," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + boxCar + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSCAR=c." + origin_table + "_id=" + gid + "&MSFILTERCAR=car.gid=" + cargid,

          legendCar: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=car_imoveis_cerrado_fip_laudo&format=image/png",
          legendRL: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=car_reserva_legal_cerrado_fip_laudo&format=image/png",
          legendAPP: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=car_app_cerrado_fip_laudo&format=image/png",
          legendNascente: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=car_nascente_cerrado_fip_laudo&format=image/png",
          legendDesmatamento: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=" + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&format=image/png",

        };

        metaDataCar = {
          area_car: area_car,
          dataRef: data_ref_car,
          cod_car: cod_car,
          area_desmat_app: area_desmat_app,
          area_desmat_rl: area_desmat_rl,
          qnt_nascente: qnt_nascente,
          area_desmatada: area_desmatada,
          area_reserva_legal_total: area_reserva_legal_total,
          area_app_total: area_app_total
        }
      }

      var resultCar = {
        show: urlCar.show,
        imgsCar: urlCar,
        metaData: metaDataCar
      };

      vetCar.push(resultCar);

    });
    response.send({
      info: infoDesmat,
      ponto_campo: resultCampo,
      images: imagesDesmat,
      car: vetCar
    });
    response.end();
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
    var result = {
      regionFilterDefault: "",
      groups: [{
          id: "desmatamento",
          label: "Desmatamento",
          group_expanded: true,
          layers: [{
              id: "desmatamento_prodes",
              label: "Desmatamentos - PRODES-Cerrado",
              visible: true,
              selectedType: "bi_ce_prodes_desmatamento_100_fip",
              types: [{
                  value: "bi_ce_prodes_desmatamento_100_fip",
                  Viewvalue: "Polígonos",
                  opacity: 1,
                  order: 1,
                  regionFilter: true,
                  timeLabel: "Período",
                  timeSelected: "year=2018",
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
                    }
                  ]
                },
                {
                  value: "bi_ce_prodes_desmatamento_pontos_campo_fip",
                  Viewvalue: "Polígonos visitados em Campo",
                  opacity: 1,
                  order: 1,
                  regionFilter: true
                }
              ]
            },
            {
              id: "desmatamento_deter",
              label: "Avisos - DETER-Cerrado",
              visible: false,
              selectedType: "bi_ce_deter_desmatamento_100_fip",
              types: [{
                  value: "bi_ce_deter_desmatamento_100_fip",
                  Viewvalue: "Polígonos",
                  opacity: 1,
                  order: 1,
                  regionFilter: true,
                  timeLabel: "Período",
                  timeSelected: "view_date > (current_date - interval '90' day)",
                  timeHandler: "msfilter",
                  times: [{
                      value: "view_date > (current_date - interval '90' day)",
                      Viewvalue: "Últimos 90 dias"
                    },
                    {
                      value: "view_date > '2019-01-01'",
                      Viewvalue: "Desde 2019"
                    },
                    {
                      value: "view_date > '2018-01-01'",
                      Viewvalue: "Desde 2018"
                    }
                  ]
                },
                {
                  value: "bi_ce_deter_desmatamento_alta_suceptibilidade_100_fip",
                  Viewvalue: "Polígonos com alta suceptibilidade",
                  opacity: 1,
                  order: 1,
                  regionFilter: true,
                  timeLabel: "Período",
                  timeSelected: "view_date > (current_date - interval '90' day)",
                  timeHandler: "msfilter",
                  times: [{
                      value: "view_date > (current_date - interval '90' day)",
                      Viewvalue: "Últimos 90 dias"
                    },
                    {
                      value: "view_date > '2019-01-01'",
                      Viewvalue: "Desde 2019"
                    },
                    {
                      value: "view_date > '2018-01-01'",
                      Viewvalue: "Desde 2018"
                    }
                  ]
                },
                {
                  value: "bi_ce_deter_desmatamento_pontos_campo_fip",
                  Viewvalue: "Polígonos visitados em Campo",
                  opacity: 1,
                  order: 1,
                  regionFilter: true
                }
              ]
            },
            {
              id: "",
              label: "Susceptibilidade a Desmatamentos",
              visible: false,
              selectedType: "bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig",
              types: [{
                  value: "bi_ce_susceptibilidade_desmatamento_menores_100_na_lapig",
                  Viewvalue: "Polígonos pequenos (< 0.5 km2)",
                  order: 5,
                  opacity: 1
                },
                {
                  value: "bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig",
                  Viewvalue: "Polígonos grandes (> 0.5 km2)",
                  order: 5,
                  opacity: 1
                }
              ]
            }
          ]
        },
        {
          id: "uso_da_terra",
          label: "Uso da Terra",
          group_expanded: false,
          layers: [{
              id: "antropico",
              label: "Antrópico - PRODES-Cerrado",
              visible: false,
              selectedType: "bi_ce_prodes_antropico_100_fip",
              types: [{
                value: "bi_ce_prodes_antropico_100_fip",
                Viewvalue: "Polígonos",
                opacity: 0.8,
                order: 2,
                regionFilter: true,
                timeLabel: "Período",
                timeSelected: "year < 2018",
                timeHandler: "msfilter",
                times: [{
                    value: "year < 2002",
                    Viewvalue: "até 2002"
                  },
                  {
                    value: "year < 2004",
                    Viewvalue: "até 2004"
                  },
                  {
                    value: "year < 2006",
                    Viewvalue: "até 2006"
                  },
                  {
                    value: "year < 2008",
                    Viewvalue: "até 2008"
                  },
                  {
                    value: "year < 2010",
                    Viewvalue: "até 2010"
                  },
                  {
                    value: "year < 2012",
                    Viewvalue: "até 2012"
                  },
                  {
                    value: "year < 2013",
                    Viewvalue: "até 2013"
                  },
                  {
                    value: "year < 2014",
                    Viewvalue: "até 2014"
                  },
                  {
                    value: "year < 2015",
                    Viewvalue: "até 2015"
                  },
                  {
                    value: "year < 2016",
                    Viewvalue: "até 2016"
                  },
                  {
                    value: "year < 2017",
                    Viewvalue: "até 2017"
                  },
                  {
                    value: "year < 2018",
                    Viewvalue: "até 2018"
                  }
                ]
              }]
            },
            {
              id: "terraclass",
              label: "Uso e Cobertura da Terra",
              visible: false,
              selectedType: "uso_solo_terraclass_fip",
              types: [{
                  value: "uso_solo_terraclass_fip",
                  Viewvalue: "TerraClass-Cerrado - 2013",
                  opacity: 0.8,
                  order: 3
                },
                {
                  value: "bi_ce_cobertura_vegetal_250_2002_mma",
                  Viewvalue: "PROBIO-Cerrado - 2002",
                  opacity: 0.8,
                  order: 3
                },
                {
                  value: "agricultura_agrosatelite_fip",
                  Viewvalue: "Agricultura - Agrosatélite 2013/2014",
                  opacity: 0.8,
                  order: 3
                }
              ]
            },
            {
              id: "floresta_plantada",
              label: "Floresta Plantada",
              visible: false,
              selectedType: "floresta_plantada_fip",
              types: [{
                value: "floresta_plantada_fip",
                Viewvalue: "Transparent World",
                opacity: 0.8,
                order: 3
              }]
            }
          ]
        },
        {
          id: "infraestrutura",
          label: "Infraestrutura",
          group_expanded: false,
          layers: [{
              id: "osm_rodovias",
              label: "Malha Viária (Federal/Estadual)",
              visible: false,
              selectedType: "osm_rodovias",
              types: [{
                value: "osm_rodovias",
                Viewvalue: "Rodovias - Open Street Map",
                opacity: 0.8,
                order: 3
              }]
            },
            {
              id: "armazens",
              label: "Armazéns",
              visible: false,
              selectedType: "armazens_fip",
              types: [{
                value: "armazens_fip",
                Viewvalue: "Armazéns - LAPIG",
                opacity: 0.8,
                order: 3
              }]
            },
            {
              id: "frigorificos",
              label: "Matadouros e Frigoríficos",
              visible: false,
              selectedType: "matadouros_e_frigorificos",
              types: [{
                value: "matadouros_e_frigorificos",
                Viewvalue: "Frigoríficos - LAPIG",
                opacity: 0.8,
                order: 3
              }]
            }
          ]
        },
        {
          id: "geofisico",
          label: "Geofísico",
          group_expanded: false,
          layers: [{
              id: "altitude",
              label: "Altitude",
              visible: false,
              selectedType: "bi_ce_srtm_altitude_30_2000_lapig",
              types: [{
                value: "bi_ce_srtm_altitude_30_2000_lapig",
                Viewvalue: "Altitude - SRTM",
                opacity: 0.8,
                order: 3
              }]
            },
            {
              id: "declividade",
              label: "Declividade",
              visible: false,
              selectedType: "bi_ce_srtm_declividade_30_2000_lapig",
              types: [{
                value: "bi_ce_srtm_declividade_30_2000_lapig",
                Viewvalue: "Declividade - SRTM",
                opacity: 0.8,
                order: 3
              }]
            }
          ]
        },
        {
          id: "edafoclimaticos",
          label: "Edafoclimáticos",
          group_expanded: false,
          layers: [{
              id: "solos",
              label: "Solos (1:250.000)",
              visible: false,
              selectedType: "solos_ibge",
              types: [{
                value: "solos_ibge",
                Viewvalue: "Solos - IBGE",
                opacity: 0.8,
                order: 3
              }]
            },
            {
              id: "precipitacao",
              label: "Média da Precipitação Acumulada",
              visible: false,
              selectedType: "bi_ce_precipitacao_historica_30_lapig",
              types: [{
                value: "bi_ce_precipitacao_historica_30_lapig",
                Viewvalue: "Precipitação - TRMM/GPM",
                opacity: 0.8,
                order: 3
              }]
            }
          ]
        },
        {
          id: "imagens",
          label: "Acervo de Imagens",
          group_expanded: false,
          layers: [{
            id: "satelite",
            label: "Mosaico de Imagens",
            visible: false,
            selectedType: "landsat",
            types: [{
                value: "landsat",
                Viewvalue: "Landsat",
                order: 10,
                opacity: 1,
                timeLabel: "Ano",
                timeSelected: "bi_ce_mosaico_landsat_completo_30_2018_fip",
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
                  }
                ]
              },
              {
                value: "sentinel",
                Viewvalue: "Sentinel",
                order: 10,
                opacity: 1,
                timeLabel: "Ano",
                timeSelected: "bi_ce_mosaico_sentinel_10_2018_lapig",
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
            viewValue: "Geopolítico",
            visible: true
          },
          {
            value: "satelite",
            viewValue: "Satélite",
            visible: false
          },
          {
            value: "estradas",
            viewValue: "Estradas",
            visible: false
          },
          {
            value: "relevo",
            viewValue: "Relevo",
            visible: false
          }
        ]
      }],
      limits: [{
        id: "limits_bioma",
        types: [{
            value: "biomas",
            Viewvalue: "Cerrado",
            visible: true,
            layer_limits: true,
            opacity: 1
          },
          {
            value: "estados",
            Viewvalue: "Estados",
            visible: false,
            layer_limits: true,
            opacity: 1
          },
          {
            value: "municipios",
            Viewvalue: "Municípios",
            visible: false,
            layer_limits: true,
            opacity: 1
          }
        ],
        selectedType: "biomas"
      }]
    };

    response.send(result);
    response.end();
  };

  return Controller;
};