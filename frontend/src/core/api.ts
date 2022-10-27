import { ApiError, ApiErrorTypes } from "./exceptions"
import { defaultApiUrl } from "./helpers"
import { CreateUser, Login, LoginDetails, Shelf, User } from "./types"

export default class Api {
  defaultApiUrl = defaultApiUrl()
  login?: LoginDetails

  constructor(login: LoginDetails | null) {
    if (login) {
      this.login = login
    }
  }
  /**
   * If the response is !ok, throw related 'ApiError' exception
   */
  private throwStatusExceptions(response: Response) {
    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new ApiError(
            "given credentials not accepted",
            { cause: { errorType: ApiErrorTypes.AuthenticationFailed } }
          );
        case 404:
          throw new ApiError(
            "api endpoint not found",
            { cause: { errorType: ApiErrorTypes.NotFound } }
          );
      }
      throw new ApiError(`unhandled api exception: ${response.status}}`)
    }
  }
  /**
   * Convert a caught error into a ApiError, if possible
   */
  private intoApiError(err: any) {
    if (err instanceof TypeError) {
      return new ApiError(
        "api endpoint connection failure",
        { cause: { errorType: ApiErrorTypes.CannotConnectToEndpoint } }
      );
    } else if (err instanceof SyntaxError) {
      return new ApiError(
        "api endpoint response invalid",
        { cause: { errorType: ApiErrorTypes.EndpointResponseInvalid } }
      );
    }
    return err;
  }
  /**
   * Get the api url, either default or the user configured one
   */
  protected apiUrl(): string {
    return this.login?.apiUrl || this.defaultApiUrl
  }
  /**
   * Get pre-made headers with Authorization and Content-Type
   */
  protected getHeaders(): Headers {
    let headers = new Headers();
    if (this.login) {
      headers.append("Authorization", `Bearer ${this.login.token}`);
    }
    headers.append("Content-Type", "application/json; charset=utf-8");
    return headers;
  }

  async postLogin(login: Login): Promise<string> {
    try {
      let response = await fetch(
        this.apiUrl() + "/auth/internal/token",
        {
          method: "POST",
          body: JSON.stringify(login),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );
      this.throwStatusExceptions(response);
      return await response.text()
    } catch (err) {
      throw this.intoApiError(err);
    }
  }
  async postUser(user: CreateUser): Promise<User> {
    try {
      let response = await fetch(
        this.apiUrl() + "/users",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: this.getHeaders(),
        },
      )
      this.throwStatusExceptions(response);
      return await response.json()
    } catch (err) {
      throw this.intoApiError(err);
    }
  }
  async getShelves(): Promise<Shelf[]> {
    try {
      let response = await fetch(
        this.apiUrl() + "/shelves",
        {
          headers: this.getHeaders(),
        },
      );
      this.throwStatusExceptions(response);
      return await response.json()
    } catch (err) {
      throw this.intoApiError(err);
    }
  }
  async getShelfById(shelfId: number): Promise<Shelf> {
    try {
      let response = await fetch(
        this.apiUrl() + "/shelves/" + shelfId,
        {
          headers: this.getHeaders(),
        },
      )
      this.throwStatusExceptions(response);
      return await response.json()
    } catch (err) {
      throw this.intoApiError(err);
    }
  }
}

/**
 * Get temporary api object without a login
 * @param apiUrl Default api url to use
 * @returns Temporary api
 */
export function getTempApi(apiUrl: string): Api {
  let tempApi = new Api(null)
  tempApi.defaultApiUrl = apiUrl
  return tempApi
}
