import { Challenge } from '../entities/Challenge'
import { Revision } from '../entities/Revision'
import { User } from '../entities/User'

export function createChallenge(
  defender: User,
  challengerRevision: Revision
): Challenge {
  const challenge = {
    challenger: challengerRevision.maze.creator,
    challengerRevision,
    challengerRunTime: null,
    defender,
    defenderRevision: null,
    defenderRunTime: null,
  }

  return challenge
}
