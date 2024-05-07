export const Layout = {
  Main: require('../../core/routes/LayoutMain').default,
}

export const Screen = {
  Home: require('../../core/routes/ScreenHome').default,
  TaskList: require('../../tasks/routes/TasksList').default,
  TaskDetails: require('../../tasks/routes/TasksDetails').default,
  Settings: require('../../settings/routes/ScreenSettings').default,
}
