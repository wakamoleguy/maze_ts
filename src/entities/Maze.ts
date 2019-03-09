import { User } from './User'

export interface Maze {
  id: string
  creator: User
  name: string
  size: number
}
