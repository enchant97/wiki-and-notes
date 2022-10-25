export type LoginDetails = {
  apiUrl: string
}

export type User = {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: string
  username: string
}

export type CreateUser = {
  username: string
}
