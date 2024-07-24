export const Layout = {
  Main: require('./LayoutMain').default,
}

export const Screen = {
  Teaser: require('./ScreenTeaser').default,
  Home: require('../../home/routes/ScreenHome').default,
  Map: require('../../map/routes/ScreenMap').default,
  Calendar: require('../../events/routes/ScreenCalendar').default,
  TaskList: require('../../tasks/routes/TaskList').default,
  TaskDetails: require('../../tasks/routes/TaskDetails').default,
  Settings: require('../../settings/routes/ScreenSettings').default,
  Design: require('../../dev/routes/ScreenDesign').default,
  Library: require('../../dev/routes/ScreenLibrary').default,
}
