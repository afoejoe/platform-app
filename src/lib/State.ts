import Level from './Level';
import { StartActor, Status } from './types';

class State {
  constructor(public level: Level, public actors: StartActor[], public status: Status) {}

  static start(level: Level) {
    return new State(level, level.startActors as StartActor[], Status.playing);
  }

  get Player() {
    return this.actors.find((a) => a.type === 'player');
  }
}

export default State;
export type TState = typeof State;
