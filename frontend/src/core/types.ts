export type LoginDetails = {
  apiUrl: string
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

export type CreateUser = {
  username: string
}
