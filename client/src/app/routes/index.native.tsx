export const Layout = {
  Main: require('./core/LayoutMain').default,
}

export const Screen = {
  Home: require('./core/ScreenHome').default,
  TaskList: require('./tasks/ScreenTaskList').default,
  TaskDetails: require('./tasks/ScreenTaskList').default,
  Settings: require('./settings/ScreenSettings').default,
}
