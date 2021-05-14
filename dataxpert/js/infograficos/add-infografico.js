
/*
Titulo:  add-infografico.js
Descripción: Gestiona funciones para add-infografico.html


Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 10/01/2021

Otros cambios:
-Sin cambios nuevos
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
var availableFile = false;


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
          detallesField: {
            required: true,
            minlength: 1
          },
          tagsField: {
            required: true,
            minlength: 1
          },
        }
      });

  });
  
  
  /**
     * Ejecuta configuraciones especificas de pagina dependiendo del rol.Esta funcion es llamada en el header de la pagina
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
   * @function saveFile Guarda el archivo en S3 y provee su url
   * @param fileElement archivo
*/
function saveFile(fileElement,callback) {
  
  const file = fileElement;
  var extension_archivo = file.name.split('.');

  extension_archivo = extension_archivo[extension_archivo.length - 1];
  // PDF to Base64

  // Select the very first file from list
  var fileToLoad = file;
  // FileReader function for read the file.
  var fileReader = new FileReader();
  var base64;
  var source = "2";
  
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



/**
 * Valida si existe un archivo en el input file-pdf, sube el archivo a S3, y guarda el registro en base de datos
 */
$("#btn-save").click(function(e)
{
    let fileParams;
    if(document.getElementById('file-pdf').files.length > 0)
    {
      document.getElementById("loader-overlay-MOD").style.display = "block";
      csvFile = document.getElementById('file-pdf').files[0];
      saveFile(csvFile,function(params_)
      {
        fileParams = params_;
        let temas = $("#tagsField").val().split(',');
        let params = 
        {
          categoria:$("#selectCategoria").val(),
          nombre:$("#nombreField").val(),
          detalle:$("#detallesField").val(),
          fileURL: "",
          temas:temas, 
          source_event: fileParams.source_event,
          files:  fileParams.files,
          file_extension: fileParams.file_extension
          
        };
        console.log("params == " + JSON.stringify(params));
        DAT.AddInfografico(params);
    
      });
    }else
    {
      alert("Debe de subir un archivo antes de continuar");
    }

});


/**
 * Valida si se subio un archivo al elemento #file-csv y realiza cambios esteticos
 */
$( "#file-pdf" ).change(function() {
  if(document.getElementById('file-pdf').files.length > 0)
  {
    availableFile = true;
    $(".finish").removeClass("disabled");
  }
});


/**
 * Valida si elimino un archivo del elemento #file-pdf y realiza cambios esteticos
 */
$('#file-pdf').on('dropify.beforeClear', function(event, element) {
  availableFile = false;
  $(".finish").addClass("disabled");
});


/**
 * Valida si hubo un error al subir un archivo en el elemento #file-pdf y realiza cambios esteticos
 */
$('#file-pdf').on('dropify.errors', function(event, element) {
  availableFile = false;
  $(".finish").addClass("disabled");
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
      if(document.getElementById('file-pdf').files.length > 0 && !availableFile){
        $(".finish").removeClass("disabled");
      }
    }
  },
  'onPrevious': function(tab, navigation, index) {
      $(".next").removeClass("hidden");
      $(".finish").addClass("hidden");
      console.log("document.getElementById('file-pdf').files.length = " + document.getElementById('file-pdf').files.length);
      if(document.getElementById('file-pdf').files.length <= 0 || !availableFile){
        $(".finish").removeClass("disabled");
      }
      
  },
  'onTabClick': function(activeTab, navigation, currentIndex, nextIndex) {
    return false;
  }
});

