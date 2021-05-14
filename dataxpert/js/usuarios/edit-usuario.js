
/*
Titulo:  add-data-set.js
Descripción: Gestiona funciones para edit-usuario.html


Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 02/03/2021

Otros cambios:
-Documentacion y limpieza
*/

/**
 * @var $validator objeto jquery para la validacion campos del form
 */
var $validator;

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
          }
        }
      });

  });
  
  
 /**
     * Ejecuta configuraciones especificas de pagina dependiendo del rol. Esta funcion es llamada en el header de la pagina
     * @param {JSON} usuario JSON con informacion de usuario
  */
  function setPage(usuario) { 
    
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
     //DAT.loadViewProductos();
     if (GetURLParameter("") != "") {
        idUser = GetURLParameter("");
        DAT.getUsuario( {id:idUser} ,setEdit);
      } else {
        window.location.href = "lista-infograficos.html";
      }

      
  
  }


/**
     * @function setEdit puebla el form con la informacion del usuario
     * @param {JSON} dbUser JSON con informacion del usuario
  */
  function setEdit(dbUser)
  {
    $("#correoField").val(dbUser.correo);
    $("#nombreField").val(dbUser.nombre);
    $("#apellidosField").val(dbUser.apellidos);
    $("#seleTipo").val(dbUser.tipo);
    $('#seleTipo').trigger('change');
    
      setTimeout(function () {
        $('.loader-wrapper').fadeOut('slow', function () {
            $(this).remove();
        });
    }, 300);
  }




/**
 * realiza una validacion en el form y guarda el registro en base de datos
 */
$("#btn-save").click(function(e)
{
  var $valid = $("#frm-add").valid();
  if ($valid) {

    document.getElementById("loader-overlay-MOD").style.display = "block";
    let params = 
    {
      id:idUser,
      correo:$("#correoField").val(),
      nombre:$("#nombreField").val(),
      apellidos:$("#apellidosField").val(),
      tipo:$("#seleTipo").val()
    };
    DAT.editUser(params);
  }else
  {
    $validator.focusInvalid();
  }
});



/**
 * @function GetURLParameter obtiene el valor del parametro GET en el url
 * @param {string} sParam parametro
 */
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



