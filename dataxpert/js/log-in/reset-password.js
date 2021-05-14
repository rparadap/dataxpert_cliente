/*
Titulo:  reset-password.js
Descripción: Gestiona funciones para reset-password.html

Datos del autor : 
-Alexander Villegas Valverde
-Empresa: TECHBITE

Version 1.0
Ultima modificacion : 10/01/2021

Otros cambios:
Sin cambios nuevos
*/

var ChatApp = window.ChatApp || {};
var apiClient = apigClientFactory.newClient();// Instancia del API de aws

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


 var indexDir =  "../home/index.html"; 
 var loginDir = "../login/log-in.html";
 
var sessionUserAttributesGlobal;
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
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser !== null) {
            if (redirectOnRec) {
                window.location = '../home/index.html';
            }
        } else {
            if (redirectOnUnrec) {
                window.location = '../login/log_in.html';
            }
        }
    };

    /**
     * @function logout realiza log--out sobre el usuario actual
     */
    ChatApp.logout = function () {
        var cognitoUser = userPool.getCurrentUser();
        cognitoUser.signOut();
        window.location = '../login/login.html';
    };

    /**
     * @function signup registro de usuario
     */
    ChatApp.signup = function () {
        var username = $('#username').val();
        var password = $('#password').val();
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
    CognitoGlobal.completeNewPasswordChallenge(newPass, sessionUserAttributesGlobal, {
        onSuccess: function (result) {
            // User authentication was successful
            gerUserInfo(userNameGlobal);
        },
        onFailure: function (err) {
            // User authentication was not successful
            console.log(err);
            alert("Error al actualizar la contraseña");

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

                if (result.data.Items.length > 0) {
                    // SAVE INFO
                    localStorage.setItem("userREDinfo", JSON.stringify(result.data.Items));

                    // GET INFO STRING
                    console.log(localStorage.getItem("userREDinfo"));

                    // GET INFO OBJ
                    console.log(JSON.parse(localStorage.getItem("userREDinfo")));
                    window.location = '../home/index.html';
                    //getDeptInfo(result.data[0].departamento,result.data[0].tipo_usuario);

                    // DELETE INFO
                    // localStorage.removeItem("userREDinfo");

                } else {
                    var cognitoUser = userPool.getCurrentUser();/// User pool is not definet
                    cognitoUser.signOut();
                }

            });
    });
}

 /**
     * @function getAccesInfo agregar al localStorage la informacion del usuario 
     * @param id ID del usuario que se busca
     */
function getAccesInfo(id) {
    useToken(token, function (token) {
        apiClient.accesoIdGet({ id: id }, null, { headers: { Authorization: token } })
            .then(function (result) {

                if (result.data.length > 0) {
                    // SAVE INFO
                    localStorage.setItem("accesoInfo", JSON.stringify(result.data[0]));

                    window.location = '../home/index.html';

                }
                else {
                    var cognitoUser = userPool.getCurrentUser();
                    cognitoUser.signOut();
                }
            });
    });
}

 /**
     * @function getAccesInfo Valida al usuario dentro de cognito
     */
function validarInfo() {
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var input = $('#username').val();

    var email = new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: 'email',
        Value: input
    });//err['code'] ==  "InvalidParameterException")
    // console.log("my object: %o", userPool);
    userPool.signUp(input, null, [email], null, function (err, result) {
        console.log("ERRRO  = " + JSON.stringify(err));
        console.log("result  = " + JSON.stringify(result));
        if (err['code'] == "UserNotFoundException" || err['code'] == 'UserNotConfirmedException') {
            alert(err['code'] + " : Correo no registrado");
            //  return;
        }
    });

    if (input) {
        userNameGlobal = input;
        var authenticationData = {
            Username: userNameGlobal
        };
        var userData = {
            Username: userNameGlobal,
            Pool: userPool
        };


        CognitoGlobal = new AmazonCognitoIdentity.CognitoUser(userData);
        restablecerPassword();


    } else {
        alert("Ingrese código o correo valido");
    }


}

 /**
     * @function restablecerPassword Envia el codigo de recuperacion de contraseña
     */
function restablecerPassword() {
    CognitoGlobal.forgotPassword({
        onSuccess: function (data) {
            // successfully initiated reset password request
            $("#form-login").fadeOut("fast", function () {
                $("#formNewPass").fadeIn("slow");
            });

            console.log('CodeDeliveryData from forgotPassword: ' + data);
        },
        onFailure: function (err) {
            console.log(err);
            if (err.code == "LimitExceededException") {
                alert("Limite de intentos excedido. Intente mas tarde.");
                document.getElementById("loader-overlay").style.display = "none";
                return;
            }
            if (err.code == "InvalidParameterException") {
                alert("Error en el formato de la contraseña.");
                document.getElementById("loader-overlay").style.display = "none";
                return;
            } else if (err.code == "InvalidPasswordException") {
                alert("La nueva contraseña no satisface lo requisitos, esta tiene que ser mayor de 8 caracteres, y contener al menos un numero y una letra mayúscula");
                document.getElementById("loader-overlay").style.display = "none";
            } else {
                alert("Usuario o contraseña invalida");
            }
            alert(err.message || JSON.stringify(err));
        }
    });
}

/**
     * @function validateNewPassword Valida la nueva contraseña ingresada
     */
function validateNewPassword() {
   // document.getElementById("loader-overlay").style.display = "block";
    var code = $('#code').val();
    var newPassword = $('#password').val();

    if (code && newPassword) {
        CognitoGlobal.confirmPassword(code, newPassword, {
            onSuccess() {
                console.log('Password confirmed!');
                login(newPassword);
            },
            onFailure(err) {
                console.log('Password not confirmed !');
                console.log("JSON = " + JSON.stringify(err));
                if (err.code == "LimitExceededException") {
                    alert("Limite de intentos excedido. Intente mas tarde.");
                    return;
                }
                if (err.code == "InvalidParameterException") {
                    alert("Error en el formato de la contraseña.");
                    return;
                } else if (err.code == "InvalidPasswordException") {
                    alert("La nueva contraseña no satisface lo requisitos, esta tiene que ser mayor de 8 caracteres, y contener al menos un numero y una letra mayúscula");
                    
                } else if (err.code == "CodeMismatchException") {
                    alert("Por favor ingrese un código válido");
                } else {
                    alert("Usuario o contraseña invalida");
                }
              //  document.getElementById("loader-overlay").style.display = "none";
            },
        });
    }
    else {
        document.getElementById("loader-overlay").style.display = "none";
        alert("Complete la información correctamente.");
    }

}
/**
     * @function login realiza log-in en el usuario actual
     * @param pass contraseña del usuario
     */
 function login(pass) {

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var authenticationData = {
        Username: userNameGlobal,
        Password: pass
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var userData = {
        Username: userNameGlobal,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    CognitoGlobal = cognitoUser;
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (data) {
            if (data.accessToken.payload.username) {
                window.location = indexDir
            }
            else {
                var cognitoUser = userPool.getCurrentUser();
                cognitoUser.signOut();
                document.getElementById("loader-overlay").style.display = "none";
            }
        },
        onFailure: function (err) {
            alert("Usuario o contraseña invalida");
            console.log(err);
            document.getElementById("loader-overlay").style.display = "none";
        }
    });
};   

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
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    window.location = '../../page/login/log_in.htm';
                }
                token = session.getIdToken().getJwtToken();
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