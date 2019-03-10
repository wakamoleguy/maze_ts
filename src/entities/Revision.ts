import { Maze } from './Maze'

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
