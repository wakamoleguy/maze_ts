import { User } from '../entities/User'
import { isSome, Maybe } from '../Maybe'
import { InterfaceAdapter } from './Controller'

type EchoCallback = (message: string) => Promise<string>
type UserCreateCallback = (userId: string) => Promise<null>
type UserListCallback = () => Promise<User[]>

class ConsoleAdapter implements InterfaceAdapter {
  private echoListener: Maybe<EchoCallback> = null
  private userCreateListener: Maybe<UserCreateCallback> = null
  private userListListener: Maybe<UserListCallback> = null

  public onEcho = (callback: EchoCallback) => {
    this.echoListener = callback
  }
  public echo = (message: string) => {
    if (isSome(this.echoListener)) {
      return this.echoListener(message)
    }
  }
  public onUserCreate = (callback: UserCreateCallback) => {
    this.userCreateListener = callback
  }
  public userCreate = (userId: string) => {
    if (isSome(this.userCreateListener)) {
      return this.userCreateListener(userId)
    }
  }
  public onUserList = (callback: UserListCallback) => {
    this.userListListener = callback
  }
  public userList = () => {
    if (isSome(this.userListListener)) {
      return this.userListListener()
    }
  }
}

export default ConsoleAdapter
