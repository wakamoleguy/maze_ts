import { Request, Response } from 'express'
import { User } from '../entities/User'
import { isNone, Maybe } from '../Maybe'
import { InterfaceAdapter } from './Controller'

type EchoCallback = (message: string) => Promise<string>
type UserCreateCallback = (userId: string) => Promise<null>
type UserListCallback = () => Promise<User[]>

class ExpressAdapter implements InterfaceAdapter {
  private echoListener: Maybe<EchoCallback> = null
  private userCreateListener: Maybe<UserCreateCallback> = null
  private userListListener: Maybe<UserListCallback> = null

  public onEcho = (callback: EchoCallback) => {
    this.echoListener = callback
  }
  public echo = async (req: Request, res: Response) => {
    if (isNone(this.echoListener)) {
      return
    }

    const data = (req.query && (req.query.echo as string)) || ''
    const response = await this.echoListener(data)
    res.send(response)
  }
  public onUserCreate = (callback: UserCreateCallback) => {
    this.userCreateListener = callback
  }
  public userCreate = (userId: string) => {
    if (isNone(this.userCreateListener)) {
      return
    }
    return this.userCreateListener(userId)
  }
  public onUserList = (callback: UserListCallback) => {
    this.userListListener = callback
  }
  public userList = () => {
    if (isNone(this.userListListener)) {
      return
    }
    return this.userListListener()
  }
}

export default ExpressAdapter
