export const Layout = {
  Main: require('./MainLayout').default,
}

export const Screen = {
  // App
  Settings: require('./ScreenSettings').default,
  Storage: require('./ScreenStorage').default,
  Teaser: require('./ScreenTeaser').default,
  // General
  Home: require('../../home/router/ScreenHome').default,
  // Media
  Browse: require('../../media/router/ScreenBrowse').default,
  // World
  World: require('../../world/router/ScreenWorld').default,
  Map: require('../../world/router/ScreenMap').default,
  Calendar: require('../../world/router/ScreenCalendar').default,
  // Dev
  Design: require('../../dev/router/ScreenDesign').default,
  Library: require('../../dev/router/ScreenLibrary').default,
}
