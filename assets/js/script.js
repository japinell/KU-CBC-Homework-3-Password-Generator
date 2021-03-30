// Constants declaration
const lowerCharacters = "abcdefghijklmnopqrstuvwxyz";
const upperCharacters = lowerCharacters.toUpperCase();
const numberCharacters = "0123456789";
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// Variables declaration
var intPassLength;
var lowerCharSel;
var upperCharSel;
var numberCharSel;
var specialCharSel;

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Read the password length
function readPasswordLength() {
  //
  intPassLength = prompt(
    "Enter the password length, an integer number between 8 and 128: "
  );
  //
  while (!isValidNumber() || !(intPassLength >= 8 && intPassLength <= 128)) {
    alert("Password length must be an integer number between 8 and 128");
    intPassLength = prompt(
      "Enter the password length, an integer number between 8 and 128: "
    );
  }
  //
}

// Read the character types
function readCharacterTypes(strMessage) {
  //
  var strCharType = prompt(strMessage).toUpperCase();
  //
  while (!(strCharType === "Y" || strCharType === "N")) {
    //
    alert("Password must contain at least one character type");
    strCharType = prompt(strMessage).toUpperCase();
    //
  }
  //
  return strCharType;
  //
}

// Read input criteria
function readInputs() {
  //
  readPasswordLength();
  //
  lowerCharSel =
    readCharacterTypes(
      "Should the password include Lowercase characters -> Y = Yes, N = No? "
    ) === "Y"
      ? true
      : false;
  upperCharSel =
    readCharacterTypes(
      "Should the password include Uppercase characters -> Y = Yes, N = No? "
    ) === "Y"
      ? true
      : false;
  numberCharSel =
    readCharacterTypes(
      "Should the password include Number characters -> Y = Yes, N = No? "
    ) === "Y"
      ? true
      : false;
  specialCharSel =
    readCharacterTypes(
      "Should the password include Special characters -> Y = Yes, N = No? "
    ) === "Y"
      ? true
      : false;
  //
  // At least one character type must be entered
  //
  if (!isCharTypesChecked()) {
    //
    alert(
      "Because no character type was selected, the password will contain Special characters"
    );
    //
    specialCharSel = true;
    //
  }
}

// Check if password length  is a number
// TODO: This function could be converted to accept a string to be evaluated
//    Also, it could use regular expressions instead
function isValidNumber() {
  //
  isNumber = false;
  //
  if (!(intPassLength === null)) {
    //
    var c;
    var l = intPassLength.length;
    // Parse the input character by character
    for (var i = 0; i < l; i++) {
      c = intPassLength.charCodeAt(i);

      // Check if the unicode character is between 48 and 57
      // 48 = '0' ... 57 = '9'
      if (c >= 48 && c <= 57) {
        isNumber = true;
      } else {
        isNumber = false;
        return;
      }
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
  if (isValidNumber()) {
    //
    intPassLength = parseInt(intPassLength);

    // Validate that the password length is a number between 8 and 128
    if (intPassLength >= 8 && intPassLength <= 128) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
  //
}

// Validate length and selection of character types
function validateInputs() {
  //
  var validInputs = false;

  // Validate password length
  if (isValidPasswordLength()) {
    // Validate the selection of special characters
    if (isCharTypesChecked()) {
      validInputs = true;
    }
  }

  return validInputs;
}

// Read inputs and generate password
function generatePassword() {
  //
  readInputs();
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
  for (var i = 0; i < intPassLength; i++) {
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

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
