export const Layout = {
  get App() {
    return require('../Layout').default;
  },
}

export const Screen = {
  get Settings() {
    return require('../ScreenSettings').default;
  },
  get Storage() {
    return require('../ScreenStorage').default;
  },
  get Teaser() {
    return require('../ScreenTeaser').default;
  },
  get Home() {
    return require('../../../home/routes/ScreenHome').default;
  },
  get Browse() {
    return require('../../../media/routes/ScreenBrowse').default;
  },
  get View() {
    return require('../../../media/routes/ScreenView').default;
  },
  get World() {
    return require('../../../world/routes/ScreenWorld').default;
  },
  get Map() {
    return require('../../../world/routes/ScreenMap').default;
  },
  get Calendar() {
    return require('../../../world/routes/ScreenCalendar').default;
  },
  get Design() {
    return require('../../../dev/routes/ScreenDesign').default;
  },
  get Library() {
    return require('../../../dev/routes/ScreenLibrary').default;
  },
  get Live() {
    return require('../../../live/routes/ScreenRooms').default;
  },
  get Room() {
    return require('../../../live/routes/ScreenRoom').default;
  },
}
