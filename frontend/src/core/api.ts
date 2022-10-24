export const BASE_URL = "http://127.0.0.1:8080"

export async function getBooks() {
    let response = await fetch(BASE_URL + "/wiki/books/")
    return await response.json()
}

export async function getBookFiles(book_id: string) {
    let response = await fetch(BASE_URL + "/wiki/books/" + book_id + "/files/")
    return await response.json()
}
