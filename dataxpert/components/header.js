
document.write('<div class="header "> <a href="#" class="btn-link toggle-sidebar d-lg-none pg-icon btn-icon-link" data-toggle="sidebar">menu</a> <div class=""> <div class="brand inline m-l-10 "><a href="../home/index.html"><img src="../../assets/img/logo_p.png" alt="logo_p" data-src="../../assets/img/logo_p.png" data-src-retina="../../assets/img/isologo.png" height="22"></a></div> </div> <div class="d-flex align-items-center"> <div class="dropdown pull-right d-lg-block d-none"> <button class="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="profile dropdown"><span class="thumbnail-wrapper d32 circular inline"><img src="../../assets/img/profiles/user.png" alt="" data-src="../../assets/img/profiles/user.png" data-src-retina="../../assets/img/profiles/user2x.png" width="32" height="32"></span></button> <div class="dropdown-menu dropdown-menu-right profile-dropdown" role="menu"> <a href="#" class="dropdown-item"><b id="HeaderuserName">Usuario</b></span></a> <div class="dropdown-divider"></div> <a href="#" onclick="ChatApp.logout()" class="dropdown-item">Cerrar Sesión</a> </div> </div> </div></div>');


var globalUser = [];
window.onload = function () {
    $('#appMenu').parent().hide();
    
    // var dummyUser = {
    //     id: "01010",
    //     nombre: "DevUser",
    //     correo: "devUser@gmail.com"
    // }
    // setPage(dummyUser);
    
    ChatApp.globalGetUser(function (rest) {
        if(rest.tipo != "0"){
            ChatApp.logout();
        }
        // var img = (rest.url_foto.S == "#") ? "../../assets/images/jefe_icon.png" : rest.url_foto.S;
        $("#HeaderuserName").text(rest.nombre + " " + rest.apellidos)
        // Esta funcion esta presente en todos los .js que comparten el mismo nombre de los archivos .html el carpeta /Page/[locacion de pagina].
        // setPage() establece caracteristicas especificade esa pagina hacia el usuario actual.
        //[@param:JSON]
        setPage(rest);
        $('.content').fadeIn(150);
        $('.page-sidebar').fadeIn(150);
        $('.footer').fadeIn(150);

    });


};