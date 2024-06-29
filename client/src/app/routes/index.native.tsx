export const Layout = {
  Main: require('./LayoutMain').default,
}

export const Screen = {
  Home: require('../../home/routes/ScreenHome').default,
  TaskList: require('../../tasks/routes/TaskList').default,
  TaskDetails: require('../../tasks/routes/TaskDetails').default,
  Calendar: require('../../events/routes/ScreenCalendar').default,
  Settings: require('../../settings/routes/ScreenSettings').default,
  Design: require('../../dev/routes/ScreenDesign').default,
  Library: require('../../dev/routes/ScreenLibrary').default,
}
