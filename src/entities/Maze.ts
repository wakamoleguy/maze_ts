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

export interface Point {
  x: number
  z: number
}

export interface StartPoint extends Point {
  direction: Direction
}

export interface Revision {
  maze: Maze
  version: number
  start: StartPoint
  destination: Point
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
    maze,
    start,
    tileMap,
    version: 0,
  }

  return revision
}

export function setStart(revision: Revision, start: StartPoint): Revision {
  return {
    ...revision,
    start,
  }
}

export function setDestination(
  revision: Revision,
  destination: Point
): Revision {
  return {
    ...revision,
    destination,
  }
}

export function setTile(
  revision: Revision,
  point: Point,
  tile: Tile
): Revision {
  const tileMap = revision.tileMap.map((row, z) =>
    row.map((oldTile, x) => (z === point.z && x === point.x ? tile : oldTile))
  )
  return {
    ...revision,
    tileMap,
  }
}

export function createRevision(revision: Revision): Revision {
  return {
    ...revision,
    version: revision.version + 1,
  }
}
