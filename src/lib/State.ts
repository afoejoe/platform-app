import Level from './Level';
import { StartActor, Status } from './types';
import { overlap } from './utils';

class State {
  constructor(
    public level: Level,
    public actors: StartActor[],
    public status: Status,
  ) {}

  static start(level: Level) {
    return new State(level, level.startActors as StartActor[], Status.playing);
  }

  get Player() {
    return this.actors
      .filter((item) => item)
      .find((a) => {
        return a.type === 'player';
      });
  }

  update(time: number, keys: any) {
    const actors = this.actors.map((actor) => {
      return actor ? actor.update(time, this, keys) : actor;
    });
    let newState = new State(this.level, actors, this.status);

    if (newState.status !== Status.playing) {
      return newState;
    }

    const player = newState.Player;
    // @ts-ignore
    if (this.level.touches(player?.pos, player?.size, 'lava')) {
      return new State(this.level, actors, Status.lost);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const actor of actors) {
      if (
        actor !== player &&
        overlap(actor as StartActor, player as StartActor)
      ) {
        newState = actor.collide(newState);
      }
    }
    return newState;
  }
}

export default State;
export type TState = typeof State;
