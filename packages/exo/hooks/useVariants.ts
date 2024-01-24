import {useMemo} from 'react';
import {titleCase} from '../utils/string';

import type {PressableStateCallbackType} from 'react-native';

type VStyles<S> = {[K in keyof S]: VStyle<S[K]>};
type VStyle<S> = (e?: PressableStateCallbackType) => S[];
type VStyleKey<S> = Extract<keyof S, string>;
type VStyleMod<S> = S[VStyleKey<S>];
type VStyleCond = (null | ((e?: PressableStateCallbackType) => boolean));
type VColors = Record<string, string>;

export function useVariants<S,T>(
  variants: Record<string, readonly string[]>,
  options: {
    current: Record<string, string>,
    design: {styles: S, theme: T},
  }
): {
  vstyles: VStyles<S>,
  vcolors: VColors,
} {
  const isVState = (v: string): boolean => v.toLowerCase() === 'state';

  const buildStyles = (slug: VStyleKey<S>, styles: S) => {
    const vstyles: [VStyleCond, VStyleMod<S>][] = [[null, styles[slug]]];
    const vnames = Object.entries(variants).sort((a, b) => a[0].localeCompare(b[0]));
    // Sort and and loop through all variants
    vnames.forEach(([v1, primary]) => {
      // Prevent state from being used as primary variant
      if (isVState(v1) && vnames.length > 1) return;
      // Loop through all values for the variant
      primary.forEach(v1v => {
        // For this value, loop all values of the other variants
        vnames.forEach(([v2, secondary]) => {
          if (v1 === v2) return;
          // Loop through all the values in the other variants
          secondary.forEach(v2v => {
            // Build identifier for this variant combo
            const vkey = `${slug}${titleCase(v1)}${v1v}${titleCase(v2)}${v2v}` as VStyleKey<S>;
            // Look up the style for this variant combo
            const vstyle = styles[vkey];
            // No specific style for this variant combo, skip
            if (!vstyle) return;
            // Create a condition for when to apply this variant style
            const vcond = (e?: PressableStateCallbackType): boolean => (
              // Test whether the current variant is the same as the value
              // or if the current variant is state and the pressable state matches the value
              (options.current[v1] === v1v || (isVState(v1) ? e?.[v1v.toLowerCase()] : false)) &&
              (options.current[v2] === v2v || (isVState(v2) ? e?.[v2v.toLowerCase()] : false))
            );
            vstyles.push([vcond, vstyle]);
          });
        });
      });
    });
    return vstyles;
  }

  // TODO
  const buildColors = (theme: T): VColors => {
    const colors = {} as VColors;
    return colors; 
  };

  const proxyStyles = (o: S): VStyles<S> => {
    // Cache the styles for each variant combo as they are accessed
    const cache = new Map<string, ReturnType<typeof buildStyles>>();
    // Create empty object to proxy the styles, inherit types from stylesheet
    const proxy = {} as VStyles<S>;
    // Loop through all the styles in the stylesheet
    for (const key in o) {
      // Create a function that is called when the style is accessed
      proxy[key] = (e?: PressableStateCallbackType) => {
        // Lookup styles in cache or build and cache
        let styles = cache.get(key);
        if (!styles) {
          styles = buildStyles(key, o);
          cache.set(key, styles);
        }
        // Return styles that match the current variant values and/or state
        return styles
          .filter(([cond]) => cond === null || cond?.(e))
          .map(([,style]) => style);
      };
    }
    return proxy;
  };

  return {
    vstyles: useMemo(() => proxyStyles(options.design.styles), [options.design]),
    vcolors: useMemo(() => buildColors(options.design.theme), [options.design])
  };
}
