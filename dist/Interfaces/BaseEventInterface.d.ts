/**
 * Default eventhandler mapper. EventEmitter.on(keyof this, this[keyof this])
 */
export interface BaseEvent {
    error: [err: Error];
}
export default BaseEvent;
