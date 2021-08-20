/**
 * Copies value to clipboard and alerts a response, if response is defined
 * @param value Value to clipboard
 * @param response Alerts if response is given
 */
 export async function CopyToClipboard(value: string, response?: string) {
    await navigator.clipboard.writeText(value);
    if (response) alert(response);
}
export default CopyToClipboard;