import React from 'react';

/**
 * Creates a preventative EventHandler which also calls a function.
 * @param func The function to call.
 * @param stopPropagation Whether to call stopPropagation on the event.
 * @param preventDefault Whether to call preventDefault on the event.
 * @returns A function which will prevent an Event accordingly and then
 *          call another function.
 */
const preventEventFactory = (
  func: (() => void) | ((e: React.SyntheticEvent) => void),
  stopPropagation = true,
  preventDefault = true,
): ((e: React.SyntheticEvent) => void) => {
  const preventEvent_ = preventEvent(stopPropagation, preventDefault);
  return (e: React.SyntheticEvent) => {
    preventEvent_(e);
    func(e);
  };
};

/**
 * Creates a preventative EventHandler.
 * @param stopPropagation Whether to call stopPropagation on the event.
 * @param preventDefault Whether to call preventDefault on the event.
 * @returns A function which will prevent an Event accordingly.
 */
const preventEvent = (
  stopPropagation = true,
  preventDefault = true,
) => (e: React.SyntheticEvent): void => {
  if (stopPropagation) {
    e.stopPropagation();
  }
  if (preventDefault) {
    e.preventDefault();
  }
};

/**
 * Forces evaluation of every item in an array.
 * @param array The array to evaluate.
 * @param callbackfn The evaluation function.
 * @returns Whether every item satisfies the evaluation function.
 */
const fullEvery = <T>(
  array: T[],
  callbackfn: (val: T, index: number, array: T[]) => boolean,
): boolean => {
  return !array.map(callbackfn).includes(false);
};

export {
  preventEventFactory,
  preventEvent,
  fullEvery,
};
