class ErrorMessages {
  isRequiredField(fieldName){
    return `${ fieldName } is required.`;
  }

  invalidEmailFormat(fieldName){
    return `${ fieldName } must be a valid email format.`;
  }

}
