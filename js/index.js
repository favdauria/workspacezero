function emailCheck(){   
    let email = document.getElementById("floatingInput");

    if( email.value != "" ){
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
        return true;
    } else{
        
        email.classList.remove('is-valid');
        email.classList.add('is-invalid');
        return false;
    }   
}

function pwdCheck(){   
    let password = document.getElementById("floatingPassword");

    if( password.value == "" ){
        password.classList.remove('is-valid');
        password.classList.add('is-invalid');
        return false;
    } else{
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
        return true;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("subButton").addEventListener("click", function() {
        if(emailCheck() && pwdCheck()){
            window.location(index2.html)
        }else{
            emailCheck();
            pwdCheck();
        }

    });

});