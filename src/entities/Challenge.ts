import { Maybe } from '../Maybe'
import { Revision } from './Revision'
import { User } from './User'

export interface Challenge {
  challenger: User
  challengerRevision: Revision
  challengerRunTime: Maybe<number>
  defender: User
  defenderRevision: Maybe<Revision>
  defenderRunTime: Maybe<number>
}
