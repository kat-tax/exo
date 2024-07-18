import {useMemo} from 'react';
import {titleCase} from '_lib/string';

import type {PressableStateCallbackType} from 'react-native';

type VStyleSheet<S> = {[K in keyof S]: VStyleVar<S[K]>};
type VStyleVar<S> = (e?: PressableStateCallbackType) => S[];
type VStyleKey<S> = Extract<keyof S, string>;
type VStyleMod<S> = S[VStyleKey<S>];
type VStyleCond = (null | ((e?: PressableStateCallbackType) => boolean));

export type {VStyleSheet};

export function useVariants<S>(
  variants: Record<string, readonly string[]>,
  states: Record<string, string> = {},
  styles: S = {} as S,
): {
  vstyles: VStyleSheet<S>,
} {
  const isVState = (v: string): boolean => v.toLowerCase() === 'state';

  const buildStyles = (slug: VStyleKey<S>, styles: S) => {
    const vstyles: [VStyleCond, VStyleMod<S>][] = [[null, styles[slug]]];
    const vnames = Object.entries(variants).sort((a, b) => a[0].localeCompare(b[0]));
    // Sort and and loop through all vars
    vnames.forEach(([v1, primary]) => {
      // Single variant for this component
      if (vnames.length === 1) {
        // Loop through all values for the variant
        primary.forEach(v1v => {
          // Build id for this variant combination
          const vkey = `${slug}${titleCase(v1)}${v1v}` as VStyleKey<S>;
          // Look up the id in the stylesheet
          const vstyle = styles[vkey];
          // No specific style for this combo, skip
          if (!vstyle) return;
          // Create a condition for when to apply this variant combo style
          const vcond = (e?: PressableStateCallbackType): boolean => (
            // Test whether the current variant is the same as the value
            // or if the current variant is state and the pressable state matches the value
            // @ts-ignore TODO
            (states[v1] === v1v || (isVState(v1) ? e?.[v1v.toLowerCase()] : false))
          );
          // Add the variant combo style to styles
          vstyles.push([vcond, vstyle]);
        });
      // Multiple variants, create compound styles
      } else {
        // Prevent state from being used as primary variant (it's a secondary)
        if (isVState(v1)) return;
        // Loop through all values for the variant
        primary.forEach(v1v => {
          // For this value, loop all values of the other variants
          vnames.forEach(([v2, secondary]) => {
            if (v1 === v2) return;
            // Loop through all the values in the other variant
            secondary.forEach(v2v => {
              // Build id for this variant combination
              const vkey = `${slug}${titleCase(v1)}${v1v}${titleCase(v2)}${v2v}` as VStyleKey<S>;
              // Look up the id in the stylesheet
              const vstyle = styles[vkey];
              // No specific style for this combo, skip
              if (!vstyle) return;
              // Create a condition for when to apply this variant combo style
              const vcond = (e?: PressableStateCallbackType): boolean => (
                // Test whether the current variant is the same as the value
                // or if the current variant is state and the pressable state matches the value
                // @ts-ignore TODO
                (states[v1] === v1v || (isVState(v1) ? e?.[v1v.toLowerCase()] : false)) &&
                // @ts-ignore TODO
                (states[v2] === v2v || (isVState(v2) ? e?.[v2v.toLowerCase()] : false))
              );
              // Add the variant combo style to styles
              vstyles.push([vcond, vstyle]);
            });
          });
        });
      }
    });
    return vstyles;
  }

  const proxyStyles = (o: S): VStyleSheet<S> => {
    // Cache the styles for each variant combo as they are accessed
    const cache = new Map<string, ReturnType<typeof buildStyles>>();
    // Create empty object to proxy the styles, inherit types from stylesheet
    const proxy = {} as VStyleSheet<S>;
    // Loop through all the styles in the stylesheet
    for (const k in o) {
      // Create a function that is called when the style is accessed
      proxy[k] = (e?: PressableStateCallbackType) => {
        // Lookup styles in cache or build and cache
        let styles = cache.get(k);
        if (!styles) {
          styles = buildStyles(k, o);
          cache.set(k, styles);
        }
        // Return styles that match the current variant values and/or state
        return styles
          .filter(([c]) => c === null || c?.(e))
          .map(([,s]) => s);
      };
    }
    return proxy;
  };

  return {
    vstyles: useMemo(() => proxyStyles(styles), [styles]),
  };
}
