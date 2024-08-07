export const Layout = {
  Main: require('./MainLayout').default,
}

export const Screen = {
  // App
  Settings: require('./ScreenSettings').default,
  Storage: require('./ScreenStorage').default,
  Teaser: require('./ScreenTeaser').default,
  // General
  Home: require('../../home/routes/ScreenHome').default,
  // Media
  Browse: require('../../media/routes/ScreenBrowse').default,
  // World
  World: require('../../world/routes/ScreenWorld').default,
  Map: require('../../world/routes/ScreenMap').default,
  Calendar: require('../../world/routes/ScreenCalendar').default,
  // Dev
  Design: require('../../dev/routes/ScreenDesign').default,
  Library: require('../../dev/routes/ScreenLibrary').default,
}
