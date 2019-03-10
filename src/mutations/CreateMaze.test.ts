import { Tile } from '../entities/Revision'
import { User } from '../entities/User'

import { createMaze } from './CreateMaze'

const WAKA: User = { id: 'wakamoleguy' }

describe('CreateMaze', () => {
  const revision = createMaze(WAKA)

  it('returns a new revision of size 15', () => {
    expect(revision.maze.size).toBe(15)
    expect(revision.tileMap.length).toBe(15)
    revision.tileMap.forEach((row: Tile[]) => {
      expect(row.length).toBe(15)
    })
  })

  it('sets the start point to top left corner', () => {
    expect(revision.start).toEqual({
      direction: 'east',
      x: 1,
      z: 1,
    })
  })

  it('sets the exit to the top left corner', () => {
    expect(revision.destination).toEqual({
      x: 1,
      z: 0,
    })
  })

  it('sets the entire map to empty floor', () => {
    revision.tileMap.forEach((row: Tile[]) =>
      row.forEach((tile: Tile) => {
        expect(tile).toBe(0)
      })
    )
  })

  it('sets version number to 0', () => {
    expect(revision.version).toBe(0)
  })

  describe('the new maze', () => {
    it('is created by the given user', () => {
      expect(revision.maze.creator).toEqual(WAKA)
    })

    it('has a default name', () => {
      expect(revision.maze.name).toBe('Untitled Maze')
    })

    it('has an id', () => {
      expect(revision.maze.id).toBeDefined()
    })
  })
})
