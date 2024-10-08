interface ErrorResponse {
  message: string;
  stack?: string;
}

class RequestError extends Error {
  status: number;

  name: string;

  constructor(message: string, status: number, name?: string) {
    super(message);
    this.status = status;
    this.name = this.constructor.name || 'RequestError';
  }
}

class NotFoundError extends RequestError {
  constructor(message?: string) {
    const statusCode: number = 404;
    const defaultMessage: string = 'Object Not Found';
    super(message || defaultMessage, statusCode);
  }
}

export {
  ErrorResponse,
  RequestError,
  NotFoundError,
}
