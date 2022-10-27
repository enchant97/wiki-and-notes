
export enum ApiErrorTypes {
  CannotConnectToEndpoint,
  EndpointResponseInvalid,
  AuthenticationFailed,
  NotFound,
}

export type ApiErrorCause = {
  errorType: ApiErrorTypes
}

export interface ApiErrorOptions extends ErrorOptions {
  cause?: ApiErrorCause
}

export class ApiError extends Error {
  cause?: ApiErrorCause;
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, options);
  }
}
