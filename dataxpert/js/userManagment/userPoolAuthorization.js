var token = null;
var userPoolAuthorization = new AmazonCognitoIdentity.CognitoUserPool(poolData);

var indexDir = "../home/index.html";
var loginDir = "../log-in/log-in.html";

function useToken(token, callback) {
    if (token === null) {
        var cognitoUser = userPoolAuthorization.getCurrentUser();
        if (cognitoUser !== null) {
            cognitoUser.getSession(function (err, session) {
                if (err) {
                    window.location = loginDir;
                }
                token = session.getIdToken().getJwtToken();
                callback(token);
            });
        }
    } else {
        callback(token);
    }
};

async function asyncUseToken(token) {
    if (token === null) {
        var cognitoUser = await userPoolAuthorization.getCurrentUser();
        if (cognitoUser !== null) {
           try {
                return cognitoUser.getSession(async function(err, session){ 
                    token =  session.getIdToken().getJwtToken();
                    return token;
                });
           } catch (err) {
               console.log("err = " + err);
           }
            
        }
    } else {
      return token;
    }
};