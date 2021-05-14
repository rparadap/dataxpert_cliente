/*
Titulo:  lista-usuarios.js
Descripción: Gestiona funciones para lista-usuarios.html

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 16/02/2021

Otros cambios:
Sin cambios nuevos
*/



/**
   * Ejecuta configuraciones especificas de pagina dependiendo del rol.
   * @param usuario JSON con informacion de usuario
*/

function setPage(usuario) {
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
    DAT.loadViewProductos(usuario.id.S);
    setTimeout(function () {
        $('.loader-wrapper').fadeOut('slow', function () {
            $(this).remove();
        });
    }, 300);
}

/**
 * @function clearModalContraseña limpia el modal que muestra los detalles a la hora de restablecer la contraseña
 */
function clearModalContraseña(){
    $('#lbl-data-correo').empty();
    $('#lbl-data-contra').empty();
}

/**
 * @function clearModal limpia el modal que muestra los detalles del usuario
 */
function clearModal() 
{
    $('#lbl-data-name').empty();
    $('#lbl-data-registro').empty();
    $('#lbl-data-estado').empty();
    $('#lbl-data-tipo').empty();
    $('#lbl-data-mail').empty();
    
}