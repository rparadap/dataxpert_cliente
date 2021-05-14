
/*
Titulo:  add-data-set.js
Descripción: Gestiona funciones para add-data-set.html


Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 24/02/2021

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
 * @var {bool} avalibleFile se utiliza para confirmar la existencia de un archivo en el input "#file-csv"
 */
var avalibleFile = false;

/**
 * @var {JSON} loggedUserInfo informacion del usuario en la sesion actual 
 */
var loggedUserInfo;

/**
 * Se definen @$validator con la reglas del form
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
          detallesField: {
            required: true,
            minlength: 1
          },
          codigoField: {
            required: true,
            minlength: 1
          },
          tagsField: {
            required: true,
            minlength: 1
          },
          fechaPeriodo:{
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

/**
 * Formato de la fecha para que presente unicamente el año
 */
    $("#fechaPeriodo").datepicker({
      format: "yyyy",
      viewMode: "years", 
      minViewMode: "years",
      endDate: new Date()
    });
$("#datepicker").datepicker();
      let categorias = await getCategorias();
      setCategorias(categorias);
      setTimeout(function () {
          $('.loader-wrapper').fadeOut('slow', function () {
              $(this).remove();
          });
      }, 300);
  
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
 * @function sendFile sube el archivo al bucket en S3
 * @param {JSON} response json con url de bucket
 * @param {file} fileElement archivo RAW desde el input
 * @param {function} callback 
 */
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
 * Valida si existe un archivo en el input file-cvs, sube el archivo a S3, y guarda el registro en base de datos
 */
$("#btn-save").click(function()
{
   
    if( $("#enlaceField").val() != "" && !validURL( $("#enlaceField").val() )){
      alert("El enlace ingresado no es valido");
      return;
    }

    if(document.getElementById('file-cvs').files.length > 0)
    {
      document.getElementById("loader-overlay-MOD").style.display = "block";   
      $("#loader-overlay-MOD").addClass("d-flex");   
      csvFile = document.getElementById('file-cvs').files[0];
      let params = {
        source_event: 1
      };
     
      getuploadURL(params,function(result)
      {
        sendFile(result,csvFile,function(fileKey)
        {
              
              let temas = $("#tagsField").val().split(',');
              let params = 
              {
                categorias:$("#selectCategoria").val(),
                detalle:$("#detallesField").val(),
                codigoDataSet:$("#codigoField").val(),
                fileURL: fileKey,
                fuente:$("#fuenteField").val(),
                idUsuario:loggedUserInfo.id,
                nombre:$("#nombreField").val(),
                nombreUsuario:loggedUserInfo.nombre,
               // publicador:$("#publicadorField").val(),
                comentarioPublicador: $("#comPublicadorField").val(), 
                enlace: $("#enlaceField").val(),
                periodo:$("#fechaPeriodo").val(),
                temas:temas
              };
              console.log("params == " + JSON.stringify(params));
              DAT.AddDataSet(params);
          
        });
      });

    }else
    {
      alert("Debe de subir un archivo antes de continuar");
    }

});

/**
 * Valida si se subio un archivo al elemento #file-csv y realiza cambios esteticos
 */
$( "#file-cvs" ).change(function() {
  if(document.getElementById('file-cvs').files.length > 0)
  {
    avalibleFile = true;
    $(".finish").removeClass("disabled");
  }
});

/**
 * Valida si elimino un archivo del elemento #file-csv y realiza cambios esteticos
 */
$('#file-cvs').on('dropify.beforeClear', function(event, element) {
  avalibleFile = false;
  $(".finish").addClass("disabled");
});

/**
 * Valida si hubo un error al subir un archivo en el elemento #file-csv y realiza cambios esteticos
 */
$('#file-cvs').on('dropify.errors', function(event, element) {
  avalibleFile = false;
  $(".finish").addClass("disabled");
});

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
 * Revisa cuando el wizard cambia de pestaña
 * onNext : Se movio a la siguiente pestaña
 * onPrevious : Retrocedio una pestaña
 * onTabClick : El usuario dio click directamente en el tab de la pestaña
 * 
 * Con exepecion de onTabClick; dentro de cada uno de estos valida que los forms sean validos y se abilitan o deshabilitan opciones en base a eso
 */
$('#rootwizard').bootstrapWizard({
  'tabClass': 'nav nav-pills',
  'onNext': function(tab, navigation, index) {
    var $valid = $("#frm-add").valid();
    if (!$valid) {
      $validator.focusInvalid();
      return false;
    }else
    {
      $(".next").addClass("hidden");
      $(".finish").removeClass("hidden");
      $(".finish").addClass("disabled");
      if(document.getElementById('file-cvs').files.length > 0 && !avalibleFile){
        $(".finish").removeClass("disabled");
      }
    }
  },
  'onPrevious': function(tab, navigation, index) {
      $(".next").removeClass("hidden");
      $(".finish").addClass("hidden");
      console.log("document.getElementById('file-cvs').files.length = " + document.getElementById('file-cvs').files.length);
      if(document.getElementById('file-cvs').files.length <= 0 || !avalibleFile){
        $(".finish").removeClass("disabled");
      }
      
  },
  'onTabClick': function(activeTab, navigation, currentIndex, nextIndex) {
    return false;
  }
});


function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

