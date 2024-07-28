export const Layout = {
  Main: require('./LayoutMain').default,
}

export const Screen = {
  // General
  Home: require('../../home/routes/ScreenHome').default,
  Settings: require('../../settings/routes/ScreenSettings').default,
  Teaser: require('./ScreenTeaser').default,
  // Media
  Directory: require('../../media/files/routes/ScreenDirectory').default,
  FilePreview: require('../../media/files/routes/ScreenFilePreview').default,
  // World
  Map: require('../../world/map/routes/ScreenMap').default,
  Calendar: require('../../world/events/routes/ScreenCalendar').default,
  // Dev
  Design: require('../../dev/routes/ScreenDesign').default,
  Library: require('../../dev/routes/ScreenLibrary').default,
}
