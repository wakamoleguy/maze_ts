import { Revision } from '../entities/Revision'
import { User } from '../entities/User'
import { isNone } from '../Maybe'
import { createChallenge } from './CreateChallenge'

const CHALLENGER: User = { id: 'challenger' }
const DEFENDER: User = { id: 'defender' }

const REVISION: Revision = {
  maze: {
    creator: CHALLENGER,
  },
} as Revision

describe('CreateChallenge', () => {
  it('challenges the given user with the given revision', () => {
    const challenge = createChallenge(DEFENDER, REVISION)

    expect(challenge.challenger).toBe(CHALLENGER)
    expect(challenge.defender).toBe(DEFENDER)
    expect(challenge.challengerRevision).toBe(REVISION)
  })

  it('does not set the defender maze or any time yet', () => {
    const challenge = createChallenge(DEFENDER, REVISION)

    expect(isNone(challenge.defenderRevision)).toBe(true)
    expect(isNone(challenge.challengerRunTime)).toBe(true)
    expect(isNone(challenge.defenderRunTime)).toBe(true)
  })
})
