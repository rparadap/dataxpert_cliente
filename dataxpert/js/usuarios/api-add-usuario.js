/*
Titulo:  api-add-usuario.js
Descripción: Realiza los llamados al API de AWS

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 02/03/2021

Otros cambios:
-Documentacion y limpieza
*/

var DAT = window.DAT || {};
var apiClient = apigClientFactory.newClient(); //  Instancia del API de AWS

/**
 * @function AddUser Añade un usuario a la base de datos Dynamo en AWS
 * @param params JSON con informacion del cliente
 */
DAT.AddUser = function (params) {
  try {
    useToken(token, function (token) {
      apiClient
        .usuariosAddItemPost(null, params, {
          headers: {
            Authorization: token,
          },
        })
        .then(function (result) {
          console.log("RESULT = " + JSON.stringify(result));
          if (result.data.hasOwnProperty("errorMessage")) {
            alert(result.data.errorMessage);
            document.getElementById("loader-overlay-MOD").style.display =
              "none";
            return;
            // location.reload();
          }
          if (result.status == 200) {
            if (confirm("¿Desea agregar otro usuario?")) {
              location.reload();
            } else {
              window.location.href = "lista-usuarios.html";
            }

            // window.location.href = "view-fichatecnica.html"
          } else {
            document.getElementById("loader-overlay-MOD").style.display =
              "none";
            alert("Ocurrió un error al guardar los datos.");
            //  document.getElementById("loader-overlay-MOD").style.display = "none";
            return;
          }
        });
    });
  } catch (e) {
    console.log("error :" + e);
    document.getElementById("loader-overlay-MOD").style.display = "none";
    alert("Ocurrió un error con la conexión.");
  }
};

/**
 * @function compare Utilizando el metodo sort, ordena los elementos del array por nombre
 * @param a primer elemento
 * @param b segundo elemento
 * @return array ordenado por nombre.
 */
function compare(a, b) {
  let comparison = 0;
  if (a.nombre > b.nombre) {
    comparison = 1;
  } else if (a.nombre < b.nombre) {
    comparison = -1;
  }
  return comparison;
}
