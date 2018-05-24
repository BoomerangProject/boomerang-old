import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 1,
    backgroundColor: '#CCD4D1'
  },
  itemTile: {
    width: '100%',
    height: 116,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#CCD4D1',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAddress: {
    justifyContent: 'flex-start',
    fontFamily: 'RobotoMono-Regular',
    color: '#002A1C',
    fontSize: 10
  },
  workerAddress: {
    justifyContent: 'center',
    fontFamily: 'RobotoMono-Regular',
    color: '#002A1C',
    fontSize: 10
  },
  businessAddress: {
    justifyContent: 'flex-end',
    fontFamily: 'RobotoMono-Regular',
    color: '#002A1C',
    fontSize: 10
  },
  rating: {
    fontFamily: 'RobotoMono-Regular',
    color: '#002A1C',
    paddingRight: 4,
    paddingLeft: 4,
    fontSize: 16,
    fontWeight: 'bold'
  },
  leftContainer: {
    width: '100%',
    alignItems: 'flex-start'
  },
  middleContainer: {
    flexDirection: 'row',
    padding: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightContainer: {
    width: '100%',
    alignItems: 'flex-end'
  },
  borderBox: {
    borderWidth: 1,
    borderColor: '#CCD4D1'
  }
});