import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  root: {
    height: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#d2d6d8',
    borderRadius: 99999,
    ...Platform.select({
      web: {
        /* Fix overflow clipping in Safari */
        /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
        transform: 'translateZ(0)',
      },
    }),
  },
  fullWidth: {
    width: '100%',
  },
  active: {
    width: '100%',
    height: '100%',
    borderRadius: 99999,
    //transition: 'transform 660ms linear',
  },
});
