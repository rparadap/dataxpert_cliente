/*
Titulo:  lista-infograficos.js
Descripción: Gestiona funciones para lista-infograficos.html


Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 08/02/2021

Otros cambios:
Sin cambios nuevos
*/



/**
   * Ejecuta configuraciones especificas de pagina dependiendo del rol.Esta funcion es llamada en el header de la pagina
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
    DAT.loadViewProductos();
    setTimeout(function () {
        $('.loader-wrapper').fadeOut('slow', function () {
            $(this).remove();
        });
    }, 300);
}
