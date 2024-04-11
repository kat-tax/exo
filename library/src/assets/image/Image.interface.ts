import type {ImageStyle, StyleProp} from 'react-native';

export type ImageComponent = (props: ImageProps) => JSX.Element;

export interface ImageProps {
  /** URL of the image */
  url: string,
  /** Width of the image */
  width?: number,
  /** Height of the image */
  height?: number,
  /** Style of the image */
  style?: StyleProp<ImageStyle> | undefined,
  /** A base64 encoded thumbhash of the image */
  thumbhash?: string,
  /** A base64 encoded image to show when the image fails to load */
  failureImage?: string,
  /** Resize mode of the image */
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  /** Duration of the transition animation in seconds, defaults to 0.75 */
  transitionDuration?: number,
  /** Show activity indicator while loading, overrides placeholder. Defaults to false */
  showActivityIndicator?: boolean,
  /** Enable progressive loading, defaults to false */
  progressiveLoadingEnabled?: boolean,
  /** Border radius of the image */
  borderRadius?: number,
  /** Caching policy:
   * 'discWithCacheControl' caches the image in the disc and uses the cache control headers.
   * 'discNoCacheControl' will cache the image in the disc and never re-fetch it.
   * 'memory' uses the default platform caching policy with no explicit saving to disk.
   * @default memory
   */
  cachePolicy?: 'memory' | 'discWithCacheControl' | 'discNoCacheControl',
  /** Callback for when the image loads successfully */
  onSuccess?: (result: {
    nativeEvent: {
      width: number,
      height: number,
      source: string,
    },
  }) => void,
  /** Callback for when an error occurs */
  onError?: (result: {
    nativeEvent: {
      error: string,
    }
  }) => void,
}
