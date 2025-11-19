export function getDeviceName() {
  return (
    __ANDROID__ ? 'Android' :
    __IOS__ ? 'iOS' :
    __WINDOWS__ ? 'PC' :
    __MACOS__ ? 'Mac' :
    __WEB__ ? getBrowserName() :
    __TV__ ? 'TV' :
    'Unknown'
  );
}

export function getBrowserName() {
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
  return 'Web Browser';
}
