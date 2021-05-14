/*
Titulo:  api-add-infografico.js
Descripción: Realiza los llamados al API de AWS

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 02/02/2021

Otros cambios:
Sin cambios nuevos
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
 * @function AddInfografico Añade un infografico a la base de datos Dynamo en AWS
 * @param {JSON} params JSON con informacion del infografico
 */
DAT.AddInfografico = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.infograficosAddItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result));
                    if (result.data.hasOwnProperty("errorMessage")) {
                        document.getElementById("loader-overlay-MOD").style.display = "none";
                        return;
                    }
                    if (result.status == 200) {
                        window.location.href = "lista-infografico.html";
                        // if (confirm("¿Desea agregar otro Infografico?")) {
                        //     location.reload();
                        // } else {
                        //     window.location.href = "lista-infografico.html";
                        // }

                    } else {
                        document.getElementById("loader-overlay-MOD").style.display = "none";
                        alert("Ocurrió un error al guardar los datos.");
                        return;
                    }
                });


        });

    } catch (e) {

        console.log("error :" + e);
        document.getElementById("loader-overlay-MOD").style.display = "none";
        alert("Ocurrió un error con la conexión.")

    }

}

/**
   * Añade un archivo al Bucket S3
   * @param {JSON} params El archivo
   *  {
   *  source_event: source,
      files: base64,
      file_extension: extension_archivo
      }   
   * @param {function} callback 
*/
function uploadFile(params, callback) {
    useToken(token, function (token) {

        apiClient.datasetAddFilePost(null, params, {
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

//--------------------------------------------------------------------------------------------------------------------------------------------
//






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