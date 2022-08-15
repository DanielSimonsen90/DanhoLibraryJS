"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const Events_1 = require("./Events");
/**
 * EventEmitter, but it stores state and handles state change with reducers
 *
 * @Initialization Actions & initial state must be defined in type parameters. InitialState must be provided in constructor, whereas reducer is optional.
 * The ActionType must have properties as strings and values as arrays.
 *
 * @HandlingActions Reducers can be added through constructor or using Store.on('action', reducer) or Store.once('action', reducer).
 * Every state change must return the next state, apart from 'stateChange', which returns void/any
 * Emit/Dispatch an action using Store.dispatch('action', ...args), ...args being the parameters from the ActionType.
 * Store.emit should NOT be used, as it doesn't update the Store's state.
 *
 * Reducer functions can be removed using Store.off('action', reducer);
 *
 * @borrows EventEmitter
 * @borrows Arrayable
 *
 * @example ```ts
 * import { Store } from 'danholibraryjs';
 *
 * type Todo = {
 *    id: string,
 *    text: string,
 *    completed: boolean
 * }
 *
 * type TodoActions = {
 *    create: [text: string],
 *    update: [id: string, text: string],
 *    toggleComplete: [id: string, force?: boolean],
 *    delete: [id: string],
 * }
 *
 * const store = new Store<Array<Todo>, TodoActions>(new Array<Todo>(), new Map([
 *    create: (state, text) => {
 *       return [...state, {
 *          id: Math.random().toString(),
 *          text,
 *          completed: false
 *      }];
 *    },
 *   toggleComplete: (state, id, force) => {
 *      const todo = state.find(todo => todo.id === id);
 *      if (!todo) return state;
 *
 *      return state.map(todo => (
 *          todo.id === id ? {
 *              ...todo,
 *              completed: force === undefined ? !todo.completed : force
 *          } : todo
 *      ));
 *   }
 * ]));
 *
 * store.on('delete', (state, id) => {
 *     return state.filter(todo => todo.id !== id);
 * });
 *
 * store.on('stateChange', (prevState, currentState) => console.log('State change', prevState, currentState));
 *
 * store.dispatch('create', 'Make store!');
 *
 * ```
 */
class Store extends Events_1.EventEmitter {
    constructor(state, actions = {}) {
        super(new Map(...Object.entries(actions).map(([action, reducers]) => [action, reducers])));
        this._state = state;
    }
    _state;
    get state() {
        return this._state;
    }
    dispatch(action, ...args) {
        const previous = { ...this._state };
        this._state = super.emit(action, ...args).reduce((state, returned) => ({ ...state, ...returned }), this.state);
        super.emit('stateChange', ...[previous, this.state]);
        return this.state;
    }
}
exports.Store = Store;
exports.default = Store;
