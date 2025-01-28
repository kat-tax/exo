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
  get Inbox() {
    return require('../../../home/routes/ScreenInbox').default;
  },
  get Room() {
    return require('../../../home/routes/ScreenRoom').default;
  },
  get Browse() {
    return require('../../../media/routes/ScreenBrowse').default;
  },
  get Ipfs() {
    return require('../../../media/routes/ScreenIpfs').default;
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
}
