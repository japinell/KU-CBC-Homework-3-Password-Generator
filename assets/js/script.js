// Constants declaration
const lowerCharacters = "abcdefghijklmnopqrstuvwxyz";
const upperCharacters = lowerCharacters.toUpperCase();
const numberCharacters = "0123456789";
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// Assignment Code
var generateBtn = document.querySelector("#generate");
var criteriaBtn = document.querySelector("#criteria");
var criteriaObj = document.querySelector("#card-criteria");

var passLenObj = document.getElementById("password-length");
var lowerCharSelObj = document.getElementById("lowercase");
var upperCharSelObj = document.getElementById("uppercase");
var numberCharSelObj = document.getElementById("number");
var specialCharSelObj = document.getElementById("special");
var errorLbl = document.getElementById("error-lbl");

var passLenVal;
var lowerCharSelVal;
var upperCharSelVal;
var numberCharSelVal;
var specialCharSelVal;

// Read input criteria
function readInputs() {
  passLenVal = passLenObj.value.trim();
  lowerCharSelVal = lowerCharSelObj.value;
  upperCharSelVal = upperCharSelObj.value;
  numberCharSelVal = numberCharSelObj.value;
  specialCharSelVal = specialCharSelObj.value;
}

// Check if passLenVal is a number
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

// Show error
function showPasswordError() {
  passLenObj.style.border = "1px solid red";
  errorLbl.className = "error-lbl";
  errorLbl.innerHTML = "Password length must be a number between 8 and 128";
  errorLbl.visibility = "visible";
}

// Show success
function showPasswordSuccess() {
  passLenObj.style.border = "1px solid green";
  errorLbl.className = "success-lbl";
  errorLbl.innerHTML = "Password length is valid";
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  //var passwordText = document.querySelector("#password");

  //passwordText.value = password;
}

// Generate password
function generatePassword() {
  if (isValidLength()) {
    showPasswordSuccess();
  } else {
    showPasswordError();
  }
}

// Add event listener to generate button
//generateBtn.addEventListener("click", writePassword);
generateBtn.addEventListener("click", function (e) {
  readInputs();
  writePassword();
});

criteriaBtn.addEventListener("click", function (e) {
  console.log("Visibility :>> " + criteriaObj.style.visibility);
  criteriaObj.style.visibility = "visible";
  console.log("Visibility :>> " + criteriaObj.style.visibility);
});
