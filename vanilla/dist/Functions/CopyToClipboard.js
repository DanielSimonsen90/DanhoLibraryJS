"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyToClipboard = void 0;
/**
 * Copies value to clipboard and alerts a response, if response is defined
 * @param value Value to clipboard
 * @param response Alerts if response is given
 */
async function CopyToClipboard(value, response) {
    await navigator.clipboard.writeText(value);
    if (response)
        alert(response);
}
exports.CopyToClipboard = CopyToClipboard;
exports.default = CopyToClipboard;
