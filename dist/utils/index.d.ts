import React from 'react';

/**
 * Creates a preventative EventHandler which also calls a function.
 * @param func The function to call.
 * @param stopPropagation Whether to call stopPropagation on the event.
 * @param preventDefault Whether to call preventDefault on the event.
 * @returns A function which will prevent an Event accordingly and then
 *          call another function.
 */
declare const preventEventFactory: (func: (() => void) | ((e: React.SyntheticEvent) => void), stopPropagation?: boolean, preventDefault?: boolean) => (e: React.SyntheticEvent) => void;
/**
 * Creates a preventative EventHandler.
 * @param stopPropagation Whether to call stopPropagation on the event.
 * @param preventDefault Whether to call preventDefault on the event.
 * @returns A function which will prevent an Event accordingly.
 */
declare const preventEvent: (stopPropagation?: boolean, preventDefault?: boolean) => (e: React.SyntheticEvent) => void;
/**
 * Forces evaluation of every item in an array.
 * @param array The array to evaluate.
 * @param callbackfn The evaluation function.
 * @returns Whether every item satisfies the evaluation function.
 */
declare const fullEvery: <T>(array: T[], callbackfn: (val: T, index: number, array: T[]) => boolean) => boolean;
export { preventEventFactory, preventEvent, fullEvery, };
