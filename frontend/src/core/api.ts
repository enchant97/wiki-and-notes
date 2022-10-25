import { defaultApiUrl } from "./helpers"
import { CreateUser, LoginDetails, Shelf, User } from "./types"

export default class Api {
  defaultApiUrl = defaultApiUrl()
  login?: LoginDetails

  constructor(login: LoginDetails | null) {
    if (login) {
      this.login = login
    }
  }

  protected apiUrl(): string {
    return this.login?.apiUrl || this.defaultApiUrl
  }

  async postUser(user: CreateUser): Promise<User> {
    let response = await fetch(
      this.apiUrl() + "/users",
      {
        method: "POST",
        body: JSON.stringify(user),
      },
    )
    if (!response.ok) {
      throw new Error(`${response.status}`)
    }
    return await response.json()
  }
  async getShelves(): Promise<Shelf[]> {
    let response = await fetch(
      this.apiUrl() + "/shelves",
    )
    return await response.json()
  }
  async getShelfById(shelfId: number): Promise<Shelf> {
    let response = await fetch(
      this.apiUrl() + "/shelves/" + shelfId,
    )
    return await response.json()
  }
}
