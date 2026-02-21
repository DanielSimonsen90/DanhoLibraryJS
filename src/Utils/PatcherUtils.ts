type PatchEvent = 'before' | 'instead' | 'after';
type PatcherReplacement<TTarget extends object, TProperty extends keyof TTarget, TPatchEvent extends PatchEvent> = (
  TPatchEvent extends 'before' 
    ? TTarget[TProperty] extends (...args: infer TArgs) => any 
      ? (...args: TArgs) => TArgs | void
      : (current: TTarget[TProperty], update: TTarget[TProperty]) => TTarget[TProperty] | void
    : TPatchEvent extends 'instead'
      ? TTarget[TProperty] extends (...args: infer TArgs) => infer TReturn
        ? (...args: TArgs) => TReturn
        : (current: TTarget[TProperty], update: TTarget[TProperty]) => TTarget[TProperty]
    : TTarget[TProperty] extends (...args: infer TArgs) => any
      ? (...args: TArgs) => void
      : (previous: TTarget[TProperty], updated: TTarget[TProperty]) => void
)

type Patch = {
  event: PatchEvent;
  replacement: any;
  original: any;
  unpatch: () => void;
}
const PATCHES = new Map<object, Map<string | symbol | number, Array<Patch>>>();

export function patch<
  TTarget extends object,
  TProperty extends keyof TTarget,
  TPatchEvent extends PatchEvent,
  TPatchReplacement extends PatcherReplacement<TTarget, TProperty, TPatchEvent>
>(target: TTarget, property: TProperty, event: TPatchEvent, replacement: TPatchReplacement) {
  if (!target || !property || !replacement) return;
  else if (!(property in target)) throw Error(`Property "${String(property)}" does not exist on target`);

  const original = target[property];
  if (!PATCHES.has(target)) PATCHES.set(target, new Map());
  const targetPatches = PATCHES.get(target)!;

  if (!targetPatches.has(property)) targetPatches.set(property, []);

  const unpatch = (() => {
    if (typeof original === 'function') {
      switch (event) {
        case 'before': {
          target[property] = function (...args: any[]) {
            const updatedArgs = (replacement as any).apply(target, args);
            return (original as any).apply(target, updatedArgs || args);
          } as TTarget[TProperty];
          break;
        }
        case 'instead': {
          target[property] = function (...args: any[]) {
            return (replacement as any).apply(target, args);
          } as TTarget[TProperty];
          break;
        }
        case 'after': {
          target[property] = function (...args: any[]) {
            const result = (original as any).apply(target, args);
            (replacement as any).apply(target, args);
            return result;
          } as TTarget[TProperty];
          break;
        }
      }
  
      return () => target[property] = original;
    } else {
      let currentValue = target[property];
      const propertyDescriptor = Object.getOwnPropertyDescriptor(target, property);

      const valuePatch = (update?: TTarget[TProperty]) => {
        update ??= currentValue;
        const result = event !== 'after' ? (replacement as any)(currentValue, update) || currentValue : currentValue;
        
        if (event === 'after') (replacement as any)(currentValue, update);
  
        return result;
      }
  
      Object.defineProperty(target, property, {
        get: () => valuePatch(),
        set: valuePatch,
      });
  
      return () => Object.defineProperty(target, property, propertyDescriptor!);
    }
  })();

  targetPatches.get(property)!.push({ event, replacement, original, unpatch });
  return unpatch;
}

export function unpatch<
  TTarget extends object,
  TProperty extends keyof TTarget
>(target: TTarget, property: TProperty) {
  const targetPatches = PATCHES.get(target);
  if (!targetPatches?.has(property)) return;

  targetPatches.get(property)!.forEach(patch => patch.unpatch());
  targetPatches.delete(property);
}

export function unpatchAll() {
  PATCHES.forEach(properties => {
    properties.forEach(patches => {
      patches.forEach(patch => patch.unpatch());
    });
  });
  
  PATCHES.clear();
}