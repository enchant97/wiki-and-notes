export type LoginDetails = {
  apiUrl: string
  token: string
}

export type Base = {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export type User = Base & {
  username: string
}

export type Shelf = Base & {
  title: string
  systemTitle: string
  ownerId: number
}

export type Login = {
  username: string
}

export type CreateUser = {
  username: string
}

export type UrlTitleParts = {
  shelfTitle: string
  bookTitle?: string
  pageTitle?: string
}

export type ConvertedIds = {
  shelfId: number
  bookId?: number
  pageId?: number
}
