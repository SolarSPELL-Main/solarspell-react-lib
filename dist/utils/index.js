/**
 * Creates a preventative EventHandler which also calls a function.
 * @param func The function to call.
 * @param stopPropagation Whether to call stopPropagation on the event.
 * @param preventDefault Whether to call preventDefault on the event.
 * @returns A function which will prevent an Event accordingly and then
 *          call another function.
 */
const preventEventFactory = (func, stopPropagation = true, preventDefault = true) => {
    const preventEvent_ = preventEvent(stopPropagation, preventDefault);
    return (e) => {
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
const preventEvent = (stopPropagation = true, preventDefault = true) => (e) => {
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
const fullEvery = (array, callbackfn) => {
    return !array.map(callbackfn).includes(false);
};
export { preventEventFactory, preventEvent, fullEvery, };
