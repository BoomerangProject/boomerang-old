import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  itemTile: {
    width: '100%',
    height: 36,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#CCD4D1',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  employeeName: {
    justifyContent: 'flex-start',
    fontFamily: 'RobotoMono-Regular',
    color: '#002A1C',
    fontSize: 10
  }
});