import {cloneElement} from 'react';
import {StyleSheet} from 'react-native';

/**
 * Clones an icon with the given icon styles
 * @param icon The icon element to clone
 * @param styles The styles to apply to the icon
 * @returns A new react element with the given styles
 */
export function createIcon(icon?: React.ReactElement, styles?: StyleSheet.NamedStyles<object>) {
  if (!icon) return null;
  return cloneElement(icon, StyleSheet.flatten(styles));
}

