/**
 * Custom error class for External API errors
 * @class
 */
class ExternalApiError extends Error {
  constructor(message, statusCode, responseBody) {
    super(message);
    this.name = 'ExternalApiError';
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}

module.exports = ExternalApiError;
