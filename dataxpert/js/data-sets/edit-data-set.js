/*
Titulo:  add-data-set.js
Descripción: Gestiona funciones para add-data-set.html


Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 10/01/2021

Otros cambios:
Sin cambios nuevos
*/

/**
 * @var $validator objeto jquery para la validacion campos del form
 */
var $validator;

/**
 * @var csvFile archivo csv del input "#file-cvs"
 */
var csvFile = null;


/**
 * @var {JSON} loggedUserInfo informacion del usuario en la sesion actual 
 */
var loggedUserInfo;

var globalTags = [];

var fileIsCompatible = true;
var dataSetID;

var globalCategorias;

  /**
     * Ejecuta configuraciones especificas de pagina dependiendo del rol.
     * @param usuario JSON con informacion de usuario
  */
$(window).on("load", function () {
  $validator = $("#frm-add").validate({
    rules: {
      nombreField: {
        required: true,
        minlength: 1
      },
      fuenteField: {
        required: true,
        minlength: 1
      },
      codigoField: {
        required: true,
        minlength: 1
      },
      // publicadorField: {
      //   required: true,
      //   minlength: 1
      // },
      detallesField: {
        required: true,
        minlength: 1
      },
      tagsField: {
        required: true,
        minlength: 1
      }
    }
  });

});

  /**
     * Ejecuta configuraciones especificas de pagina dependiendo del rol. Esta funcion es llamada en el header de la pagina
     * @param usuario JSON con informacion de usuario
  */
async function setPage(usuario) {

  loggedUserInfo = usuario;

  /*
      var rol = usuario.tipo.N.toString();
      switch (rol) {
          case "1":
              // encaso de tipo 1
              break;
          case "2":
              window.location.href = "../home/index.html";
              break;
          case "3":
              window.location.href = "../home/index.html";
              break;
      }
  */
  globalCategorias = await getCategorias();
  
  if (GetURLParameter("") != "") {

    dataSetID = GetURLParameter("");
    DAT.getDataSet({
      id: dataSetID
    }, setEdit);
  } else {
    window.location.href = "lista-data-set.html";
  }

}

  /**
   * @function setCategorias puebla #selectCategoria con las categorias traidas desde base de datos
   * @param {JSON} categorias 
   */
function setCategorias(categorias){
  if(categorias.length > 0 )
  {
    categorias.forEach(cat => {
      $("#selectCategoria").append('<option value='+cat.id+'>'+cat.nombre+'</option>');
    });
  }else
  {
    $("#selectCategoria").append('<option value=0>Sin categorías disponible</option>');
  }
  $('#selectCategoria').trigger('change');
}


  /**
     * @function setEdit Puebla el form con la informacion del data set a editar
     * @param {JSON} dataSet JSON con informacion del data-set
  */
function setEdit(dataSet) {
  setCategorias(globalCategorias);
  console.log("dataSet.categorias.SS[0]  = " +  dataSet.categorias.SS[0]);
  globalTags = dataSet.temas.SS;

  // let enlace = dataSet.enlace.S != ""?dataSet.enlace.S:"Sin enlace";
  // let comentario = dataSet.comentarioPublicador.S != ""?dataSet.comentarioPublicador.S:"Sin comentario";
  let tipoFecha =  (dataSet.periodo.S.match(/-/g) || []).length;
  $("#nombreField").val(dataSet.nombre.S);
  $("#fuenteField").val(dataSet.fuente.S);
  $("#codigoField").val(dataSet.codigoDataSet.S);
  //$("#publicadorField").val(dataSet.publicador.S);
  $("#detallesField").val(dataSet.detalle.S);
  $("#selectCategoria").val(dataSet.categorias.SS[0]);
  $("#fechaPeriodo").val(dataSet.periodo.S);

  $("#enlaceField").val(dataSet.enlace.S);
  $("#comPublicadorField").val(dataSet.comentarioPublicador.S);

  switch(tipoFecha){
    case 0:
      $("#defaultradio").prop("checked", true);
      break;
    case 1:
      $("#radio1").prop("checked", true);
      break;
    case 2:
      $("#radio2").prop("checked", true);
      break;
  }


  $('#selectCategoria').trigger('change');
  loadTags(globalTags);

  setTimeout(function () {
    $('.loader-wrapper').fadeOut('slow', function () {
      $(this).remove();
    });
  }, 300);
}


/**
 * @function loadTags carga lo tags dentro del input "#tagsField"
 * @param {*} tags 
 */
function loadTags(tags) {
  tags.forEach(tag => {
    $('#tagsField').tagsinput('add', tag);
  });
}

/**Revisa cuando se cambia el formato de fecha */
$( "input[name=dateFormatRadio]" ).change(function() {
  let val = $("input[name=dateFormatRadio]:checked").val();
  $('#fechaPeriodo').datepicker('remove');
  switch(val){
    case "1":
      
      $("#fechaPeriodo").datepicker({
        format: "yyyy",
        viewMode: "years", 
        minViewMode: "years",
        endDate: new Date()
      });
      break;
    
    case "2":
      // $( "#fechaPeriodo" ).datepicker( "setDate",new Date() );
      $("#fechaPeriodo").datepicker({
        format: "yyyy-mm",
        viewMode: "months", 
        minViewMode: "months",
        endDate: new Date()
      });
      break;
    
    case "3":
      $("#fechaPeriodo").datepicker({
        format: "yyyy-mm-dd",
        viewMode: "days", 
        minViewMode: "days",
        endDate: new Date()
      });
      break;
       
  }
  $('#fechaPeriodo').datepicker('update');
  $('#fechaPeriodo').val('').datepicker('update');
});


/**
 * @function sendFile sube el archivo al bucket en S3
 * @param {JSON} response json con url de bucket
 * @param {file} fileElement archivo RAW desde el input
 * @param {function} callback 
 */
function saveFile(fileElement, callback) {

  const file = fileElement;
  var extension_archivo = file.name.split('.');

  extension_archivo = extension_archivo[extension_archivo.length - 1];


  // Select the very first file from list
  var fileToLoad = file;
  // FileReader function for read the file.
  var fileReader = new FileReader();
  var base64;
  var source = "1";

  // Onload of file read the file content
  fileReader.onload = function (fileLoadedEvent) {
    base64 = fileLoadedEvent.target.result;
    // Print data in console
    var params = {
      source_event: source,
      files: base64,
      file_extension: extension_archivo
    };
    callback(params);

  };
  fileReader.readAsDataURL(fileToLoad);

}

function sendFile(response,fileElement,callback) {
    $.ajax({
      type: 'PUT',
      url: response.bucketURL,
      // Content type must much with the parameter you signed your URL with
      contentType: 'binary/octet-stream',
      // this flag is important, if not set, it will try to send data as a form
      processData: false,
      // the actual file is sent raw
      data: fileElement
    }).done(function() {
      callback(response.key);
    });
  }
  

/**
 * Formato de la fecha para que presente unicamente el año
 */
  $("#fechaPeriodo").datepicker({
    format: "yyyy",
    viewMode: "years", 
    minViewMode: "years",
   // maxDate: "+0",
    endDate: new Date()
  });


  
/**
 * Valida si existe un archivo en el input file-cvs, sube el archivo a S3, y guarda el registro en base de datos
 */
$("#btn-save").click(function (e) {
  if( $("#enlaceField").val() != "" && !validURL( $("#enlaceField").val() )){
    alert("El enlace ingresado no es valido");
    return;
  }
  if (document.getElementById('file-cvs').files.length > 0) {
    
    if (fileIsCompatible) {
      
      document.getElementById("loader-overlay-MOD").style.display = "block";
      csvFile = document.getElementById('file-cvs').files[0];
      let params = {
        source_event: 1
      };
      getuploadURL(params, function (result) {
        sendFile(result, csvFile, function (fileKey) {
          let temas = $("#tagsField").val().split(',');
          let params = {
            id: dataSetID,
            categorias: $("#selectCategoria").val(),
            detalle: $("#detallesField").val(),
            codigoDataSet: $("#codigoField").val(),
            fileURL: fileKey,
            fuente: $("#fuenteField").val(),
            idUsuario: loggedUserInfo.id,
            nombre: $("#nombreField").val(),
            nombreUsuario: loggedUserInfo.nombre,
            periodo:$("#fechaPeriodo").val(),
            //publicador: $("#publicadorField").val(),
            comentarioPublicador: $("#comPublicadorField").val(), 
            enlace: $("#enlaceField").val(),
            temas: temas
          };
          console.log("params == " + JSON.stringify(params));
          DAT.editDataSet(params);

        });

      });

    } else {
      alert("Solo se permiten archivos con formato csv");
    }

  } else {
    if (fileIsCompatible) {
      
      document.getElementById("loader-overlay-MOD").style.display = "none";

      let temas = $("#tagsField").val().split(',');
      let params = {
        id: dataSetID,
        categorias: $("#selectCategoria").val(),
        detalle: $("#detallesField").val(),
        codigoDataSet: $("#codigoField").val(),
        fileURL: "none",
        fuente: $("#fuenteField").val(),
        idUsuario: loggedUserInfo.id,
        nombre: $("#nombreField").val(),
        nombreUsuario: loggedUserInfo.nombre,
        periodo:$("#fechaPeriodo").val(),
        comentarioPublicador: $("#comPublicadorField").val(), 
        enlace: $("#enlaceField").val(),
        //publicador: $("#publicadorField").val(),
        
        temas: temas
      };
      console.log("params sin archivo == " + JSON.stringify(params));
      DAT.editDataSet(params);
    } else {
      alert("Solo se permiten archivos con formato csv");
    }
  }

});



/**
 * Valida si se subio un archivo al elemento #file-csv y realiza cambios esteticos
 */ 
$("#file-cvs").change(function () {
  if (document.getElementById('file-cvs').files.length > 0) {
    fileIsCompatible = true;
    $(".finish").removeClass("disabled");
  }
});

/**
 * Valida si elimino un archivo del elemento #file-csv y realiza cambios esteticos
 */
$('#file-cvs').on('dropify.beforeClear', function (event, element) {
  fileIsCompatible = true;
});

/**
 * Valida si hubo un error al subir un archivo en el elemento #file-csv y realiza cambios esteticos
 */
$('#file-cvs').on('dropify.errors', function (event, element) {
  fileIsCompatible = false;
  console.log("fileIsCompatible no");
  $(".finish").addClass("disabled");
});


$("#btn-next").click(function () {
  $(".finish").removeClass("disabled");
});



/**
 * Revisa cuando el wizar cambia de pestaña
 * onNext : Se movio a la siguiente pestaña
 * onPrevious : Retrocedio una pestaña
 * onTabClick : El usuario dio click directamente en el tab de la pestaña
 * 
 * Con exepecion de onTabClick; dentro de cada uno de estos valida que los forms sean validos y se abilitan o deshabilitan opciones en base a eso
 */
$('#rootwizard').bootstrapWizard({
  'tabClass': 'nav nav-pills',
  'onNext': function (tab, navigation, index) {
    var $valid = $("#frm-add").valid();
    if (!$valid) {
      $validator.focusInvalid();
      return false;
    } else {
      //  $('#rootwizard').bootstrapWizard('enable', $('#finish-li').val());
      $(".next").addClass("hidden");
      $(".finish").removeClass("hidden");
      $(".finish").removeClass("disabled");
    }
  },
  'onPrevious': function (tab, navigation, index) {
    $(".next").removeClass("hidden");
    $(".finish").addClass("hidden");
    $(".finish").removeClass("disabled");

  },
  'onLast': function (tab, navigation, index) {
    $(".finish").removeClass("disabled");
  },
  'onTabClick': function (activeTab, navigation, currentIndex, nextIndex) {
    return false;
  }
});

$('body').keyup(function (e) {
  if (e.keyCode == 17) {
    $(".finish").removeClass("disabled");
  }
});


function GetURLParameter(sParam) {
  var searchString = "";
  var sPageURL = window.location.search.substring(1);
  var hPageURL = window.location.hash.substring(1);

  if (sPageURL != "") {
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
      var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      searchString = sParameterName[1];
    }
  } else if (hPageURL != "") {
    searchString = window.location.hash.substring(1);
  }
  return searchString;
}


function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
