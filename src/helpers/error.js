class ApplicationError extends Error {
  constructor(status, message = 'an error occurred', errors) {
    super(message);
    this.status = status || 500;
    this.message = message;
    this.errors = errors;
  }
}

export default ApplicationError;
