import { Maybe } from '../Maybe'
import { Revision } from './Maze'
import { User } from './User'

export interface Challenge {
  challenger: User
  challengerRevision: Revision
  challengerRunTime: Maybe<number>
  defender: User
  defenderRevision: Maybe<Revision>
  defenderRunTime: Maybe<number>
}

export function create(
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

export function accept(
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
