export function isInputFocused() {
  if (!__WEB__) return false;
  if (!(document.activeElement instanceof HTMLElement)) return false;
  return document.activeElement instanceof HTMLInputElement ||
    document.activeElement instanceof HTMLTextAreaElement;
}
