/**
 * Copies value to clipboard and alerts a response, if response is defined
 * @param value Value to clipboard
 * @param response Alerts if response is given
 */
export declare function CopyToClipboard(value: string, response?: string): Promise<void>;
export default CopyToClipboard;
