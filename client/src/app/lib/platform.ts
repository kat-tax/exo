export type DevicePlatform =
 | 'Android'
 | 'iOS'
 | 'PC'
 | 'Mac'
 | 'Brave'
 | 'Edge'
 | 'Opera'
 | 'Chrome'
 | 'Safari'
 | 'Firefox'
 | 'IE'
 | 'Browser'
 | 'Unknown';

export function getDevicePlatform(): DevicePlatform {
  return (
    __ANDROID__ ? 'Android' :
    __IOS__ ? 'iOS' :
    __WINDOWS__ ? 'PC' :
    __MACOS__ ? 'Mac' :
    __WEB__ ? getBrowserName() :
    'Unknown'
  );
}

export function getBrowserName(): Partial<DevicePlatform> {
  const ua = navigator.userAgent;
  // @ts-expect-error - Brave API is not typed
  if (navigator.brave?.isBrave)
    return 'Brave';
  if (/Opera|OPR\//.test(ua))
    return 'Opera';
  if (/Edg\//.test(ua))
    return 'Edge';
  if (/Chrome/.test(ua) && !/Edg|OPR/.test(ua))
    return 'Chrome';
  if (/Safari/.test(ua) && !/Chrome/.test(ua))
    return 'Safari';
  if (/Firefox/.test(ua))
    return 'Firefox';
  if (/MSIE|Trident/.test(ua))
    return 'IE';
  return 'Browser';
}

export function getDeviceIcon(platform: string | null) {
  switch (platform) {
    case 'Android':
      return 'simple-icons:android';
    case 'iOS':
      return 'simple-icons:ios';
    case 'PC':
      return 'simple-icons:windows';
    case 'Mac':
      return 'simple-icons:macos';
    case 'Brave':
      return 'simple-icons:brave';
    case 'Edge':
      return 'simple-icons:microsoftedge';
    case 'Opera':
      return 'simple-icons:opera';
    case 'Chrome':
      return 'simple-icons:googlechrome';
    case 'Safari':
      return 'simple-icons:safari';
    case 'Firefox':
      return 'simple-icons:firefoxbrowser';
    case 'IE':
      return 'simple-icons:internetexplorer';
    case 'Browser':
      return 'ph:browser';
    case 'Unknown':
    default:
      return 'ph:devices';
  }
}
