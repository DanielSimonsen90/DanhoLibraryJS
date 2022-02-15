export type BetterOmit<Type, Properties extends keyof Type> = Omit<Type, Properties>;
export type BetterExtract<From, Properties extends From> = Extract<From, Properties>;