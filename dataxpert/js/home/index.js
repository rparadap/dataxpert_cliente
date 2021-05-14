/*
Titulo:  index.js
Descripción: Gestiona funciones para index.html

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 18/01/2021

Otros cambios:
Sin cambios nuevos
*/


/**
   * Ejecuta configuraciones especificas de pagina dependiendo del rol. Esta funcion es llamada en el header de la pagina
   * @param usuario JSON con informacion de usuario
*/
function setPage(usuario) {

    // TIMEOUT HIDE LOADER ANIMATION
    setTimeout(function () {
        $('.loader-wrapper').fadeOut('slow', function () {
            $(this).remove();
        });
    }, 300);

}
