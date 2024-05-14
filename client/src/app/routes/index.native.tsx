export const Layout = {
  Main: require('../../core/routes/LayoutMain').default,
}

export const Screen = {
  Home: require('../../core/routes/ScreenHome').default,
  Calendar: require('../../core/routes/ScreenCalendar').default,
  TaskList: require('../../tasks/routes/TasksList').default,
  TaskDetails: require('../../tasks/routes/TasksDetails').default,
  Settings: require('../../settings/routes/ScreenSettings').default,
}
