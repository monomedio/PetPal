function checkPasswordCriteria() {
    var myInput = document.getElementById("signup-password");
    var letter = document.getElementById("letter");
    var special= document.getElementById("special");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

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

var myInput = document.getElementById("signup-password");
var confirm_signup_password = document.getElementById("confirm-signup-password");

// Show password criteria when input is focused
myInput.addEventListener('focus', function() {
    document.getElementById("message").style.display = "block";
});

// Hide password criteria when input loses focus
myInput.addEventListener('blur', function() {
    document.getElementById("message").style.display = "none";
});

// Attach the event listeners for keyup
myInput.addEventListener('keyup', checkPasswordCriteria);
confirm_signup_password.addEventListener('keyup', checkPasswordMatch);



function checkPasswordMatch() {
    var signup_password = document.getElementById("signup-password");
    var confirm_signup_password = document.getElementById("confirm-signup-password");
    var passwordMatchMessage = document.getElementById("passwordMatchMessage");
    if (signup_password.value === confirm_signup_password.value) {
        passwordMatchMessage.textContent = "Match!";
        passwordMatchMessage.style.color = "green"; 
    } else {
        passwordMatchMessage.textContent = "Does not match. Please try again";
        passwordMatchMessage.style.color = "red"; 
    }
}


var myInput = document.getElementById("signup-password");
var confirm_signup_password = document.getElementById("confirm-signup-password");

// Attach the event listeners
myInput.addEventListener('keyup', checkPasswordCriteria);

confirm_signup_password.addEventListener('keyup', function() {
    checkPasswordCriteria();
    checkPasswordMatch();
});