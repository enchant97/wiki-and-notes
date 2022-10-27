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

  protected apiUrl(): string {
    return this.login?.apiUrl || this.defaultApiUrl
  }

  async postLogin(login: Login): Promise<string> {
    try {
      let response = await fetch(
        this.apiUrl() + "/auth/internal/token",
        {
          method: "POST",
          body: JSON.stringify(login),
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
      )
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
      )
      this.throwStatusExceptions(response);
      return await response.json()
    } catch (err) {
      throw this.intoApiError(err);
    }
  }
}
