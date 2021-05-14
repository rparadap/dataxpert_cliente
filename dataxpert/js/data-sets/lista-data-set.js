/*
Titulo:  lista-data-set.js
Descripción: Gestiona funciones para lista-data-set.html

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 16/02/2021

Otros cambios:
Sin cambios nuevos
*/

/**
   * Ejecuta configuraciones especificas de pagina dependiendo del rol. Esta funcion es llamada en el header de la pagina
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
// Remueve el loader de carga de pagina
    DAT.loadViewProductos();
    setTimeout(function () {
        $('.loader-wrapper').fadeOut('slow', function () {
            $(this).remove();
        });
    }, 300);
}

/***
 * @function viewDetails Imprime la informacion de un data set en el modal de visualizacion
 * @param {JSON} item : Informacion de data-set
 */
function viewDetails(item)
{
    let enlace = item.enlace != ""?item.enlace:"Sin enlace";
    let comentario = item.comentarioPublicador != ""?item.comentarioPublicador:"Sin comentario";
    
    clearModal();
    $('#modalInfo').modal('show');
    $('#lbl-data-name').html(item.nombre);
    $('#lbl-data-detalle').html(item.detalle);
    $('#lbl-data-username').html(item.nombreUsuario);
    $('#lbl-data-creacion').html(item.fechaCreacion);
   // $('#lbl-data-publicador').html(item.publicador);
    $('#lbl-data-actualizacion').html(item.fechaActualizacion);
    $('#lbl-data-codigo').html(item.codigoDataSet);
    $('#lbl-data-fuente').html(item.fuente);
    $('#lbl-data-periodo').html(item.periodo);
    $("#donwload-btn").attr("href", item.fileURL);
    $("#donwload-btn").attr("download", item.nombre);
    $("#downloadInp").val(item.fileURL);
    $('#lbl-comentario').html(comentario);
    $('#lbl-data-enlace').html(enlace);

    
    
    

    let html_cat= [];
    let html_theme= [];

    item.categorias.forEach(cat => {
        html_cat.push('<a class="btn btn-tag">'+cat+'</a>');
        
    });
    item.temas.forEach(theme => {
        html_theme.push('<a class="btn btn-tag">'+theme+'</a>');
    });

    $('#category-listed').append(html_cat.join(''));
    $('#themes-listed').append(html_theme.join(''));
}


/**
 * @function clearModal :Reinicia todos los inputs del modal de visualización
 */
function clearModal()
{
    $('#lbl-data-name').empty();
    $('#lbl-data-detalle').empty();
    $('#lbl-data-username').empty();
    $('#lbl-data-creacion').empty();
    //$('#lbl-data-publicador').empty();
    $('#lbl-data-actualizacion').empty();
    $('#lbl-data-fuente').empty();

    $('#lbl-comentario').empty();
    $('#lbl-data-enlace').empty();

    $('#category-listed').empty();
    $('#themes-listed').empty();

    $('#category-listed').append('<label class="fade">Categoria</label>');
    $('#themes-listed').append('<label class="fade">Temas</label>');
    
}
