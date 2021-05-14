var ChatApp = window.ChatApp || {};
var apiClient = apigClientFactory.newClient();


var indexDir = "../home/index.html";
var loginDir = "../log-in/log-in.html";


(function scopeWrapper($) {

    ChatApp.userPoolObj = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var apiClient = apigClientFactory.newClient();


    ChatApp.globalGetUser = function getUserGlobal(callback) {

        var cognitoUser = userPool.getCurrentUser();
        let params = {
            id: cognitoUser.username,
        };
        try {
            useToken(token, function (token) {
                apiClient.usuariosGetItemPost(null, params, {
                        headers: {
                            Authorization: token
                        }
                    })
                    .then(function (result) {
                        console.log("res = " + JSON.stringify(result));
                        if (result.data.hasOwnProperty("errorMessage")) {
                            alert("Error: " + result.data.errorMessage);
                            document.getElementById("loader-overlay-MOD").style.display = "none";
                            window.location.href = "log-in.html";
                            return
                            // location.reload();
                        }
                        if (result.status == 200) {
                            callback(result.data);
                        } else {
                            document.getElementById("loader-overlay-MOD").style.display = "none";
                            alert("Ocurrió un error al guardar los datos.");
                            //  document.getElementById("loader-overlay-MOD").style.display = "none";
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

    ChatApp.checkLogin = function (redirectOnRec, redirectOnUnrec) {

        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser === null) {
            if (redirectOnUnrec) {
                window.location = loginDir;
            }
        }
    };

    ChatApp.logout = function () {

        var cognitoUser = userPool.getCurrentUser();
        if (!cognitoUser) {
            //window.location = loginDir;
            return;
        }
        cognitoUser.signOut();
        localStorage.clear();
        window.location = loginDir;
    };

}(jQuery));

/*
let myPromise = new Promise(function(myResolve, myReject) {
  setTimeout(function() { myResolve("I love You !!"); }, 3000);
});

myPromise.then(function(value) {
  document.getElementById("demo").innerHTML = value;
});
*/



// Barra de busqueda global
$('.search-full').submit(function (evt) {
    var searchString = $(this).find('input[type="search"]').val();
    window.location.href = "../fichas_tecnicas/fichas-tecnicas.html?search=" + searchString; // remplazar

    evt.preventDefault();
});