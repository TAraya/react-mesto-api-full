const validator = require('validator');

module.exports.urlPattern = /^https?:\/\/(www\.)?[0-9a-z\-._~:?#[\]/@!$&'()*+,;=]+#?/i;

module.exports.urlValidator = (value, helper) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helper.error('any.invalid');
};
