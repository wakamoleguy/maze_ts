import { User } from '../entities/User'
import {
  create,
  createRevision,
  setDestination,
  setStart,
  setTile,
  StartPoint,
  Tile,
} from './Maze'

const WAKA: User = { id: 'wakamoleguy' }

describe('Maze', () => {
  describe('create', () => {
    const revision = create(WAKA)

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

  describe('setStart', () => {
    it('returns a new revision', () => {
      const initial = create(WAKA)
      const newStart: StartPoint = { x: 5, z: 5, direction: 'north' }
      const revised = setStart(initial, newStart)
      expect(revised).not.toBe(initial)
    })

    it('updates the start point', () => {
      const initial = create(WAKA)
      const newStart: StartPoint = { x: 5, z: 5, direction: 'north' }
      const revised = setStart(initial, newStart)
      expect(revised.start).toEqual(newStart)
    })
  })

  describe('setDestination', () => {
    it('returns a new revision', () => {
      const initial = create(WAKA)
      const newDestination = { x: 5, z: 5 }
      const revised = setDestination(initial, newDestination)
      expect(revised).not.toBe(initial)
    })
    it('returns a new revision', () => {
      const initial = create(WAKA)
      const newDestination = { x: 5, z: 5 }
      const revised = setDestination(initial, newDestination)
      expect(revised.destination).toEqual(newDestination)
    })
  })

  describe('setTile', () => {
    it('returns a new revision', () => {
      const initial = create(WAKA)
      const coords = { x: 5, z: 5 }
      const revised = setTile(initial, coords, 1)
      expect(revised).not.toBe(initial)
    })

    it('sets the tile at the coordinate', () => {
      const initial = create(WAKA)
      const coords = { x: 5, z: 5 }
      let revised = setTile(initial, coords, 0)
      expect(revised.tileMap[coords.z][coords.x]).toBe(0)
      revised = setTile(initial, coords, 1)
      expect(revised.tileMap[coords.z][coords.x]).toBe(1)
    })

    it('leaves all other locations the same', () => {
      const initial = create(WAKA)
      const coords = { x: 5, z: 5 }
      const revised = setTile(initial, coords, 1)
      revised.tileMap.forEach((row: Tile[], z) =>
        row.forEach((tile: Tile, x) => {
          if (z !== coords.z || x !== coords.x) {
            expect(tile).toEqual(initial.tileMap[z][x])
          }
        })
      )
    })
  })

  describe('createRevision', () => {
    it('returns a new revision', () => {
      const initial = create(WAKA)
      const draft = createRevision(initial)
      expect(draft).not.toBe(initial)
    })

    it('matches the old revision in most ways', () => {
      const initial = create(WAKA)
      const draft = createRevision(initial)
      expect(draft.maze).toBe(initial.maze)
      expect(draft.start).toBe(initial.start)
      expect(draft.destination).toBe(initial.destination)
      expect(draft.tileMap).toBe(initial.tileMap)
    })

    it('increments the version number', () => {
      const initial = create(WAKA)
      const firstDraft = createRevision(initial)
      const secondDraft = createRevision(firstDraft)

      expect(initial.version).toBe(0)
      expect(firstDraft.version).toBe(1)
      expect(secondDraft.version).toBe(2)
    })
  })
})
