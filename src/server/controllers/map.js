var fs = require("fs");
var languageJson = require('../assets/lang/language.json');
var path = require('path');

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

  Internal.mostFreqString = function (arr) {
    var obj = {},
      mostFreq = 0,
      which = [];

    arr.forEach(ea => {
      if(ea.includes('20')){
        ea='antropico'
      }

      if (!obj[ea]) {
        obj[ea] = 1;
      } else {
        obj[ea]++;
      }

      if (obj[ea] > mostFreq) {
        mostFreq = obj[ea];
        which = [ea];
      } else if (obj[ea] === mostFreq) {
        which.push(ea);
      }
    });

    return which;
  };

  Internal.filterLanguage = function filterItems(query, array) {
    return array.filter(function(el) {
      if(el[0] === query){
        return el[1];
      }
    })
  };


  Internal.getMetadata = function(metadata, language){
    let _metadata = [];

    metadata.forEach(function (data) {
      _metadata.push({'title': data.title[language], 'description': data.description[language]});
    });

    return _metadata;

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
    var language = request.param('lang')

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
        longitude: row["longitude"],
        campo: row["campo"]
      });
    });


    var queryResultDesmat = request.queryResult["desmatamento"];

    let box, area, prob_suscept, prob_suscept_small, prob_suscept_large, prob_bfast, lat, long, classefip;
    queryResultDesmat.forEach(function (row) {
      box = row["polygon"]
        .replace("BOX(", "")
        .replace(")", "")
        .split(" ")
        .join(",");
      area = parseFloat(row["areamunkm"]);
      prob_suscept = parseFloat(row["sucept_desmat"]);
      prob_suscept_small = parseFloat(row["sucept_desmat_peq"]);
      prob_suscept_large = parseFloat(row["sucept_desmat_grd"]);
      prob_bfast = parseFloat(row["bfm"]);
      lat = parseFloat(row["lat"]);
      long = parseFloat(row["long"]);
      classefip = row["classefip"]
    });

    var queryResultAmostral = request.queryResult["validacao_amostral"];
    var amostralPerPoint = [];
    queryResultAmostral.forEach(function (row) {

      amostralPerPoint.push({
        lon: row["lon"],
        lat: row["lat"],
        classes2000_2018: [row["d_2000"], row["d_2001"], row["d_2002"], row["d_2003"], row["d_2004"], row["d_2005"], row["d_2006"], row["d_2007"], row["d_2008"], row["d_2009"],
          row["d_2010"], row["d_2011"], row["d_2012"], row["d_2013"], row["d_2014"], row["d_2015"], row["d_2016"], row["d_2017"], row["d_2018"]
        ],
        classe: row["classe"]
      });

    });
    var classeFinalAmostral = "";
    var existAmostral = false;

    if (amostralPerPoint.length > 0) {
      let tmpMostFreq = []
      for (let index = 0; index < amostralPerPoint.length; index++) {
        tmpMostFreq.push(amostralPerPoint[index].classe)
      }
      var mostFreq = Internal.mostFreqString(tmpMostFreq);


      for(let index = 0; index < mostFreq.length; index++){
        if (mostFreq[index].toUpperCase() === "VEG_NAT") {
          classeFinalAmostral += languageJson["dialog_relatorio"]["historico_amostral_landsat"]["amostral_class_vegetation"][language]
        } else if (mostFreq[index].toUpperCase() === "AGUA") {
          classeFinalAmostral += languageJson["dialog_relatorio"]["historico_amostral_landsat"]["amostral_class_water"][language]
        } else {
          classeFinalAmostral += languageJson["dialog_relatorio"]["historico_amostral_landsat"]["amostral_class_anthropic"][language]
        }
      }

      classeFinalAmostral.slice(0, -1).replace(" ","/")
      existAmostral = true;
    }

    var resultAmostral = {
      exist: existAmostral,
      perPoint: amostralPerPoint,
      finalClass: classeFinalAmostral
    }

    let sizeSrc = 768;
    let sizeThumb = 400;

    var urlsLandsatMontadas = [];
    for (let ano = 2000; ano <= 2019; ano++) {
      urlsLandsatMontadas.push({
        url: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          ano + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip,bi_ce_validacao_amostral_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSAMOSTRAL=prodes_id=" + gid,
        year: ano,
        thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          ano + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip,bi_ce_validacao_amostral_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSAMOSTRAL=prodes_id=" + gid
      });

      if (ano < 2012) {
        ano++;
      }
    }

    let legendLandsat = app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=bi_ce_validacao_amostral_fip&format=image/png";

    let urlSentinel;

    urlSentinel = {
      thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
        year + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
        sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid,

      src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
        year + "_fip,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
        sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid
    };


    // urlSentinel = {
    //   thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_sentinel_10_" +
    //     year + "_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
    //     sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid,

    //   src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_sentinel_10_" +
    //   year + "_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" + box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
    //     sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid
    // };


    let urlSuscept = "";
    let typeSuscept = "";
    let legendSuscept = "";
    if (prob_suscept == prob_suscept_large) {
      urlSuscept = {
        thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          year + "_fip,bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" +
          box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" + sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid,

        src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" + year +
          "_fip,bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig,bi_ce_" + origin_table + "_desmatamento_100_fip&bbox=" +
          box + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
          sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid
      };
      typeSuscept = languageJson["dialog_relatorio"]["analise_automatica"]["type_suscept_larger"][language];
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
      typeSuscept = languageJson["dialog_relatorio"]["analise_automatica"]["type_suscept_smaller"][language];
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
      urlsLandSat: {
        urlsLandsatMontadas: urlsLandsatMontadas,
        legend: legendLandsat,
        dadosAmostrais: resultAmostral
      },
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
      longitude: long,
      classefip: classefip
    };

    var queryCar = request.queryResult["car"];

    var urlsLandsatMontadas = [];

    var vetCar = [];
    queryCar.forEach(function (row) {

      var boxCar = row["bboxcar"]
        .replace("BOX(", "")
        .replace(")", "")
        .split(" ")
        .join(",");
      var area_car = parseFloat(row["areacar"]);
      var cod_car = row["codcar"];
      var data_ref_car = row["datarefcar"];
      var area_desmat_rl = parseFloat(row["area_desmat_rl"]);
      var area_desmat_app = parseFloat(row["area_desmat_app"]);
      var qnt_nascente = parseInt(row["qnt_nascente"]);
      var area_desmatada = parseFloat(row["area_desmatada"]);
      var cargid = parseInt(row["cargid"]);
      var area_reserva_legal_total = parseFloat(row["area_reserva_legal_total"]);
      var area_app_total = parseFloat(row["area_app_total"]);

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

    var language = request.param('lang')

    var result = {
      regionFilterDefault: "",
      type: languageJson["descriptor"]["type_of_information_label"][language],
      groups: [{
          id: "desmatamento",
          label: languageJson["descriptor"]["desmatamento"]["label"][language],
          group_expanded: true,
          layers: [{
              id: "desmatamento_prodes",
              label: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["label"][language],
              visible: true,
              selectedType: "prodes_por_region_fip_img",
              metadata: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]['metadata'],
              types: [{
                  value: "prodes_por_region_fip_img",
                  Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["prodes_por_region_fip_img"]["view_value"][language],
                  opacity: 1,
                  order: 1,
                  regionFilter: true,
                  timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["prodes_por_region_fip_img"]["timelabel"][language],
                  timeSelected: "region_type = 'city' AND prodes_year=2019",
                  timeHandler: "msfilter",
                  times: [{
                      value: "region_type = 'city' AND prodes_year=2002",
                      Viewvalue: "2000/2002",
                      year: 2002
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2004",
                      Viewvalue: "2002/2004",
                      year: 2004
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2006",
                      Viewvalue: "2004/2006",
                      year: 2006
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2008",
                      Viewvalue: "2006/2008",
                      year: 2008
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2010",
                      Viewvalue: "2008/2010",
                      year: 2010
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2012",
                      Viewvalue: "2010/2012",
                      year: 2012
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2013",
                      Viewvalue: "2012/2013",
                      year: 2013
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2014",
                      Viewvalue: "2013/2014",
                      year: 2014
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2015",
                      Viewvalue: "2014/2015",
                      year: 2015
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2016",
                      Viewvalue: "2015/2016",
                      year: 2016
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2017",
                      Viewvalue: "2016/2017",
                      year: 2017
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2018",
                      Viewvalue: "2017/2018",
                      year: 2018
                    },
                    {
                      value: "region_type = 'city' AND prodes_year=2019",
                      Viewvalue: "2018/2019",
                      year: 2019
                    }
                  ]
                },
                {
                  value: "bi_ce_prodes_desmatamento_100_fip",
                  Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["bi_ce_prodes_desmatamento_100_fip"]["view_value"][language],
                  opacity: 1,
                  order: 1,
                  regionFilter: true,
                  timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["bi_ce_prodes_desmatamento_100_fip"]["timelabel"][language],
                  timeSelected: "year=2019",
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
                    }
                  ]
                },
                {
                  value: "bi_ce_prodes_desmatamento_pontos_campo_fip",
                  Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_prodes"]["types"]["bi_ce_prodes_desmatamento_pontos_campo_fip"]["view_value"][language],
                  opacity: 1,
                  order: 1,
                  regionFilter: true,
                  /*timeLabel: "Campo",
                  timeSelected: "1=1",
                  timeHandler: "msfilter",
                  times: [{
                      value: "1=1",
                      Viewvalue: "Todos"
                    },
                    {
                      value: "pc.campo like 'Campo_01'",
                      Viewvalue: "Campo 01"
                    },
                    {
                      value: "pc.campo like 'Campo_02'",
                      Viewvalue: "Campo 02"
                    },
                    {
                      value: "pc.campo like 'Campo_03'",
                      Viewvalue: "Campo 03"
                    },
                    {
                      value: "pc.campo like 'Campo_04'",
                      Viewvalue: "Campo 04"
                    }
                  ]*/
                }
              ]
            },
            {
              id: "desmatamento_deter",
              label: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["label"][language],
              visible: false,
              metadata: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]['metadata'],
              selectedType: "bi_ce_deter_desmatamento_100_fip",
              types: [{
                  value: "bi_ce_deter_desmatamento_100_fip",
                  Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["view_value"][language],
                  opacity: 1,
                  order: 1,
                  regionFilter: true,
                  timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["timelabel"][language],
                  timeSelected: "view_date > '2019-01-01'",
                  timeHandler: "msfilter",
                  times: [{
                      value: "view_date > (current_date - interval '90' day)",
                      Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_100_fip"]["times"]["view_date > (current_date - interval '90' day)"][language]
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
                // {
                //   value: "bi_ce_deter_desmatamento_alta_suceptibilidade_100_fip",
                //   Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["deter_cerrado"]["types"]["bi_ce_deter_desmatamento_alta_suceptibilidade_100_fip"]["view_value_alta_susceptibilidade"][language],
                //   opacity: 1,
                //   order: 1,
                //   regionFilter: true,
                //   timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["deter_cerrado"]["types"]["bi_ce_deter_desmatamento_alta_suceptibilidade_100_fip"]["timelabel_alta_susceptiblidade"][language],
                //   timeSelected: "view_date > '2019-01-01'",
                //   timeHandler: "msfilter",
                //   times: [{
                //       value: "view_date > (current_date - interval '90' day)",
                //       Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["deter_cerrado"]["types"]["bi_ce_deter_desmatamento_alta_suceptibilidade_100_fip"]["times_deter_alta_susceptibilidade"]["view_value_last_90_days"][language]
                //     },
                //     {
                //       value: "view_date > '2019-01-01'",
                //       Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["deter_cerrado"]["types"]["bi_ce_deter_desmatamento_alta_suceptibilidade_100_fip"]["times_deter_alta_susceptibilidade"]["view_value_apartir_2019"][language]
                //     },
                //     {
                //       value: "view_date > '2018-01-01'",
                //       Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["deter_cerrado"]["types"]["bi_ce_deter_desmatamento_alta_suceptibilidade_100_fip"]["times_deter_alta_susceptibilidade"]["view_value_apartir_2018"][language]
                //     }
                //   ]
                // },
                {
                  value: "bi_ce_deter_desmatamento_pontos_campo_fip",
                  Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["desmatamento_deter"]["types"]["bi_ce_deter_desmatamento_pontos_campo_fip"]["view_value"][language],
                  opacity: 1,
                  order: 1,
                  regionFilter: true,
                  /*timeLabel: "Campo",
                  timeSelected: "1=1",
                  timeHandler: "msfilter",
                  times: [{
                      value: "1=1",
                      Viewvalue: "Todos"
                    },
                    {
                      value: "pc.campo like 'Campo_01'",
                      Viewvalue: "Campo 01"
                    },
                    {
                      value: "pc.campo like 'Campo_02'",
                      Viewvalue: "Campo 02"
                    },
                    {
                      value: "pc.campo like 'Campo_03'",
                      Viewvalue: "Campo 03"
                    },
                    {
                      value: "pc.campo like 'Campo_04'",
                      Viewvalue: "Campo 04"
                    }
                  ]*/
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
                regionFilter: true,
                timeLabel: languageJson["descriptor"]["desmatamento"]["layers"]["antropico"]["types"]["bi_ce_prodes_antropico_100_fip"]["timelabel"][language],
                timeSelected: "year < 2018",
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
                  opacity: 1
                },
                {
                  value: "bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig",
                  Viewvalue: languageJson["descriptor"]["desmatamento"]["layers"]["susceptibilidade"]["types"]["bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig"]["view_value"][language],
                  order: 5,
                  opacity: 1
                }
              ]
            }
          ]
        },
        {
          id: "uso_da_terra",
          label: languageJson["descriptor"]["uso_da_terra"]["label"][language],
          group_expanded: false,
          layers: [{
              id: "terraclass",
              label: languageJson["descriptor"]["uso_da_terra"]["layers"]["terraclass"]["label"][language],
              visible: false,
              selectedType: "uso_solo_terraclass_fip",
              types: [
                // {
                //   value: "uso_solo_mapbiomas",
                //   Viewvalue: "Mapbiomas - 2018",
                //   opacity: 0.8,
                //   order: 3
                // },
                {
                  value: "uso_solo_terraclass_fip",
                  Viewvalue: "TerraClass-Cerrado - 2013",
                  metadata:languageJson["descriptor"]["uso_da_terra"]["layers"]["terraclass"]['uso_solo_terraclass_fip']['metadata'],
                  opacity: 0.8,
                  order: 3
                },
                {
                  value: "bi_ce_cobertura_vegetal_250_2002_mma",
                  Viewvalue: "PROBIO-Cerrado - 2002",
                  metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]["terraclass"]['bi_ce_cobertura_vegetal_250_2002_mma']['metadata'],
                  opacity: 0.8,
                  order: 3
                },
                {
                  value: "agricultura_agrosatelite_fip",
                  Viewvalue: "Agrosatélite 2013/2014",
                  metadata: languageJson["descriptor"]["uso_da_terra"]["layers"]["terraclass"]['agricultura_agrosatelite_fip']['metadata'],
                  opacity: 0.8,
                  order: 3
                }
              ]
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
                opacity: 0.8,
                order: 3
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
                opacity: 0.8,
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
                opacity: 0.8,
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
                opacity: 0.8,
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
              metadata: languageJson["descriptor"]["geofisico"]["layers"]['altitude']['metadata'],
              selectedType: "bi_ce_srtm_altitude_30_2000_lapig",
              types: [{
                value: "bi_ce_srtm_altitude_30_2000_lapig",
                Viewvalue: "SRTM",
                opacity: 0.8,
                order: 3
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
                order: 3
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
                opacity: 0.8,
                order: 3
              }]
            },
            {
              id: "precipitacao",
              label: languageJson["descriptor"]["edafoclimaticos"]["layers"]["precipitacao"]["label"][language],
              visible: false,
              metadata: languageJson["descriptor"]["edafoclimaticos"]["layers"]['precipitacao']['metadata'],
              selectedType: "bi_ce_precipitacao_historica_30_lapig",
              types: [{
                value: "bi_ce_precipitacao_historica_30_lapig",
                Viewvalue: "TRMM/GPM",
                opacity: 0.8,
                order: 3
              }]
            }
          ]
        },
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
                opacity: 1,
                metadata: languageJson["descriptor"]["imagens"]["layers"]['satelite']['landsat']['metadata'],
                timeLabel: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["timelabel"][language],
                timeSelected: "bi_ce_mosaico_landsat_completo_30_2019_fip",
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
                  }
                ]
              },
              {
                value: "sentinel",
                Viewvalue: "Sentinel",
                order: 10,
                opacity: 1,
                metadata: languageJson["descriptor"]["imagens"]["layers"]['satelite']['sentinel']['metadata'],
                timeLabel: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["timelabel"][language],
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
            viewValue: languageJson["descriptor"]["basemaps"]["types"]["mapbox"][language],
            visible: true
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
          }
        ]
      }],
      limits: [{
        id: "limits_bioma",
        types: [{
            value: "limite_cerrado",
            Viewvalue: languageJson["descriptor"]["limits"]["types"]["limite_cerrado"][language],
            visible: true,
            layer_limits: true,
            opacity: 1
          },
          {
            value: "estados",
            Viewvalue: languageJson["descriptor"]["limits"]["types"]["estados"][language],
            visible: false,
            layer_limits: true,
            opacity: 1
          },
          {
            value: "municipios_cerrado",
            Viewvalue: languageJson["descriptor"]["limits"]["types"]["municipios_cerrado"][language],
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
        label_area_rl: languageJson["mini_report_utfgrid"]["label_area_rl"][language]
      },
      layer_box: {
        title: languageJson["layer_box"]["title"][language],
        label_data: languageJson["layer_box"]["label_data"][language],
        label_mapabase: languageJson["layer_box"]["label_mapabase"][language],
        label_limits: languageJson["layer_box"]["label_limits"][language],
        label_upload: languageJson["layer_box"]["label_upload"][language],
        label_upload_msg: languageJson["layer_box"]["label_upload_msg"][language],
        label_upload_title_file: languageJson["layer_box"]["label_upload_title_file"][language],
        label_upload_max_size_msg: languageJson["layer_box"]["label_upload_max_size_msg"][language],
        search_placeholder: languageJson["layer_box"]["search_placeholder"][language],
        search_loading: languageJson["layer_box"]["search_loading"][language],
        search_failed: languageJson["layer_box"]["search_failed"][language]
      },
      descriptor: languageJson["descriptor"]

    };

    response.send(result);
    response.end();
  };



  Controller.textreport = function (request, response) {
    var language = request.param('lang')

    var jsonPath = path.join(__dirname, '..', 'assets', 'lang', 'language.json');
    var languageFile = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    var dialogJson = languageFile["dialog_relatorio"];

    var keys = {};

    Object.keys(dialogJson).forEach(function (key, index) {
      keys[key] = key
    });

    var result = {};
    Object.keys(keys).forEach(function (key, index) {

      if (dialogJson[key].hasOwnProperty("pt-br")) {
        result[key] = dialogJson[key][language]
      } else {
        result[key] = dialogJson[key]
        Object.keys(dialogJson[key]).forEach(function (key2, index) {
          result[key][key2] = dialogJson[key][key2][language]
        });
      }
    });

    response.send(result);
    response.end();

  };


  return Controller;
};