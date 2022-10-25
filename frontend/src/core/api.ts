import { defaultApiUrl } from "./helpers"
import { CreateUser, LoginDetails, User } from "./types"

export const BASE_URL = "http://127.0.0.1:8080"

export async function getBooks() {
  let response = await fetch(BASE_URL + "/wiki/books/")
  return await response.json()
}

export async function getBookFiles(book_id: string) {
  let response = await fetch(BASE_URL + "/wiki/books/" + book_id + "/files/")
  return await response.json()
}

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
}
