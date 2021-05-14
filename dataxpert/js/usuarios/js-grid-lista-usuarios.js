/*
Titulo:  js-grid-usuarios.js
Descripción: Gestiona funciones del JS-grid perteneciente a lista-usuarios.html

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 16/02/2021

Otros cambios:
Sin cambios nuevos
*/

var apiClient = apigClientFactory.newClient(); // Instancia del API de aws

var estado = [
  {
    Name: "Activo",
    Id: "1",
  },
  {
    Name: "Inactivo",
    Id: "0",
  },
];

var tipo = [
  {
    Name: "Administrador",
    Id: "0",
  },
  {
    Name: "Usuario",
    Id: "1",
  },
];

tipo.unshift({
  id: "",
  name: "",
});

estado.unshift({
  id: "",
  name: "",
});

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
      editing: false,
      filtering: true,
      deleteConfirm: "¿Seguro que desea eliminar este registro?",
      /**
       * Definicion de propiedades de JS-grid
       */
      fields: [
        {
          name: "nombre",
          title: "Nombre",
          type: "text",
          width: 100,
          css: "text-truncate text-center",
          editing: false,
        },
        {
          name: "apellidos",
          title: "Apellidos",
          type: "text",
          width: 100,
          css: "text-truncate text-center",
          editing: false,
        },
        {
          name: "correo",
          title: "Correo",
          type: "text",
          width: 120,
          css: "text-truncate text-center",
          editing: false,
        },
        {
          name: "tipo",
          title: "Tipo",
          type: "select",
          width: 100,
          css: "text-truncate text-center",
          editing: false,
          items: tipo,
          valueField: "Id",
          textField: "Name",
          validate: "required",
        },
        {
          name: "fechaCreacion",
          title: "Fecha de Registro",
          type: "date",
          width: 100,
          css: "text-truncate text-center",
          validate: "required",
          editing: false,
        },
        {
          name: "Editar",
          title: "Editar",
          width: 50,
          css: "text-truncate text-center",
          sorting: false,
          itemTemplate: function (value, item) {
            return $("<button>")
              .addClass("btn btn-primary btn-icon")
              .append($("<i>").addClass("fa fa-edit"))
              .on("click", function () {
                window.location.href =
                  "../usuarios/edit-usuario.html#" + item.id; // Redireccion al Wizard para edicion
              });
          },
        },
        {
          name: "Restablecer",
          title: "Restablecer",
          width: 50,
          css: "text-truncate text-center",
          sorting: false,
          itemTemplate: function (value, item) {
            // Restablecimiento de contraseña
            return $("<button>")
              .addClass("btn btn-info btn-icon")
              .append($("<i>").addClass("fa fa-key"))
              .on("click", function () {
                $("#loader-overlay-MOD").attr("style", "display: block");
                DAT.restablecerContraseña({ id: item.id }, function (result) {
                  console.log("resp = " + JSON.stringify(result));
                  clearModalContraseña();
                  $("#modalRestablecimiento").modal("show");
                  $("#lbl-data-correo").html(item.correo);
                  $("#lbl-data-contra").html(result.password_temp);
                  $("#loader-overlay-MOD").attr(
                    "style",
                    "display: none !important"
                  );
                });
              });
          },
        },
        {
          name: "Ver",
          title: "Ver",
          width: 50,
          css: "text-truncate text-center",
          sorting: false,
          itemTemplate: function (value, item) {
            // Detalles de usuario
            return $("<button>")
              .addClass("btn btn-info btn-icon")
              .append($("<i>").addClass("fa fa-eye"))
              .on("click", function () {
                clearModal();
                let estado = item.estado == "1" ? "Activo" : "Inactivo";
                let tipo = item.tipo == "0" ? "Administrador" : "Usuario";
                $("#modalInfo").modal("show");
                $("#lbl-data-name").html(item.nombre);
                $("#lbl-data-apellidos").html(item.apellidos);
                $("#lbl-data-estado").html(estado);
                $("#lbl-data-registro").html(item.fechaCreacion);
                $("#lbl-data-tipo").html(tipo);
                $("#lbl-data-mail").html(item.correo);
              });
          },
        },
        {
          name: "Eliminar",
          title: "Eliminar",
          width: 60,
          sorting: false,
          itemTemplate: function (value, item) {
            // deshabilitación de usuario
            let disabled = item.estado == "0" ? "disabled" : "";
            return $("<button>")
              .addClass("btn btn-danger btn-icon " + disabled + " ")
              .append($("<i>").addClass("mdi mdi-delete"))
              .append($("<i>").addClass("fa fa-ban"))
              .on("click", function () {
                if (item.estado == "0") {
                  return false;
                }
                if (confirm("¿Seguro que desea eliminar este usuario?")) {
                  $("#loader-overlay-MOD").attr("style", "display: block");
                  var params = {
                    id: item.id,
                  };
                  DAT.eliminarUsuario(params);
                }
              });
          },
        },
      ],
    });
  });
})(jQuery);
