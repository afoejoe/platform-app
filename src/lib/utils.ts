/* eslint-disable no-param-reassign */
import { RefObject } from 'react';
import { SCALE } from './const';
import State from './State';
import { StartActor } from './types';

export default function classNames(
  ...classes: (false | null | undefined | string)[]
) {
  return classes.filter(Boolean).join(' ');
}

export function elt(name: string, attrs: any, ...children: any[]) {
  const el = document.createElement(name);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value as string);
  });

  children.forEach((child) => {
    el.appendChild(
      typeof child === 'string' ? document.createTextNode(child) : child,
    );
  });

  return el;
}

export function overlap(actor1: StartActor, actor2: StartActor) {
  // console.log({
  //   actor1,
  //   actor2,
  // });
  if (!actor1 || !actor2) return false;

  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

export const scrollPlayerIntoView = (
  state: State,
  gameWrapper: RefObject<HTMLDivElement>,
) => {
  if (gameWrapper.current === null) return;
  const width = gameWrapper.current.clientWidth;
  const height = gameWrapper.current.clientHeight;
  const margin = width / 3;

  // The viewport
  const left = gameWrapper.current.scrollLeft;
  const right = left + width;
  const top = gameWrapper.current.scrollTop;
  const bottom = top + height;

  const { Player } = state;
  const center = Player?.pos.plus(Player.size.times(0.5)).times(SCALE) || {
    x: 0,
    y: 0,
  };

  if (center.x < left + margin) {
    gameWrapper.current.scrollLeft = center.x - margin;
  } else if (center.x > right - margin) {
    gameWrapper.current.scrollLeft = center.x + margin - width;
  }
  if (center.y < top + margin) {
    gameWrapper.current.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    gameWrapper.current.scrollTop = center.y + margin - height;
  }
};
