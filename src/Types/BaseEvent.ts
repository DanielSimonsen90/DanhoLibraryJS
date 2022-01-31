/**
 * Default eventhandler mapper. Object with properties that are arrays
 */
export type BaseEvent<Keys extends string, Types extends Array<any>> = Record<Keys, Types>;
export default BaseEvent;