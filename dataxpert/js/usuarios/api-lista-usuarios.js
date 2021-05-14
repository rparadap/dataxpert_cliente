/*
Titulo:  api-lista-usuarios.js
Descripción: Realiza los llamados al API de AWS

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 2/03/2021

Otros cambios:
-Documentacion y limpieza
*/

var DAT = window.DAT || {}; 
var apiClient = apigClientFactory.newClient(); //  Instancia del API de AWS



/**
 * @function loadViewProductos carga los data-set al JSgrid
 */
DAT.loadViewProductos = function (currentUserID) {
    useToken(token, function (token) {
        apiClient.usuariosGetAllPost({}, {id:currentUserID}, {
                headers: {
                    Authorization: token
                }
            })
            .then(function (result) {
                if (typeof result.data !== 'undefined' && result.data.length <= 0) {
                    $("#jsgrid").jsGrid({
                        noDataContent: "No se encontraron registros"
                    });
                    $("#jsgrid").jsGrid("option", "data", []);
                    return;
                }
                var client = result.data;
                $("#jsgrid").jsGrid({
                    controller: {
                        loadData: function (filter) {
                            return $.grep(client, function (client) {
                                return (!filter["nombre"].toLowerCase() || client["nombre"].toLowerCase().indexOf(filter["nombre"].toLowerCase()) > -1) &&
                                    (!filter["apellidos"].toLowerCase() || client["apellidos"].toLowerCase().indexOf(filter["apellidos"].toLowerCase()) > -1) &&
                                    (!filter["correo"].toLowerCase() || client["correo"].toLowerCase().indexOf(filter["correo"].toLowerCase()) > -1) &&
                                    (!filter["fechaCreacion"] || client["fechaCreacion"].indexOf(filter["fechaCreacion"]) > -1) &&
                                    (!filter["tipo"].toLowerCase() || client["tipo"].toLowerCase().indexOf(filter["tipo"].toLowerCase()) > -1)
                                    
                            });
                        },
                        onItemUpdating: function (args) {
                            console.log("UPDATE!!");
                            // cancel update of the item with empty 'name' field

                        },
                        updateItem: function (item) {
                        }

                    },

                    noDataContent: "No se encontraron clientes",
                    sorting: true,
                    paging: true,

                    filtering: true,
                    data: client
                });
                $("#jsgrid").jsGrid("loadData");
            });

    });
};




//--------------------------------------------------------------------------------------------------------------------------------------------
//

/**
   * Deshabilita un usuario a la base de datos Dynamo en AWS
   * @param params JSON con informacion del usuario
*/
DAT.eliminarUsuario = function (params) {
    try {
        useToken(token, function (token) {
            apiClient.usuariosDisableItemPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result.data));
                    
                    if (result.status == 200) {
                        $('#loader-overlay-MOD').attr('style', 'display: none !important');
                        DAT.loadViewProductos();
                    } else {
                        alert("Ocurrió un error al eliminar los datos.");
                        return;
                    }
                });


        });

    } catch (e) {

        console.log("error :" + e);
        document.getElementById("loader-overlay").style.display = "none";
        alert("Ocurrió un error con la conexión.");
    }
}

/**
   * @function restablecerContraseña Restablece la contraseña de un usuario Dynamo en AWS
   * @param {JSON} params JSON con informacion del usuario
*/
DAT.restablecerContraseña = function (params,callback) {
    try {
        useToken(token, function (token) {
            apiClient.usuariosRestablecerPasswPost(null, params, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(function (result) {
                    console.log("RESULT = " + JSON.stringify(result.data));
                    
                    if (result.status == 200) {
                        $('#loader-overlay-MOD').attr('style', 'display: none !important');
                        callback(result.data);
                    } else {
                        alert("Ocurrió un error al eliminar los datos.");
                        return;
                    }
                });
        });

    } catch (e) {

        console.log("error :" + e);
        document.getElementById("loader-overlay").style.display = "none";
        alert("Ocurrió un error con la conexión.");
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
