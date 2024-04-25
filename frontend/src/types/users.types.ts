export type User = {
  id: number,
  customName: string,
  tagName: string,
  picture: string,
  password: string,
  email: string,
  description: string,
}

export type UserFields = 'customName' | 'tagName' | 'picture' | 'password' | 'email' | 'description'

export type UserResponse = { token: string, user: User };