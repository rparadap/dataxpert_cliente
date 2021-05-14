/*
Titulo:  log-in.js
Descripción: Gestiona funciones para log-in.html

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 10/01/2021

Otros cambios:
Sin cambios nuevos
*/

var ChatApp = window.ChatApp || {};
var apiClient = apigClientFactory.newClient();  // Instancia del API de aws

/**
 * @var CognitoGlobal referencia global a la instancia del API de cognito
 */
var CognitoGlobal; 

/**
 * @var userNameGlobal acceso global al nombre del usu
 */
var userNameGlobal;

/**
 * @var colaborador_codigo acceso global al ID del usuario
 */
var colaborador_codigo;

/**
 * @var sessionUserAttributesGlobal acceso global a los atributos de sesion
 */
var sessionUserAttributesGlobal;


/**
 * @var newPassObject objeto cognito conteniendo la contraseña del usuario
 */
var newPassObject;


var indexDir =  "../home/index.html"; 
var loginDir = "../login/log-in.html";

var userneameInputID =  "#username"; 
var passwordInputID = "#password";

(function scopeWrapper($) {
    /**
     * @var userPool instancia al pool de usuarios
     */
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    /**
     * @function checkLogin Confirma si el usuario ya inicio sesion
     * @param redirectOnRec usuario reconocido , se redirecionara al index.html
     * @param redirectOnUnrec usuario no reconocido , se redirecionara al login.html
     */
    ChatApp.checkLogin = function (redirectOnRec, redirectOnUnrec) {
    //    document.getElementById("loader-overlay").style.display = "block";
    
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser !== null) {
            if (redirectOnRec) {
                window.location = indexDir;
            }
        } else {
            if (redirectOnUnrec) {
               // document.getElementById("loader-overlay").style.display = "none";
                window.location = loginDir;
            }
        }
       // document.getElementById("loader-overlay").style.display = "none";
    };

    /**
     * @function loadGetUser Busca por el la existencia del usuario dentro de base de datos
     * @param userID Id de usuario
     */
    function loadGetUser(userID, callback) {
        useToken(token, function (token) {

            apiClient.userUsuarioListaGet({}, null, { headers: { Authorization: token } })
                .then(function (result) {
                    console.log("succes load user");
                    if (typeof result.data.Items !== 'undefined' && result.data.Items.length <= 0) {
                        console.log("No se encontraron usuarios");
                        return "No se encontraron usuarios";
                    }
                    var usuarios = result.data;
                    usuarios.forEach(function (user) {
                        if (user.estado.toString() == "1" && user.id.toString() == userID) {
                            callback(user);
                        }

                    });

                });

        });

    }

    /**
     * @function login Realiza log-in con los elementos que contienen @userneameInputID y @passwordInputID . 
     * Tambien reliza verificaciones si; el usuario no esta verificado, el correo o contraseña es incorrecta o la cantida de intentos se exedio
     */
    ChatApp.login = function () {
     //   document.getElementById("loader-overlay").style.display = "block";
        var username = $(userneameInputID).val();
        var authenticationData = {
            Username: username,
            Password: $(passwordInputID).val()
        };

        if (!username && !$(passwordInputID).val()) {
            alert("Complete la información.");
           // document.getElementById("loader-overlay").style.display = "none";
            return;

        }

        userNameGlobal = username;

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var userData = {
            Username: username,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        CognitoGlobal = cognitoUser;
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (data) {
                if (data.accessToken.payload.username) {
                    colaborador_codigo = data.accessToken.payload.username;
                    window.location = indexDir
                    //gerUserInfo(data.accessToken.payload.username);
                    //ChatApp.logout();
            
                }
                else {

                    var cognitoUser = userPool.getCurrentUser();
                    cognitoUser.signOut();
                 //   document.getElementById("loader-overlay").style.display = "none";
                }
            },
            onFailure: function (err) {
                if (err.code == "UserNotConfirmedException") {
                    alert("Usuario no verificado");
                    console.log(err);
                    document.getElementById("loader-overlay").style.display = "none";
                    return;
                } else if (err.code == "UsernameExistsException") {
                    alert("Correo o contraseña invalida");
                    console.log(err);
                    document.getElementById("loader-overlay").style.display = "none";
                    return;
                } else if (err.code == "LimitExceededException") {
                    alert("Numero de intentos superado, intente dentro de unos minutos");
                    document.getElementById("loader-overlay").style.display = "none";
                }
                else if (err.code == "InvalidPasswordException") {
                    alert("La nueva contraseña no satisface lo requisitos, esta tiene que ser mayor de 8 caracteres, y contener al menos un numero y una letra mayúscula");
                    document.getElementById("loader-overlay").style.display = "none";
                }
                else {
                    alert("Usuario o contraseña invalida");
                }

                console.log(err);
               // document.getElementById("loader-overlay").style.display = "none";
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
              //  document.getElementById("loader-overlay").style.display = "none";
                //alert("Cambio de contraseña ");
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                //  console.log("user atrib = " + JSON.stringify(userAttributes));

                // the api doesn't accept this field back
                newPassObject = this;
                delete userAttributes.email_verified;

                // store userAttributes on global variable
                // sessionUserAttributes = userAttributes;
                sessionUserAttributesGlobal = userAttributes;
                $("#form-login").fadeOut("fast", function () {
                    $("#formNewPass").fadeIn("slow");
                });

            }
        });

    };

    /**
     * @function ChangedPasswordlogin El usuario olvido la contraseña y necesita remplazarla
     */
    ChatApp.ChangedPasswordlogin = function (name, password) {

      //  document.getElementById("loader-overlay").style.display = "block";
        var authenticationData = {
            Username: name,
            Password: password
        };

        if (!username && !password) {
            alert("Complete la información.");
            //document.getElementById("loader-overlay").style.display = "none";
            return;

        }

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var userData = {
            Username: username,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        CognitoGlobal = cognitoUser;
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (data) {
                if (data.accessToken.payload.username) {

                    colaborador_codigo = data.accessToken.payload.username;
                    console.log("Password change success: " + colaborador_codigo);
                 //   gerUserInfo(data.accessToken.payload.username);
                    ChatApp.logout();
                  //  window.location = indexDir;

                }
                else {
                    console.log("Entro en signOut");
                    var cognitoUser = userPool.getCurrentUser();
                    cognitoUser.signOut();
                 //   document.getElementById("loader-overlay").style.display = "none";
                }
            },
            onFailure: function (err) {

                if (err.code == "UserNotConfirmedException") {
                    alert("Usuario no verificado");
                    console.log(err);
                    document.getElementById("loader-overlay").style.display = "none";
                    return;

                } else if (err.code == "LimitExceededException") {
                    alert("Numero de intentos superado, intente dentro de unos minutos");
                    document.getElementById("loader-overlay").style.display = "none";
                }//
                else if (err.code == "InvalidPasswordException") {
                    alert("La nueva contraseña no satisface lo requisitos, esta tiene que ser mayor de 8 caracteres, y contener al menos un numero y una letra mayúscula");
                    document.getElementById("loader-overlay").style.display = "none";
                } else {
                    alert("Usuario o contraseña invalida");
                }
                alert("Error al verificar la información, por favor vuelva a ingresar sus credenciales, utiliza tu nueva contraseña");
                ChatApp.logout();
                console.log(err);
              //  document.getElementById("loader-overlay").style.display = "none";
            }
        });

    };


    /**
     * @function logout realiza log-out con el usuario actual en sesion
     */
    ChatApp.logout = function () {
        var cognitoUser = userPool.getCurrentUser();
        cognitoUser.signOut();
        window.location = '../log-in/log-in.html';
    };

    /**
     * @function signup Registra un usuario
     */
    ChatApp.signup = function () {
        var username = $(userneameInputID).val();
        var password = $(passwordInputID).val();
        var email = new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: 'email',
            Value: $('#email').val()
        });

        userPool.signUp(username, password, [email], null, function (err, result) {
            if (err) {
                alert(err);
            } else {
                window.location = '/confirm.html#' + username;
            }
        });
    };

    /**
     * @function confirm confirma la identidad del usuario en el pool
     */
    ChatApp.confirm = function () {
        var username = location.hash.substring(1);
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: username,
            Pool: userPool
        });
        cognitoUser.confirmRegistration($('#code').val(), true, function (err, results) {
            if (err) {
                alert(err);
            } else {
                window.location = '/';
            }
        });
    };

    /**
     * @function resend reenvia el codigo de verificacion
     */
    ChatApp.resend = function () {
        var username = location.hash.substring(1);
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
            Username: username,
            Pool: userPool
        });
        cognitoUser.resendConfirmationCode(function (err) {
            if (err) {
                alert(err);
            }
        })
    };

}(jQuery));


 /**
 * @function handleNewPassword Crea una nueva contraseña y la confirma como valida o invalida
 */
function handleNewPassword() {

    var newPass = $('#newPassword').val();
    //var newPass = "Password2020"; // MOD
    CognitoGlobal.completeNewPasswordChallenge(newPass, sessionUserAttributesGlobal, newPassObject, {

        onSuccess: function (result) {

            ChatApp.ChangedPasswordlogin(result.accessToken.username, newPass);
        },
        onFailure: function (err) {

            alert("Error al remplazar la contraseña, por favor vuelva a intentar");
            ChatApp.logout();
            //  document.getElementById("loader-overlay").style.display = "none";

        }
    });


}

 /**
     * @function gerUserInfo Obtiene la información de un usuario especifico
     * @param codigo ID del usuario que se busca
     */
function gerUserInfo(codigo) {
    useToken(token, function (token) {
        apiClient.userCodigoColaboradorGet({ codigo_colaborador: codigo }, null, { headers: { Authorization: token } })
            .then(function (result) {
                //console.log("ENTRO GET");
                if (result.data.Items.length > 0) {                    // SAVE INFO
                    console.log("getUserinfo");
                    localStorage.setItem("userREDinfo", JSON.stringify(result.data.Items));

                    // GET INFO STRING
                    console.log(localStorage.getItem("userREDinfo"));

                    // GET INFO OBJ
                    //    console.log(JSON.parse(localStorage.getItem("userREDinfo")));

                    //  getDeptInfo(result.data[0].departamento,result.data[0].tipo_usuario);
                    window.location = indexDir;
                    // DELETE INFO
                    // localStorage.removeItem("userREDinfo");

                } else {
                    console.log("data menos que cero");
                    var cognitoUser = userPool.getCurrentUser();
                    cognitoUser.signOut();
                }
            });

    });
}
/*
function getDeptInfo(codigo,tipo_usuario) {
    useToken(token, function (token) {
        apiClient.departamentoCodigoDepartamentoGet({ codigo_departamento: codigo }, null, { headers: { Authorization: token }})
            .then(function (result) {

                if (result.data.length > 0) {
                    // SAVE INFO
                    localStorage.setItem("deptInfo", JSON.stringify(result.data[0]));

                    // GET INFO STRING
                    console.log(localStorage.getItem("deptInfo"));

                    // GET INFO OBJ
                    console.log(JSON.parse(localStorage.getItem("deptInfo")));
                    
                    getAccesInfo(tipo_usuario);
                }
                else {
                    var cognitoUser = userPool.getCurrentUser();
                    cognitoUser.signOut();
                }
            });
    });
}

function getAccesInfo(id) {
    useToken(token, function (token) {
        apiClient.accesoIdGet({ id: id }, null, { headers: { Authorization: token }})
            .then(function (result) {

                if (result.data.length > 0) {
                    // SAVE INFO
                    localStorage.setItem("accesoInfo", JSON.stringify(result.data[0]));

                    window.location = indexDir;

                }
                else {
                    var cognitoUser = userPool.getCurrentUser();
                    cognitoUser.signOut();
                }
            });
    });
}
*/

var token = null;
var userPoolAuthorization = new AmazonCognitoIdentity.CognitoUserPool(poolData);

 /**
     * @function useToken verificacion de token cognito
     * @param token token generado por cognito
     */
function useToken(token, callback) {
    if (token === null) {
        var cognitoUser = userPoolAuthorization.getCurrentUser();
        if (cognitoUser !== null) {
            //console.log("cognito user != nulo");
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    //   console.log("get session error");
                    window.location = '../../page/login/log_in.htm';
                }
                token = session.getIdToken().getJwtToken();
                // console.log("Token = "+ token);
                callback(token);
            });
        }
    } else {

        callback(token);
    }
};

$(window).on("load", function () {
    $("body").fadeIn(1000, function () {
        // $(".main-panel").fadeIn(50);
    });
});