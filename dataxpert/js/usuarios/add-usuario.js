
/*
Titulo:  add-usuario.js
Descripción: Gestiona funciones para add-usuario.html


Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 2/3/2021

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
          apellidosField: {
            required: true,
            minlength: 1
          },
          correoField: {
            required: true,
            minlength: 1
          }
        }
      });

    $(".form-temas").first().append(new Option("option text1", "value1"));
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
      setTimeout(function () {
          $('.loader-wrapper').fadeOut('slow', function () {
              $(this).remove();
          });
      }, 300);
  
  }



/**
 * Reliza una validacion en el form y si resulta @true realiza el llamado al api para registrar al usuario
 */
$("#btn-save").click(function(e)
{
  var $valid = $("#frm-add").valid();
  if ($valid) {

    document.getElementById("loader-overlay-MOD").style.display = "block";
    let params = 
    {
      correo:$("#correoField").val(),
      nombre:$("#nombreField").val(),
      apellidos:$("#apellidosField").val(),
      tipo:$("#seleTipo").val(),
      urlFoto:"../../assets/img/profiles/bb.jpg"
    };
    DAT.AddUser(params);
  }else
  {
    $validator.focusInvalid();
  }
});

