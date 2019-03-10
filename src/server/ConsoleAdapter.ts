import { Map } from 'immutable'
import { Maybe } from '../Maybe'

type Callback = (message: string) => Promise<Maybe<string>>
const noop: Callback = () => Promise.resolve(null)

class ConsoleAdapter {
  private listeners = Map<string, Callback>()

  public on(action: string, callback: Callback): void {
    this.listeners = this.listeners.set(action, callback)
  }

  public emit(action: string, message: string) {
    return this.listeners.get(action, noop)(message)
  }
}

export default ConsoleAdapter
