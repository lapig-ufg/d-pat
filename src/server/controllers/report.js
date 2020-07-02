var fs = require("fs");
var languageJson = require('../assets/lang/language.json');
var path = require('path');

module.exports = function (app) {
  var Controller = {};
  var Internal = {};

  var client = app.database.client;
  var queries = app.database.queries.report;


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


    var queryABC = request.queryResult["abc"];

    var vetABC = [];
    queryABC.forEach(function (row) {

      var boxCar = row["bboxprop"]
        .replace("BOX(", "")
        .replace(")", "")
        .split(" ")
        .join(",");
      var prop_desmat = parseFloat(row["prop_desm"]);
    //   var cod_car = row["codcar"];
      var tec_impl = row["tec_impl"];
      var chave_id = row["chave_id"];
      var area_propriedade = parseFloat(row["area_propriedade"]);
      var area_tecnologia = parseFloat(row["area_tecnologia"]);
      var area_desmatada = parseFloat(row["area_desmatada"]);
      var area_exp = parseFloat(row["area_exp"]);
      var ano = parseInt(row["year"]);

      let urlProp = {};
      let metaDataCar = {};

      if (boxCar == undefined) {
        urlProp = {
          show: false
        };
      } else {
        urlProp = {
          show: true,
          thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          ano + "_fip," + "fip_abc_cerrado_area_explorada," + "fip_abc_cerrado_perimetro_prop," + "fip_abc_cerrado_area_tecnologia," +
             "bi_ce_prodes_desmatamento_100_fip_realce_maior" + "&bbox=" + boxCar + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=chave_id='" + chave_id+"'",

          src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
          ano + "_fip," + "fip_abc_cerrado_area_explorada," + "fip_abc_cerrado_perimetro_prop," +  "fip_abc_cerrado_area_tecnologia," +
             "bi_ce_prodes_desmatamento_100_fip_realce_maior" + "&bbox=" + boxCar + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=chave_id='" + chave_id+"'",

          legendProp: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=fip_abc_cerrado_perimetro_prop&format=image/png",
          legendTec: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=fip_abc_cerrado_area_tecnologia&format=image/png",
          legendExp: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=fip_abc_cerrado_area_explorada&format=image/png",
          legendDesmatamento: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=bi_ce_prodes_desmatamento_100_fip_realce_maior&format=image/png",

        };

        console.log("bbbbbbbbbbbbb achouuuuuu")

        metaDataCar = {
            prop_desmat: prop_desmat,
            tec_impl: tec_impl,
        //   cod_car: cod_car,
          area_desmatada: area_desmatada,
          area_propriedade: area_propriedade,
          area_tecnologia: area_tecnologia,
          area_explorada: area_exp,
          chaveID: chave_id
        }
      }

      var resultCar = {
        show: urlProp.show,
        imgsProp: urlProp,
        metaData: metaDataCar
      };

      vetABC.push(resultCar);

    });


    response.send({
      info: infoDesmat,
      ponto_campo: resultCampo,
      images: imagesDesmat,
      car: vetCar,
      ABC: vetABC
    });
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

  Controller.store = function (request, response) {
    let token = request.queryResult['store'];
    response.send(token);
    response.end()
  };

  Controller.reportByToken = function (request, response) {
    let report = request.queryResult['reportByToken'];
    response.send(report);
    response.end()
  };

  return Controller;
};
