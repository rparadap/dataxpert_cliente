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
 * @function getCategorias trae todas las categorias activas en base de datos
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
 * @function AddDataSet Añade un data-set a la base de datos Dynamo en AWS
 * @param {JSON} params JSON con informacion del data-set
 */
DAT.AddDataSet = function (params) {
  try {
    useToken(token, function (token) {
      apiClient.datasetAddItemPost(null, params, {
          headers: {
            Authorization: token
          }
        })
        .then(function (result) {
          console.log("RESULT = " + JSON.stringify(result));
          if (result.data.hasOwnProperty("errorMessage")) {
            document.getElementById("loader-overlay-MOD").style.display = "none";
            $("#loader-overlay-MOD").removeClass("d-flex");
            return;
          }
          if (result.status == 200) {
            window.location.href = "lista-data-set.html";
            // if (confirm("¿Desea agregar otro dataset?")) {
            //   location.reload();
            // } else {
              //window.location.href = "lista-data-set.html";
            // }

          } else {
            alert("Ocurrió un error al guardar los datos.");
            document.getElementById("loader-overlay-MOD").style.display = "none";
            $("#loader-overlay-MOD").removeClass("d-flex");
            return;
          }
        });


    });

  } catch (e) {

    console.log("error :" + e);
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
 * @function getDownloadURL Gerena un link de descarga para un archivo en S3
 * @param {JSON} params json con key del archivo 
 * @param {function} callback 
 */
function getDownloadURL(params, callback) {
  useToken(token, function (token) {
    apiClient.s3GetSignedDownloadUrlPost(null, params, {
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
 * Utilizando el metodo sort, ordena los elementos del array por nombre
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