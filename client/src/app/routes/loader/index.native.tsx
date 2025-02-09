export const Layout = {
  get App() {
    return require('../layout').default;
  },
}

export const Screen = {
  get Settings() {
    return require('../screen-settings').default;
  },
  get Storage() {
    return require('../screen-storage').default;
  },
  get Room() {
    return require('../screen-room').default;
  },
  get Teaser() {
    return require('../screen-teaser').default;
  },
  get Home() {
    return require('../../../home/routes/screen-home').default;
  },
  get Inbox() {
    return require('../../../home/routes/screen-inbox').default;
  },
  get Browse() {
    return require('../../../media/routes/screen-browse').default;
  },
  get Ipfs() {
    return require('../../../media/routes/screen-ipfs').default;
  },
  get World() {
    return require('../../../world/routes/screen-world').default;
  },
  get Map() {
    return require('../../../world/routes/screen-map').default;
  },
  get Calendar() {
    return require('../../../world/routes/screen-calendar').default;
  },
  get Design() {
    return require('../../../dev/routes/screen-design').default;
  },
  get Library() {
    return require('../../../dev/routes/screen-library').default;
  },
}
