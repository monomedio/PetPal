function checkPasswordCriteria(){
    var myInput = document.getElementById("signup-password");
    var letter = document.getElementById("letter");
    var special= document.getElementById("special");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
    }

    myInput.onblur = function() {
    document.getElementById("message").style.display = "none";
    }

    myInput.onkeyup = function() {
        // lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(myInput.value.match(lowerCaseLetters)) {  
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // special characters
        var specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]+/;
        if(myInput.value.match(specialCharacters)) {  
            special.classList.remove("invalid");
            special.classList.add("valid");
        } else {
            special.classList.remove("valid");
            special.classList.add("invalid");
        }
    
        // capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(myInput.value.match(upperCaseLetters)) {  
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // numbers
        var numbers = /[0-9]/g;
        if(myInput.value.match(numbers)) {  
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }
    
        // greater than 8 
        if(myInput.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }
}


function checkPasswordMatch() {
    var signup_password = document.getElementById("signup-password");
    var confirm_signup_password = document.getElementById("confirm-signup-password");
    var passwordMatchMessage = document.getElementById("passwordMatchMessage");
    if (signup_password.value === confirm_signup_password.value) {
        passwordMatchMessage.textContent = "Match";
        passwordMatchMessage.style.color = "green"; 
    } else {
        passwordMatchMessage.textContent = "Does not match";
        passwordMatchMessage.style.color = "red"; 
    }
}


myInput.onkeyup = checkPasswordCriteria;

confirm_signup_password.onkeyup = function() {
    checkPasswordCriteria();
    checkPasswordMatch();
};