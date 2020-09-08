export interface UserCreate {
  name: string
  email: string
  password: string
}

export interface User {
  email: string
  password: string
}

export  interface PasswordUniqErrors {
  isIncludesEmail?: boolean
  isIncludesName?: boolean
}
