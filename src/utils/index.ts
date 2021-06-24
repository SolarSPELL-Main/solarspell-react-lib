import React from 'react';

/**
 * Creates a preventative EventHandler which also calls a function.
 * @param func The function to call.
 * @param stopPropagation Whether to call stopPropagation on the event.
 * @param preventDefault Whether to call preventDefault on the event.
 * @returns A function which will prevent an Event accordingly and then
 *          call another function.
 */
const preventEventFactory = (func: (() => void) | ((e: React.SyntheticEvent) => 
                      void), stopPropagation = true, preventDefault = true) => {
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
const preventEvent = (stopPropagation = true, preventDefault = true) => 
                                                  (e: React.SyntheticEvent) => {
  if (stopPropagation) {
    e.stopPropagation();
  }
  if (preventDefault) {
    e.preventDefault();
  }
};

export {
  preventEventFactory,
  preventEvent,
};
