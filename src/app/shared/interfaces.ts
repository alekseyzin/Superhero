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

export interface Hero {
  id: string
  name: string
  image: {url: string}
  powerstats: PowerStats
}

interface PowerStats {
  combat: string
  durability: string
  intelligence: string
  power: string
  speed: string
  strength: string
}

export interface PowerupItem {
  id: number
  name: string
  image: string
  description: string
  count: number
}
