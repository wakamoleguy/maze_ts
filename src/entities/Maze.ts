import { v4 } from 'uuid'
import { User } from './User'

const SIZE = 15

export interface Maze {
  id: string
  creator: User
  name: string
  size: number
}

export type Direction = 'north' | 'south' | 'east' | 'west'

export type Tile = 0 | 1

export interface StartPoint {
  x: number
  z: number
  direction: Direction
}

export interface EndPoint {
  x: number
  z: number
}

export interface Revision {
  id: string
  maze: Maze
  version: number
  start: StartPoint
  destination: EndPoint
  tileMap: Tile[][]
}

export function create(user: User): Revision {
  const maze: Maze = {
    creator: user,
    id: v4(),
    name: 'Untitled Maze',
    size: SIZE,
  }

  const tileMap = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(0))

  const start: StartPoint = { direction: 'east', x: 1, z: 1 }
  const destination = { x: 1, z: 0 }

  const revision: Revision = {
    destination,
    id: v4(),
    maze,
    start,
    tileMap,
    version: 0,
  }

  return revision
}
