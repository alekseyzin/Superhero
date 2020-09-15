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
  appearance?: Appearance
  biography?: Biography
  connections?: Connections
  work?: Work


}

interface PowerStats {
  combat: string
  durability: string
  intelligence: string
  power: string
  speed: string
  strength: string
}

interface Appearance {
  'eye-color': string
  gender: string
  'hair-color': string
  height: string[]
  race: string
  weight: string[]
}

interface Biography {
  aliases: string[]
  alignment: string
  'alter-egos': string
  'first-appearance': string
  'full-name': string
  'place-of-birth': string
  publisher: string
}

interface Connections {
  'group-affiliation': string
  relatives: string
}

interface Work {
  base: string
  occupation: string
}

export interface PowerupItem {
  id: number
  name: string
  image: string
  description: string
  count: number
}

export interface History {
  date: Date
  hero: string
  heroId: string
  opponent: string
  opponentId: string
  result: 'win' | 'lose'
}
