import type {ImageStyle, ImageResizeMode} from 'react-native';

export interface ImageProps {
  /** URL of the image */
  url: string,
  /** Style of the image */
  style: ImageStyle,
  /** Blurhash of the image (base64 encoded) */
  blurhash?: string,
  /** Thumbhash of the image (base64 encoded) */
  thumbhash?: string,
  /** Image to show when the image fails to load, pass blurhash, thumbhash or base64 encoded image */
  failureImage?: string,
  /** Resize mode of the image */
  resizeMode?: ImageResizeMode,
  /** Duration of the transition animation in seconds, defaults to 0.75 */
  transitionDuration?: number,
  /** Show activity indicator while loading, overrides placeholder. Defaults to false */
  showActivityIndicator?: boolean,
  /** Enable progressive loading, defaults to false */
  progressiveLoadingEnabled?: boolean,
  /** Rounds the image into a circle, defaults to false */
  rounded?: boolean,
  /** Cache [policy](https://kean-docs.github.io/nuke/documentation/nuke/imagepipeline).
   * Defaults to 'memory'. 'discWithCacheControl' will cache the image in the disc and
   * use the cache control headers to determine if the image should be re-fetched.
   * 'discNoCacheControl' will cache the image in the disc and never re-fetch it.
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
