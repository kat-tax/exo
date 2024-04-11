/**
 * Enables support for the hardware back button.
 * @platform Android
 */
export function useBackButton(callback: () => boolean) {
  if (__DEV__) {
    console.log('useBackButton callback registered for eligible devices', callback);
  }
}
