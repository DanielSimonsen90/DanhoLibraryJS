"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpatchAll = exports.unpatch = exports.patch = void 0;
const PATCHES = new Map();
function patch(target, property, event, replacement) {
    if (!target || !property || !replacement)
        return;
    else if (!(property in target))
        throw Error(`Property "${String(property)}" does not exist on target`);
    const original = target[property];
    if (!PATCHES.has(target))
        PATCHES.set(target, new Map());
    const targetPatches = PATCHES.get(target);
    if (!targetPatches.has(property))
        targetPatches.set(property, []);
    const unpatch = (() => {
        if (typeof original === 'function') {
            switch (event) {
                case 'before': {
                    target[property] = function (...args) {
                        const updatedArgs = replacement.apply(target, args);
                        return original.apply(target, updatedArgs || args);
                    };
                    break;
                }
                case 'instead': {
                    target[property] = function (...args) {
                        return replacement.apply(target, args);
                    };
                    break;
                }
                case 'after': {
                    target[property] = function (...args) {
                        const result = original.apply(target, args);
                        replacement.apply(target, args);
                        return result;
                    };
                    break;
                }
            }
            return () => target[property] = original;
        }
        else {
            let currentValue = target[property];
            const propertyDescriptor = Object.getOwnPropertyDescriptor(target, property);
            const valuePatch = (update) => {
                update ??= currentValue;
                const result = event !== 'after' ? replacement(currentValue, update) || currentValue : currentValue;
                if (event === 'after')
                    replacement(currentValue, update);
                return result;
            };
            Object.defineProperty(target, property, {
                get: () => valuePatch(),
                set: valuePatch,
            });
            return () => Object.defineProperty(target, property, propertyDescriptor);
        }
    })();
    targetPatches.get(property).push({ event, replacement, original, unpatch });
    return unpatch;
}
exports.patch = patch;
function unpatch(target, property) {
    const targetPatches = PATCHES.get(target);
    if (!targetPatches?.has(property))
        return;
    targetPatches.get(property).forEach(patch => patch.unpatch());
    targetPatches.delete(property);
}
exports.unpatch = unpatch;
function unpatchAll() {
    PATCHES.forEach(properties => {
        properties.forEach(patches => {
            patches.forEach(patch => patch.unpatch());
        });
    });
    PATCHES.clear();
}
exports.unpatchAll = unpatchAll;
