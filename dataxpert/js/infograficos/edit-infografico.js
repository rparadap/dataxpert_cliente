
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
/*
var seccion = "efb9fb6cdfadab92bc5728f2ae7db1b0"; // # identificador de seccion de pagina
*/
var $validator;
var filePath;
var pdfFile = null;
var availableFile = false;

var loggedUserInfo;
var fileIsCompatible = true;
let infograficoID;

var globalCategorias;
var globalTags = [];

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
          }
        }
      });

    $(".form-temas").first().append(new Option("option text1", "value1"));
  });
  
  
  /**
     * Ejecuta configuraciones especificas de pagina dependiendo del rol.
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
        infograficoID = GetURLParameter("");
        DAT.getInfografico( {id:infograficoID} ,setEdit);
      } else {
        window.location.href = "lista-infograficos.html";
      }

      
  
  }

  function setEdit(infografico)
  {
    setCategorias(globalCategorias);
    globalTags = infografico.temas.SS;
    $("#nombreField").val(infografico.nombre.S);
    $("#detallesField").val(infografico.detalle.S);
    $("#selectCategoria").val(infografico.categoria.S);
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
 * @param {array} tags 
 */
  function loadTags(tags) {
    tags.forEach(tag => {
      $('#tagsField').tagsinput('add', tag);
    });
  }


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
   * Guarda el archivo en S3
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




$("#btn-save").click(function(e)
{
  if(document.getElementById('file-pdf').files.length > 0)
    {
      if(fileIsCompatible){

          let fileParams;

          document.getElementById("loader-overlay-MOD").style.display = "block";
          pdfFile = document.getElementById('file-pdf').files[0];
          
          saveFile(pdfFile,function(params_)
          {
            fileParams = params_;
            let temas = $("#tagsField").val().split(',');
            let params = 
            {
              id:infograficoID,
              categoria:$("#selectCategoria").val(),
              nombre:$("#nombreField").val(),
              detalle:$("#detallesField").val(),
              fileURL: "",
              source_event: fileParams.source_event,
              files:  fileParams.files,
              file_extension: fileParams.file_extension,
              temas: temas
            };
            console.log("params con file== " + JSON.stringify(params));
            DAT.editInfografico(params);
        
          });
        
    
      }else{
        alert("Solo se permiten archivos con formato csv");
      }
      
    }else
    {
        if(fileIsCompatible){
            document.getElementById("loader-overlay-MOD").style.display = "block";
            let temas = $("#tagsField").val().split(',');
            let params = 
            {
              id:infograficoID,
              categoria:$("#selectCategoria").val(),
              nombre:$("#nombreField").val(),
              detalle:$("#detallesField").val(),
              fileURL: "none",
              source_event: "2",
              files:  "none",
              file_extension:"pdf",
              temas: temas
            };
           // console.log("params sin file == " + JSON.stringify(params));
            DAT.editInfografico(params);

        }else{
          alert("Solo se permiten archivos con formato pdf");
        }
    }

});

$( "#file-pdf" ).change(function() {
  if(document.getElementById('file-pdf').files.length > 0)
  {
    fileIsCompatible = true;
    $(".finish").removeClass("disabled");
  }
});

$('#file-pdf').on('dropify.beforeClear', function(event, element) {
  fileIsCompatible = true;
});

$('#file-pdf').on('dropify.errors', function(event, element) {
  fileIsCompatible = false;
  console.log("fileIsCompatible no");
  $(".finish").addClass("disabled");
});


$("#btn-next").click(function(){
  $(".finish").removeClass("disabled");
});


$('body').keyup(function(e){
  if(e.keyCode == 17){
    $(".finish").removeClass("disabled");
  }
});


// $('#rootwizard').bootstrapWizard({
//   'tabClass': 'nav nav-pills',
//   'onNext': function(tab, navigation, index) {
//     var $valid = $("#frm-add").valid();
//     if (!$valid) {
//       $validator.focusInvalid();
//       return false;
//     }else
//     {
//       $(".next").addClass("hidden");
//       $(".finish").removeClass("hidden");
//       $(".finish").addClass("disabled");
//       if(document.getElementById('file-pdf').files.length > 0 && !availableFile){
//         $(".finish").removeClass("disabled");
//       }
//     }
//   },
//   'onPrevious': function(tab, navigation, index) {
//       $(".next").removeClass("hidden");
//       $(".finish").addClass("hidden");
//       console.log("document.getElementById('file-pdf').files.length = " + document.getElementById('file-pdf').files.length);
//       if(document.getElementById('file-pdf').files.length <= 0 || !availableFile){
//         $(".finish").removeClass("disabled");
//       }
      
//   },
//   'onTabClick': function(activeTab, navigation, currentIndex, nextIndex) {
//     return false;
//   }
// });

$('#rootwizard').bootstrapWizard({
  'tabClass': 'nav nav-pills',
  'onNext': function(tab, navigation, index) {
    var $valid = $("#frm-add").valid();
    if (!$valid) {
      $validator.focusInvalid();
      return false;
    }else
    {
    //  $('#rootwizard').bootstrapWizard('enable', $('#finish-li').val());
      $(".next").addClass("hidden");
      $(".finish").removeClass("hidden");
      $(".finish").removeClass("disabled");
    }
  },
  'onPrevious': function(tab, navigation, index) {
      $(".next").removeClass("hidden");
      $(".finish").addClass("hidden");
      $(".finish").removeClass("disabled");
 
  },
    'onLast': function(tab, navigation, index) {
      $(".finish").removeClass("disabled");
  },
  'onTabClick': function(activeTab, navigation, currentIndex, nextIndex) {
    return false;
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



