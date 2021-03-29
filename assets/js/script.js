// Constants declaration
const lowerCharacters = "abcdefghijklmnopqrstuvwxyz";
const upperCharacters = lowerCharacters.toUpperCase();
const numberCharacters = "0123456789";
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// Assignment Code
var generateBtn = document.querySelector("#generate");
var criteriaShowBtn = document.querySelector("#criteria-show");
var criteriaHideBtn = document.querySelector("#criteria-hide");
var criteriaObj = document.querySelector("#card-criteria");

var passLenObj = document.getElementById("password-length");
var passSpecNbrObj = document.getElementById("types-number");
var lowerCharSelObj = document.getElementById("lowercase");
var upperCharSelObj = document.getElementById("uppercase");
var numberCharSelObj = document.getElementById("number");
var specialCharSelObj = document.getElementById("special");
var errorLbl = document.getElementById("error-lbl");

var passLenVal;

// Read input criteria
function readInputs() {
  //
  passLenVal = passLenObj.value.trim();
  passSpecNbrVal = passSpecNbrObj.value.trim();
  //
  lowerCharSel = lowerCharSelObj.checked == true;
  upperCharSel = upperCharSelObj.checked == true;
  numberCharSel = numberCharSelObj.checked == true;
  specialCharSel = specialCharSelObj.checked == true;
}

// Check if password length  is a number
// TODO: This function could be converted to accept an string to be evaluated
function isValidNumber(input) {
  var l = input.length;
  var c;
  isNumber = false;

  // Parse the input character by character
  for (var i = 0; i < l; i++) {
    c = input.charCodeAt(i);

    // Check if the unicode character is between 48 and 57
    // 48 = '0' ... 57 = '9'
    if (c >= 48 && c <= 57) {
      isNumber = true;
    } else {
      isNumber = false;
      return;
    }
  }

  return isNumber;
}

// Check if character types have been selected
function isCharTypesChecked() {
  if (lowerCharSel || upperCharSel || numberCharSel || specialCharSel) {
    return true;
  } else {
    return false;
  }
}

// Check password length
function isValidPasswordLength() {
  // Check if password length is a valid number
  if (isValidNumber(passLenVal)) {
    passLenVal = parseInt(passLenVal);

    // Validate that the password length is a number between 8 and 128
    if (passLenVal >= 8 && passLenVal <= 128) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Check number of character types
function isValidNumberOfTypes() {
  // Check if password length is a valid number
  if (isValidNumber(passSpecNbrVal)) {
    passSpecNbrVal = parseInt(passSpecNbrVal);

    // Validate that the number of character types is a number between 1 and 4
    if (passSpecNbrVal >= 1 && passSpecNbrVal <= 4) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Validate length and selection of character types
function validateInputs() {
  //
  var validInputs = false;

  // Validate password length
  if (isValidPasswordLength()) {
    // Validate the number of character types
    if (isValidNumberOfTypes()) {
      // Validate the selection of special characters
      if (isCharTypesChecked()) {
        validInputs = true;
        showSuccess();
      } else {
        showError("You must check at least one character type");
      }
    } else {
      showError(
        "The number of character types must be a number between 1 and 4"
      );
    }
  } else {
    showError("Password length must be a number between 8 and 128");
  }

  return validInputs;
}

// Show error
function showError(message) {
  errorLbl.className = "error-lbl";
  errorLbl.innerHTML = message;
  errorLbl.visibility = "visible";

  if (!criteriaObj.classList.contains("show")) {
    criteriaObj.classList.toggle("show");
  }
}

// Show success
function showSuccess() {
  errorLbl.className = "success-lbl";
  errorLbl.innerHTML = "";
}

// Write password to the #password input
function writePassword() {
  if (validateInputs()) {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
  }
}

// Generate password
function generatePassword() {
  //
  var nCharTypes = 0; // Number of character types
  var rndIndex = 0;
  var rndCharType = 0;
  var arrCharTypes = [];
  var arrPassword = [];
  var strPassword = "";

  // Push the selection of character types into an array
  if (lowerCharSel) {
    arrCharTypes.push(0);
    nCharTypes++;
  }

  if (upperCharSel) {
    arrCharTypes.push(1);
    nCharTypes++;
  }

  if (numberCharSel) {
    arrCharTypes.push(2);
    nCharTypes++;
  }

  if (specialCharSel) {
    arrCharTypes.push(3);
    nCharTypes++;
  }

  //
  for (var i = 0; i < passLenVal; i++) {
    // Generate a random number between 0 and nCharTypes
    // 0 = lowercase
    // 1 = uppercase
    // 2 = number
    // 3 = special character
    rndCharType = Math.floor(Math.random() * nCharTypes);

    // Case lowercase and uppercase
    if (arrCharTypes[rndCharType] == 0 || arrCharTypes[rndCharType] == 1) {
      // Generate a random number between 0 and 25
      rndIndex = Math.floor(Math.random() * 26);

      if (arrCharTypes[rndCharType] == 0) {
        // Pick a lowercase character
        arrPassword.push(lowerCharacters.charAt(rndIndex));
      } else {
        // Pick an uppercase character
        arrPassword.push(upperCharacters.charAt(rndIndex));
      }
    } else if (arrCharTypes[rndCharType] == 2) {
      // Generate a random number between 0 and 9
      rndIndex = Math.floor(Math.random() * 10);

      // Pick a number character
      arrPassword.push(numberCharacters.charAt(rndIndex));
    } else {
      // Generate a random number between 0 and 29
      rndIndex = Math.floor(Math.random() * 30);

      // Pick an special character
      arrPassword.push(specialCharacters.charAt(rndIndex));
    }
  }

  // Convert the array into a string
  arrPassword.forEach(function (key) {
    strPassword += key;
  });

  return strPassword;
}

// Add event listener to generate button
//generateBtn.addEventListener("click", writePassword);
generateBtn.addEventListener("click", function (e) {
  //
  document.querySelector("#password").value = "";

  //
  readInputs();
  writePassword();
});

criteriaShowBtn.addEventListener("click", function (e) {
  //criteriaObj.style.visibility = "visible";
  criteriaObj.classList.toggle("show");
});

criteriaHideBtn.addEventListener("click", function (e) {
  criteriaObj.classList.toggle("show");
});
