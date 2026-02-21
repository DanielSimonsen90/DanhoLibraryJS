/**
 * Item is single or multiple
 */
export type Arrayable<T> = T | Array<T>;

export type SingleArrayable<T> = T | [T];
export type TFromArray<T> = T extends Array<infer U> ? U : never;