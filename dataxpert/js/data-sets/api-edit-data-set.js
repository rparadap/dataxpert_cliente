/*
Titulo:  api-add-data-set.js
Descripción: Realiza los llamados al API de AWS

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.2
Ultima modificacion : 24/02/2021

Otros cambios:
-Las categorias ahora son traidas desde dynamo
*/

var DAT = window.DAT || {};
var apiClient = apigClientFactory.newClient(); //  Instancia del API de AWS


/**
 * @function getCategorias Trae todas las categorias activas en base de datos
 */
async function getCategorias() {
  let obtainedToken = await asyncUseToken(token);
  let result = await apiClient.categoriasGetAllGet(null, {}, {
    headers: {
      Authorization: obtainedToken
    }
  });
  return result.data.sort(compare);
}


/**
 * @function editDataSet Editar un data-set en la base de datos
 * @param {JSON} params JSON con informacion editada del data-set
 */
DAT.editDataSet = function (params) {
  try {
    useToken(token, function (token) {
      apiClient.datasetEditItemPost(null, params, {
          headers: {
            Authorization: token
          }
        })
        .then(function (result) {
          console.log("RESULT = " + JSON.stringify(result));
          if (result.data.hasOwnProperty("errorMessage")) {
            // alert(result.data.errorMessage);
            $("#loader-overlay-MOD").addClass("d-flex");
            document.getElementById("loader-overlay-MOD").style.display = "none";
            $("#loader-overlay-MOD").removeClass("d-flex");
            return
            // location.reload();
          }
          if (result.status == 200) {
            window.location.href = "lista-data-set.html";
          } else {
            $("#loader-overlay-MOD").addClass("d-flex");
            document.getElementById("loader-overlay-MOD").style.display = "none";
            $("#loader-overlay-MOD").removeClass("d-flex");
            alert("Ocurrió un error al guardar los datos.");
            return;
          }
        });


    });

  } catch (e) {

    console.log("error :" + e);
    $("#loader-overlay-MOD").addClass("d-flex");
    document.getElementById("loader-overlay-MOD").style.display = "none";
    $("#loader-overlay-MOD").removeClass("d-flex");
    alert("Ocurrió un error con la conexión.")

  }

}

/**
 * @function getuploadURL Obtiene un link de subida para S3 generado en lambda
 * @param {JSON} params JSON indicando con la locacion en S3 en la que se desea generar el link
 * @param {functin} callback 
 */
function getuploadURL(params, callback) {
  useToken(token, function (token) {
    apiClient.s3GetSignedUploadUrlPost(null, params, {
        headers: {
          Authorization: token
        }
      })
      .then(function (result) {
        if (result.status == 200) {
          console.log("Result = " + JSON.stringify(result));
          callback(result.data);
          ///return result.data;
        } else {
          callback("error");
        }
      });

  });

}


/**
 * @function getFileURL Obtiene un link de subida para S3 generado en lambda (otro api)
 * @param {JSON} params JSON indicando con la locacion en S3 en la que se desea generar el link 
 * @param {function} callback 
 */
function getFileURL(params, callback) {
  useToken(token, function (token) {
    apiClient.s3SignedUrlPost(null, params, {
        headers: {
          Authorization: token
        }
      })
      .then(function (result) {
        if (result.status == 200) {
          console.log("Result = " + JSON.stringify(result));
          callback(result.data);
          ///return result.data;
        } else {
          callback("error");
        }
      });

  });


}



/**
 * @function getDataSet Trae un data set desde la base de datos Dynamo en AWS
 * @param params JSON con informacion del data-set
 */
DAT.getDataSet = function (params, callback) {
  try {
    useToken(token, function (token) {
      apiClient.datasetGetItemPost(null, params, {
          headers: {
            Authorization: token
          }
        })
        .then(function (result) {

          if (result.data.hasOwnProperty("errorMessage")) {
            // alert("Error: " + result.data.errorMessage);
            $("#loader-overlay-MOD").addClass("d-flex");
            document.getElementById("loader-overlay-MOD").style.display = "none";
            $("#loader-overlay-MOD").removeClass("d-flex");
            window.location.href = "lista-data-set.html";
            return
            // location.reload();
          }
          console.log("res = " + JSON.stringify(result));
          if (result.status == 200) {
            callback(result.data.Items[0]);
          } else {
            $("#loader-overlay-MOD").addClass("d-flex");
            document.getElementById("loader-overlay-MOD").style.display = "none";
            $("#loader-overlay-MOD").removeClass("d-flex");
            alert("Ocurrió un error al guardar los datos.");
            return;
          }
        });


    });

  } catch (e) {

    console.log("error :" + e);
    $("#loader-overlay-MOD").addClass("d-flex");
    document.getElementById("loader-overlay-MOD").style.display = "none";
    $("#loader-overlay-MOD").removeClass("d-flex");
    alert("Ocurrió un error con la conexión.")

  }

}




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