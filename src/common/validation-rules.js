export const validation = {
    validatePassword,
    validateSuccess,
    validateNotBlank,
    validateUsername,
    validateName,
    validateSurname,
    validateEmail,
    validatePhoneNumber,
    validateDescription
};

function validatePhoneNumber (phoneNumber) {
    const PHONEPL_REGEX = RegExp(
      "(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\\d{7}"
    );
  
    if (!PHONEPL_REGEX.test(phoneNumber)) {
      return {
        validateStatus: "error",
        errorMsg: "Niepoprawny format numeru telefonu!",
      };
    } else if (phoneNumber.length > 30) {
      return {
        validateStatus: "error",
        errorMsg: `Długość numer telefonu jest zbyt długa - może mieć maksymalnie 30 znaków!`,
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  }

function validateDescription(description) {
    if (description.length > 255) {
        return {
            validateStatus: "error",
            errorMsg: `Opis jest zbyt długi - może mieć maksymalnie 255 znaków!`
        };
    } else {
        return {
            validateStatus: "success",
            errorMsg: null,
        };
    }
}

function validateSurname(surname) {
    if (surname.length > 60) {
        return {
            validateStatus: "error",
            errorMsg: `Nazwisko jest zbyt długie - może mieć maksymalnie 60 znaków!`
        };
    } else {
        return {
            validateStatus: "success",
            errorMsg: null,
        };
    }
}

function validateName(name) {
    if (name.length > 60) {
        return {
            validateStatus: "error",
            errorMsg: `Imię jest zbyt długie - może mieć maksymalnie 60 znaków!`
        };
    } else {
        return {
            validateStatus: "success",
            errorMsg: null,
        };
    }
}

function validateUsername(username) {
    if (username.length < 7) {
        return {
            validateStatus: "error",
            errorMsg: `Nazwa użytkownika jest zbyt krótka, wymagane jest 7 znaków!`
        };
    } else if (username.length > 60) {
        return {
            validateStatus: "error",
            errorMsg: `Nazwa użytkownika jest zbyt długa - może mieć maksymalnie 60 znaków!`
        };
    } else {
        return {
            validateStatus: "success",
            errorMsg: null,
        };
    }
}

function validateEmail (email) {
    if (!email) {
      return {
        validateStatus: "error",
        errorMsg: "Email nie może być pusty!"
      };
    }
  
    const EMAIL_REGEX = RegExp(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: "error",
        errorMsg: "Niepoprawny format emaila!"
      };
    }
  
    if (email.length > 60) {
      return {
        validateStatus: "error",
        errorMsg: `Email jest zbyt długi - może mieć maksymalnie 60 znaków!`
      };
    }
  
    return {
      validateStatus: "success",
      errorMsg: null
    };
}

function validatePassword(password) {
    const pattern = new RegExp("[0-9]");

    if (password.length < 7) {
        return {
            validateStatus: "error",
            errorMsg: `Hasło jest zbyt krótkie, wymagane jest 7 znaków!`
        };
    } else if (!pattern.test(password)) {
        return {
            validateStatus: "error",
            errorMsg: `Hasło powinno zawierać co najmniej jedną cyfrę!`
        };
    } else {
        return {
            validateStatus: "success",
            errorMsg: null
        };
    }
}

function validateNotBlank(input) {
    if (input.length < 1) {
        return {
            validateStatus: "error",
            errorMsg: `Pole nie powinno być puste!`
        };
    } else {
        return {
        validateStatus: "success",
        errorMsg: null
      };
    }
}

function validateSuccess(request) {
    return {
        validateStatus: "success",
        errorMsg: null
      };
}