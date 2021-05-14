/*
Titulo:  js-grid-lista-data-set.js
Descripción: Gestiona funciones del JS-grid perteneciente a lista-data-set.html

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 10/01/2021

Otros cambios:
Sin cambios nuevos
*/

var apiClient = apigClientFactory.newClient(); // Instancia del API de aws

var estado = [{
        Name: "Activo",
        Id: "1"
    },
    {
        Name: "Inactivo",
        Id: "0"
    }
];
estado.unshift({
    id: "",
    name: ""
});

(function ($) {
    'use strict';
    $("#sort").click(function () {
        var field = $("#sortingField").val();
        $("#sorting-table").jsGrid("sort", field);
    });

    $(function () {
        $("#jsgrid").jsGrid({
            width: "100%",
            autoload: true,
            pageIndex: 1,
            pageSize: 30,
            pageButtonCount: 15,
            pagerFormat: "{prev} {pages} {next} ",
            paging: true,
            noDataContent: "Cargando...",
            pagePrevText: "<",
            pageNextText: ">",
            sorting: true,
            editing: false,
            filtering: true,
            deleteConfirm: "¿Seguro que desea eliminar este registro?",
            fields: [{
                    name: "nombre",
                    title: "Nombre",
                    type: "text",
                    width: 200,
                    css: "text-truncate text-center",
                    editing: false
                },
                {
                    name: "detalle",
                    title: "Detalle",
                    type: "text",
                    width: 200,
                    css: "text-truncate text-center",
                    editing: false
                },
                {
                    name: "categoria",
                    title: "Categoría",
                    type: "text",
                    width: 100,
                    css: "text-truncate text-center",
                    editing: false
                },
                {
                    name: "fechaCreacion",
                    title: "Creación",
                    type: "date",
                    width: 100,
                    css: "text-truncate text-center",
                    validate: "required",
                    editing: false
                },
                {
                    name: "fechaActualizacion",
                    title: "Actualización",
                    type: "date",
                    width: 100,
                    css: "text-truncate text-center",
                    validate: "required",
                    editing: false
                },
                {
                    name: "Editar",
                    title: "Editar",
                    width: 60,
                    css: "text-truncate text-center",
                    sorting: false,
                    itemTemplate: function (value, item) {
                        return $("<button>").addClass("btn btn-primary btn-icon")
                            .append(
                                $("<i>").addClass("fa fa-edit")
                            )
                            .on("click", function () {
                                window.location.href = ("../infograficos/edit-infografico.html#" + item.id);
                            });
                    }
                },
                {
                    name: "Ver",
                    title: "Ver",
                    width: 60,
                    css: "text-truncate text-center",
                    sorting: false,
                    itemTemplate: function (value, item) {
                        return $("<button>").addClass("btn btn-info btn-icon")
                            .append(
                                $("<i>").addClass("fa fa-eye")
                            )
                            .on("click", function () {
                                let html_theme= [];
                                clearModal();
                                $('#modalInfo').modal('show');
                                $('#lbl-data-name').html(item.nombre);
                                $('#lbl-data-detalle').html(item.detalle);
                                $('#lbl-data-creacion').html(item.fechaCreacion);
                                $('#lbl-data-actualizacion').html(item.fechaActualizacion);
                                $("#donwload-btn").attr("href", item.fileURL);
                                $("#donwload-btn").attr("download", item.nombre);

                                $('#category-listed').append('<a class="btn btn-tag">' + item.categoria + '</a>');

                                item.temas.forEach(theme => {
                                    html_theme.push('<a class="btn btn-tag">'+theme+'</a>');
                                });
                            
                                $('#themes-listed').append(html_theme.join(''));

                            });
                    }
                },
                {
                    name: "Eliminar",
                    title: "Eliminar",
                    width: 60,
                    sorting: false,
                    itemTemplate: function (value, item) {
                        let disabled = item.estado == "0" ? "disabled" : "";
                        return $("<button>").addClass("btn btn-danger btn-icon " + disabled + " ").append(
                                $("<i>").addClass("mdi mdi-delete")
                            )
                            .append(
                                $("<i>").addClass("fa fa-trash")
                            )
                            .on("click", function () {
                                if (item.estado == "0") {
                                    return false;
                                }
                                if (confirm("¿Esta seguro que desea eliminar este infografico?")) {
                                    $('#loader-overlay-MOD').attr('style', 'display: block');
                                    var params = {
                                        id: item.id
                                    };
                                    DAT.desactivarInfografico(params).promise();
                                }
                            });
                    }
                }

            ]
        });
    });

})(jQuery);

function clearModal() {
    $('#lbl-data-name').empty();
    $('#lbl-data-detalle').empty();
    $('#lbl-data-username').empty();
    $('#lbl-data-creacion').empty();
    $('#lbl-data-publicador').empty();
    $('#lbl-data-actualizacion').empty();
    $('#lbl-data-fuente').empty();

    $('#category-listed').empty();
    $('#themes-listed').empty();

    $('#category-listed').append('<label class="fade">Categoria</label>');
    $('#themes-listed').append('<label class="fade">Temas</label>');

}