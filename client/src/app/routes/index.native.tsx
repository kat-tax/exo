export const Layout = {
  Main: require('./LayoutMain').default,
}

export const Screen = {
  // General
  Home: require('../../home/routes/ScreenHome').default,
  Settings: require('../../settings/routes/ScreenSettings').default,
  Teaser: require('./ScreenTeaser').default,
  // Media
  Browse: require('../../media/routes/ScreenBrowse').default,
  // World
  Map: require('../../world/routes/ScreenMap').default,
  Calendar: require('../../world/routes/ScreenCalendar').default,
  // Dev
  Design: require('../../dev/routes/ScreenDesign').default,
  Library: require('../../dev/routes/ScreenLibrary').default,
}
