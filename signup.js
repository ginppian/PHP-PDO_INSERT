$(document).ready(function(){


});

$(document).on("click", "#button", function(){

    // Validamos
    if(isFullForm()){
        if(isEmail(getCorreo())){
            if(verifyEqualPass(getPassword(), getVerifyPassword())){

                // Obtenemos objeto JSON
                var myObj = JSON.stringify(getFormInJSON());

                $.ajax({
                    type:"POST",
                    url:"signup.php",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data:{obj:myObj},
                    success: function(result){

                        alert(result);
                    },
                    error: function(e){
                        console.log(e.message);
                    }
                });


            }else{
                alert("¡Las contraseñas NO coinciden!");
            }
        } else {
            alert("¡Por favor ingresa un correo VALIDO!");
        }
    } else {
        alert("Por favor llena todos los campos");
    }
});

function getNombre() {
    return $("#nombre").val();
}

function getPaterno() {
    return $("#paterno").val();
}

function getMaterno() {
    return $("#materno").val();
}

function getCorreo() {
    return $("#correo").val();
}

function getPassword() {
    return $("#password").val();
}

function getVerifyPassword() {
    return $("#verifyPassword").val();
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isFullForm(){
    if( getNombre()   != ''       && getNombre()   != ' ' &&
        getPaterno()  != ''       && getPaterno()  != ' ' &&
        getMaterno()  != ''       && getMaterno()  != ' ' &&
        getCorreo()   != ''       && getCorreo()   != ' ' &&
        getPassword() != ''       && getPassword() != ' ' &&
        getVerifyPassword() != '' && getVerifyPassword() != ' '
    ){
        return true;
    } else {
        return false;
    }
}

function verifyEqualPass(pass1, pass2){
    if(pass1 == pass2){
        return true;
    } else {
        return false;
    }
}

function getFormInJSON(){

    var obj = {}
    obj["nombre"]   = getNombre();
    obj["paterno"]  = getPaterno();
    obj["materno"]  = getMaterno();
    obj["correo"]   = getCorreo();
    obj["password"] = getPassword();

    return obj;
}