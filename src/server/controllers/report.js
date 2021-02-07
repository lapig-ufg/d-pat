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
      if (ea.includes('20')) {
        ea = 'antropico'
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


  Controller.car = function (request, response) {
    var gid = request.param("gid");
    var origin_table = request.param("origin");
    var year = request.param("year");
    var language = request.param('lang')

    var qc = request.queryResult["car"];

    let stringified = qc.map(i => JSON.stringify(i));
    var queryCar = stringified.filter((k, idx) => stringified.indexOf(k) === idx)
      .map(j => JSON.parse(j))

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

      let sizeSrc = 768;
      let sizeThumb = 400;

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
      car: vetCar,
    });
    response.end();

  }

  Controller.especial = function (request, response) {
    var gid = request.param("gid");
    var origin_table = request.param("origin");
    var year = request.param("year");
    var language = request.param('lang')

    if (parseInt(year) == 2020 || year == '2019') {
      year = 2019;
    }


    let sizeSrc = 768;
    let sizeThumb = 400;

    var queryEspeciais = request.queryResult['areas_especiais'];

    var vetEspeciais = []
    queryEspeciais.forEach(function (row) {

      let dataEspeciais = row;

      dataEspeciais.bbox_ti = dataEspeciais["bbox_ti"].replace("BOX(", "").replace(")", "").split(" ").join(",");
      dataEspeciais.bbox_q = dataEspeciais["bbox_q"].replace("BOX(", "").replace(")", "").split(" ").join(",");
      dataEspeciais.bbox_ucpi = dataEspeciais["bbox_ucpi"].replace("BOX(", "").replace(")", "").split(" ").join(",");
      dataEspeciais.bbox_ucus = dataEspeciais["bbox_ucus"].replace("BOX(", "").replace(")", "").split(" ").join(",");
      // dataEspeciais.bbox_ap = dataEspeciais["bbox_ap"].replace("BOX(", "").replace(")", "").split(" ").join(",");

      let urlTI = {};
      let urlQ = {};
      let urlUCPI = {};
      let urlUCUS = {};
      let urlAP = {};

      if (dataEspeciais.bbox_ti == undefined) {
        urlTI = {
          show: false
        };
      } else {
        urlTI = {
          show: (dataEspeciais.ti_dist <= 20) ? true : false,
          thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "terra_indigena_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_ti + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.ti_gid,

          src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "terra_indigena_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_ti + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.ti_gid,

          legendEspecial: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=terra_indigena_cerrado&format=image/png",
          legendDesmatamento: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=" + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior&format=image/png",
          ti_nom: dataEspeciais.ti_nom,
          ti_dist: parseFloat(dataEspeciais.ti_dist).toFixed(2)
        };
      }

      if (dataEspeciais.bbox_q == undefined) {
        urlQ = {
          show: false
        };
      } else {
        urlQ = {
          show: (dataEspeciais.q_dist <= 20) ? true : false,
          thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "areas_quilombola_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_q + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.q_gid,

          src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "areas_quilombola_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_q + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.q_gid,

          legendEspecial: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=areas_quilombola_cerrado&format=image/png",
          legendDesmatamento: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=" + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior&format=image/png",
          q_nom: dataEspeciais.q_nom,
          q_dist: parseFloat(dataEspeciais.q_dist).toFixed(2)
        };
      }

      if (dataEspeciais.bbox_ucpi == undefined) {
        urlUCPI = {
          show: false
        };
      } else {
        urlUCPI = {
          show: (dataEspeciais.ucpi_dist <= 20) ? true : false,
          thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "ucs_protecao_integral_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_ucpi + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.ucpi_gid,

          src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "ucs_protecao_integral_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_ucpi + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.ucpi_gid,

          legendEspecial: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=ucs_protecao_integral_cerrado&format=image/png",
          legendDesmatamento: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=" + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior&format=image/png",
          ucpi_nom: dataEspeciais.ucpi_nom,
          ucpi_dist: parseFloat(dataEspeciais.ucpi_dist).toFixed(2)
        };
      }

      if (dataEspeciais.bbox_ucus == undefined) {
        urlUCUS = {
          show: false
        };
      } else {
        urlUCUS = {
          show: (dataEspeciais.ucus_dist <= 20) ? true : false,
          thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "ucs_uso_sustentavel_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_ucus + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.ucus_gid,

          src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            year + "_fip," + "ucs_uso_sustentavel_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_ucus + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.ucus_gid,

          legendEspecial: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=ucs_uso_sustentavel_cerrado&format=image/png",
          legendDesmatamento: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=" + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior&format=image/png",
          ucus_nom: dataEspeciais.ucus_nom,
          ucus_dist: parseFloat(dataEspeciais.ucus_dist).toFixed(2)
        };
      }

      // if (dataEspeciais.bbox_ap == undefined) {
      //   urlAP = {
      //     show: false
      //   };
      // } else {
      //   urlAP = {
      //     // show: (dataEspeciais.ap_dist <= 20) ? true : false,
      //     show: false,
      //     thumb: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
      //       year + "_fip," + "areas_prioritarias_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_ap + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
      //       sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.ap_gid,

      //     src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
      //       year + "_fip," + "areas_prioritarias_cerrado," + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior" + "&bbox=" + dataEspeciais.bbox_ap + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
      //       sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=gid=" + dataEspeciais.ap_gid,

      //     legendEspecial: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=areas_prioritarias_cerrado&format=image/png",
      // legendDesmatamento: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=" + "bi_ce_" + origin_table + "_desmatamento_100_fip_realce_maior&format=image/png",
      //     ap_nom: dataEspeciais.ap_nom,
      //     ap_dist: parseFloat(dataEspeciais.ap_dist).toFixed(2)
      //   };
      // }

      var resultEspecial = {
        ti: urlTI,
        ucpi: urlUCPI,
        ucus: urlUCUS,
        // ap: urlAP,
        q: urlQ
      };

      vetEspeciais.push(resultEspecial);

    });

    response.send({
      especial: vetEspeciais[0]
    });
    response.end();

  }


  Controller.field = function (request, response) {
    var gid = request.param("gid");
    var origin_table = request.param("origin");
    var year = request.param("year");
    var language = request.param('lang')

    if (parseInt(year) == 2020 || year == '2019') {
      year = 2019;
    }


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


      for (let index = 0; index < mostFreq.length; index++) {
        if (mostFreq[index].toUpperCase() === "VEG_NAT") {
          classeFinalAmostral += languageJson["dialog_relatorio"]["historico_amostral_landsat"]["amostral_class_vegetation"][language]
        } else if (mostFreq[index].toUpperCase() === "AGUA") {
          classeFinalAmostral += languageJson["dialog_relatorio"]["historico_amostral_landsat"]["amostral_class_water"][language]
        } else {
          classeFinalAmostral += languageJson["dialog_relatorio"]["historico_amostral_landsat"]["amostral_class_anthropic"][language]
        }
      }

      classeFinalAmostral.slice(0, -1).replace(" ", "/")
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

    var qabc = request.queryResult["abc"];

    stringified = qabc.map(i => JSON.stringify(i));
    var queryABC = stringified.filter((k, idx) => stringified.indexOf(k) === idx)
      .map(j => JSON.parse(j))

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
      var producao = row["producao"];
      var chave_id = row["chave_id"];
      var area_propriedade = parseFloat(row["area_propriedade"]);
      var area_tecnologia = parseFloat(row["area_tecnologia"]);
      var area_desmatada = parseFloat(row["area_desmatada"]);
      var area_exp = parseFloat(row["area_exp"]);
      var ano = parseInt(row["year"]);

      let urlProp = {};
      let metaDataABC = {};

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
            sizeThumb + "&height=" + sizeThumb + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=chave_id='" + chave_id + "'",

          src: app.config.ows_host + "/ows?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&layers=bi_ce_mosaico_landsat_completo_30_" +
            ano + "_fip," + "fip_abc_cerrado_area_explorada," + "fip_abc_cerrado_perimetro_prop," + "fip_abc_cerrado_area_tecnologia," +
            "bi_ce_prodes_desmatamento_100_fip_realce_maior" + "&bbox=" + boxCar + "&TRANSPARENT=TRUE&srs=EPSG:4674&width=" +
            sizeSrc + "&height=" + sizeSrc + "&format=image/png&styles=&ENHANCE=TRUE&MSFILTER=gid=" + gid + "&MSFILTERCAR=chave_id='" + chave_id + "'",

          legendProp: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=fip_abc_cerrado_perimetro_prop&format=image/png",
          legendTec: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=fip_abc_cerrado_area_tecnologia&format=image/png",
          legendExp: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=fip_abc_cerrado_area_explorada&format=image/png",
          legendDesmatamento: app.config.ows_host + "/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=bi_ce_prodes_desmatamento_100_fip_realce_maior&format=image/png",

        };

        metaDataABC = {
          prop_desmat: prop_desmat,
          tec_impl: tec_impl,
          producao: producao,
          area_desmatada: area_desmatada,
          area_propriedade: area_propriedade,
          area_tecnologia: area_tecnologia,
          area_explorada: area_exp,
          chaveID: chave_id
        }
      }

      var resultABC = {
        show: urlProp.show,
        imgsProp: urlProp,
        metaData: metaDataABC
      };

      vetABC.push(resultABC);

    });

    response.send({
      info: infoDesmat,
      ponto_campo: resultCampo,
      images: imagesDesmat,
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
