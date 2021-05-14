/*
Titulo:  js-grid-categoria.js
Descripción: Gestiona funciones del JS-grid perteneciente a lista-categoria.html

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 23/02/2021

Otros cambios:
Sin cambios nuevos
*/

var apiClient = apigClientFactory.newClient(); // Instancia del API de aws

(function ($) {
  "use strict";
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
      editing: true,
      filtering: true,
      deleteConfirm: "¿Seguro que desea eliminar este registro?",
      fields: [
        {
          name: "id",
          title: "ID",
          type: "text",
          width: 100,
          css: "text-truncate text-center",
          editing: false,
        },
        {
          name: "nombre",
          title: "Nombre",
          type: "text",
          width: 250,
          css: "text-truncate text-center",
          editing: true,
        },
        {
          type: "control",

          width: 50,
          itemTemplate: function (value, item) {
            var $result = $([]);

            $result = $result.add(this._createEditButton(item));

            return $result;
          },
        },
        {
          name: "Eliminar",
          title: "Eliminar",
          width: 50,
          sorting: false,
          itemTemplate: function (value, item) {
            let disabled = item.estado == "0" ? "disabled" : "";
            return $("<button>")
              .addClass("btn btn-danger btn-icon " + disabled + " ")
              .append($("<i>").addClass("mdi mdi-delete"))
              .append($("<i>").addClass("fa fa-trash"))
              .on("click", function () {
                if (item.estado == "0") {
                  return false;
                }
                if (
                  confirm("¿Esta seguro que desea eliminar esta categoría?")
                ) {
                  $("#loader-overlay-MOD").attr("style", "display: block");
                  var params = {
                    id: item.id,
                  };
                  DAT.eliminarCategoria(params);
                }
              });
          },
        },
      ],
    });
  });
})(jQuery);
