import { v4 } from 'uuid'
import { Maze } from '../entities/Maze'
import { Revision, StartPoint } from '../entities/Revision'
import { User } from '../entities/User'

const SIZE = 15

export function createMaze(user: User): Revision {
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
