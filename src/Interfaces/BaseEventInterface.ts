/**
 * Default eventhandler mapper. EventEmitter.on(keyof this, this[keyof this])
 */
// export type BaseEvent<Keys extends string | number | symbol, Types extends Array<any>> = Record<Keys, Types>;
export type BaseEvent<Keys extends string, Types extends Array<any>> = Record<Keys, Types>;
export default BaseEvent;