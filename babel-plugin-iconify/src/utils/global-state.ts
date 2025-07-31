import type * as i from '@iconify/react/dist/iconify.js';

/**
 * Core state maps for tracking loaded icons and cached data
 */
export const loadedIcons: Map<string, boolean> = new Map();
export const iconJsonCache: Map<string, i.IconifyJSON> = new Map();

/**
 * Global state shared across all plugin instances to ensure
 * consistent icon extraction across the entire codebase
 */
export const globalIcons: Record<string, Set<string>> = {};
export const globalSets: Set<string> = new Set<string>();
export let isInitialized: boolean = false;

/**
 * Track pending fetch operations to prevent duplicate requests
 */
export const pendingFetches: Map<string, Promise<i.IconifyJSON>> = new Map<string, Promise<i.IconifyJSON>>();

/**
 * Mark the plugin as initialized
 */
export function markInitialized(): void {
  isInitialized = true;
}

/**
 * Add an icon to the global registry
 */
export function addIcon(prefix: string, name: string): void {
  if (!globalIcons[prefix]) {
    globalIcons[prefix] = new Set<string>();
  }
  globalIcons[prefix].add(name);
  globalSets.add(prefix);
}

/**
 * Get all icons for a given prefix that haven't been loaded yet
 */
export function getUnloadedIcons(prefix: string, loadedIcons: Map<string, boolean>): string[] {
  if (!globalIcons[prefix]) return [];
  return Array.from(globalIcons[prefix]).filter(name => !loadedIcons.has(`${prefix}:${name}`));
}


