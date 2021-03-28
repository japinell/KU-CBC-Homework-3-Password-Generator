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
var passSpecNbrObj = document.getElementById("special-number");
var lowerCharSelObj = document.getElementById("lowercase");
var upperCharSelObj = document.getElementById("uppercase");
var numberCharSelObj = document.getElementById("number");
var specialCharSelObj = document.getElementById("special");
var errorLbl = document.getElementById("error-lbl");

var passLenVal;

// Read input criteria
function readInputs() {
  passLenVal = passLenObj.value.trim();
  passSpecNbrVal = passSpecNbrObj.value.trim();
  lowerCharSel = lowerCharSelObj.checked == true;
  upperCharSel = upperCharSelObj.checked == true;
  numberCharSel = numberCharSelObj.checked == true;
  specialCharSel = specialCharSelObj.checked == true;
}

// Check if password length  is a number
// TODO: This function could be converted to accept an string to be evaluated
function isValidNumber() {
  var l = passLenVal.length;
  var c;
  isNumber = false;

  // Parse the input character by character
  for (var i = 0; i < l; i++) {
    c = passLenVal.charCodeAt(i);

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
function isValidLength() {
  if (passLenVal > 0) {
    // Check if passLenVal is a valid number
    if (isValidNumber()) {
      // Convert passLenVal to numeric
      passLenVal = parseInt(passLenVal);

      if (passLenVal >= 8 && passLenVal <= 128) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Validate length and selection of character types
function validateInputs() {
  // Validate password length
  if (isValidLength()) {
    // Validate the selection of special characters
    if (isCharTypesChecked()) {
      showPasswordSuccess();
    } else {
      showPasswordError("You must check at least one character type");
    }
  } else {
    showPasswordError("Password length must be a number between 8 and 128");
  }
}

// Show error
function showPasswordError(message) {
  errorLbl.className = "error-lbl";
  errorLbl.innerHTML = message;
  errorLbl.visibility = "visible";

  console.log(criteriaObj.classList);

  if (!criteriaObj.classList.contains("show")) {
    criteriaObj.classList.toggle("show");
  }
}

// Show success
function showPasswordSuccess() {
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
function generatePassword() {}

// Add event listener to generate button
//generateBtn.addEventListener("click", writePassword);
generateBtn.addEventListener("click", function (e) {
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
