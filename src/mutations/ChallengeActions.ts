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

export function acceptChallenge(
  challenge: Challenge,
  defenderRevision: Revision
): Challenge {
  return {
    ...challenge,
    defenderRevision,
  }
}

export function postTime(
  challenge: Challenge,
  user: User,
  time: number
): Challenge {
  if (user.id === challenge.defender.id) {
    return {
      ...challenge,
      defenderRunTime: time,
    }
  } else if (user.id === challenge.challenger.id) {
    return {
      ...challenge,
      challengerRunTime: time,
    }
  } else {
    throw new Error('Nonparticipant cannot post time to challenge')
  }
}
