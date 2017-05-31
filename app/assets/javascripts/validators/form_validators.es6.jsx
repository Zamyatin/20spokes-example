class FormValidator {

  required(text) {
    if (text) {
      return null;
    } else {
      return ErrorMessage.isRequiredField
    }
  }

  validateEmail(email) {
    const regex = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
    if (regex.test(email)) {
      return null;
    } else {
      return ErrorMessage.invalidEmailFormat
    }
  }
}
