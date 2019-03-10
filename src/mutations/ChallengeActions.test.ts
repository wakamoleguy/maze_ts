import { Revision } from '../entities/Revision'
import { User } from '../entities/User'
import { isNone } from '../Maybe'
import { acceptChallenge, createChallenge, postTime } from './ChallengeActions'

const CHALLENGER: User = { id: 'challenger' }
const DEFENDER: User = { id: 'defender' }

const CHALLENGER_REVISION: Revision = {
  maze: {
    creator: CHALLENGER,
  },
} as Revision
const DEFENDER_REVISION: Revision = {} as Revision

describe('ChallengeActions', () => {
  describe('createChallenge', () => {
    it('challenges the given user with the given revision', () => {
      const challenge = createChallenge(DEFENDER, CHALLENGER_REVISION)

      expect(challenge.challenger).toBe(CHALLENGER)
      expect(challenge.defender).toBe(DEFENDER)
      expect(challenge.challengerRevision).toBe(CHALLENGER_REVISION)
    })

    it('does not set the defender maze or any time yet', () => {
      const challenge = createChallenge(DEFENDER, CHALLENGER_REVISION)

      expect(isNone(challenge.defenderRevision)).toBe(true)
      expect(isNone(challenge.challengerRunTime)).toBe(true)
      expect(isNone(challenge.defenderRunTime)).toBe(true)
    })
  })

  describe('acceptChallenge', () => {
    const challenge = createChallenge(DEFENDER, CHALLENGER_REVISION)

    it('adds the defender maze to the challenge', () => {
      const accepted = acceptChallenge(challenge, DEFENDER_REVISION)
      expect(accepted.defenderRevision).toBe(DEFENDER_REVISION)
    })

    it('preserves challenger info', () => {
      const accepted = acceptChallenge(challenge, DEFENDER_REVISION)
      expect(accepted.challenger).toBe(CHALLENGER)
      expect(accepted.defender).toBe(DEFENDER)
      expect(accepted.challengerRevision).toBe(CHALLENGER_REVISION)
    })

    it('leaves runtimes unset', () => {
      const accepted = acceptChallenge(challenge, DEFENDER_REVISION)
      expect(isNone(accepted.challengerRunTime)).toBe(true)
      expect(isNone(accepted.defenderRunTime)).toBe(true)
    })

    it('does not mutate the original challenge object', () => {
      const accepted = acceptChallenge(challenge, DEFENDER_REVISION)
      expect(accepted).not.toBe(challenge)
    })
  })

  describe('postTime', () => {
    const challenge = acceptChallenge(
      createChallenge(DEFENDER, CHALLENGER_REVISION),
      DEFENDER_REVISION
    )

    it('updates challenger run time when the challenger posts their time', () => {
      const posted = postTime(challenge, CHALLENGER, 100)
      expect(posted.challengerRunTime).toBe(100)
      expect(isNone(posted.defenderRunTime)).toBe(true)
    })

    it('updates defender run time when the defender posts their time', () => {
      const posted = postTime(challenge, DEFENDER, 101)
      expect(posted.defenderRunTime).toBe(101)
      expect(isNone(posted.challengerRunTime)).toBe(true)
    })

    it('does not mutate the original challenge', () => {
      const posted = postTime(challenge, DEFENDER, 101)
      expect(posted).not.toBe(challenge)
    })

    it('can update both times in challenger-first order', () => {
      const posted = postTime(challenge, CHALLENGER, 102)
      const bothPosted = postTime(posted, DEFENDER, 103)
      expect(bothPosted.challengerRunTime).toBe(102)
      expect(bothPosted.defenderRunTime).toBe(103)
    })

    it('can update both times in defender-first order', () => {
      const posted = postTime(challenge, DEFENDER, 110)
      const bothPosted = postTime(posted, CHALLENGER, 120)
      expect(bothPosted.challengerRunTime).toBe(120)
      expect(bothPosted.defenderRunTime).toBe(110)
    })

    it('throws when some other user posts their time', () => {
      const spectator = { id: 'spectator' }
      expect(() => postTime(challenge, spectator, 100)).toThrow()
    })
  })
})
