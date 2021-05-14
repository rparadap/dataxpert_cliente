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


(function ($) {
    'use strict';
    $("#sort").click(function () {
        var field = $("#sortingField").val();
        $("#sorting-table").jsGrid("sort", field);
    });

    $(function () {
        /**
         * Definicion de propiedades de JS-grid
         */
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
            /**Definicion de columnas */
            fields: [{
                    name: "codigoDataSet",
                    title: "Código",
                    type: "text",
                    width: 100,
                    css: "text-truncate text-center",
                    editing: false
                },
                {
                    name: "nombre",
                    title: "Nombre",
                    type: "text",
                    width: 150,
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
                // {
                //     name: "publicador",
                //     title: "Publicador",
                //     type: "text",
                //     width: 100,
                //     css: "text-truncate text-center",
                //     validate: "required"
                // },
                {
                    name: "fechaCreacion",
                    title: "Creación",
                    type: "text",
                    width: 100,
                    css: "text-truncate text-center",
                    validate: "required"
                },
                {
                    name: "Editar",
                    title: "Editar",
                    width: 50,
                    css: "text-truncate text-center",
                    sorting: false,
                    itemTemplate: function (value, item) {
                        return $("<button>").addClass("btn btn-primary btn-icon")
                            .append(
                                $("<i>").addClass("fa fa-edit")
                            )
                            .on("click", function () { // Redireccion al Wizard para edicion
                                window.location.href = ("../data-sets/edit-data-set.html#" + item.id);
                            });
                    }
                },
                {
                    name: "Ver",
                    title: "Ver",
                    width: 50,
                    css: "text-truncate text-center",
                    sorting: false,
                    itemTemplate: function (value, item) {
                        return $("<button>").addClass("btn btn-info btn-icon")
                            .append(
                                $("<i>").addClass("fa fa-eye")
                            )
                            .on("click", function () { // Detalles de data-set
                                viewDetails(item);                    
                            });
                    }
                },
                {
                    name: "Eliminar",
                    title: "Eliminar",
                    width: 50,
                    sorting: false,
                    itemTemplate: function (value, item) {
                        return $("<button>").addClass("btn btn-danger btn-icon").append(
                                $("<i>").addClass("mdi mdi-trash")
                            )
                            .append(
                                $("<i>").addClass("fa fa-trash")
                            )
                            .on("click", function () {// Eliminacion de data-set

                                if (confirm("¿Esta seguro que desea eliminar este dataset?")) {
                                    $('#loader-overlay-MOD').attr('style', 'display: block');
                                    var params = {
                                        id: item.id
                                    };
                                    DAT.deshabilitaritemDataSets(params);
                                }


                            });
                    }
                }

            ]
        });
    });

})(jQuery);