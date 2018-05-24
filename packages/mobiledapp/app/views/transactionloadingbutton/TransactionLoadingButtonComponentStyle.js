import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    display: 'flex',
    backgroundColor: '#F5F5F5',
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {

    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  movingDot: {
    fontFamily: 'RobotoMono-Regular',
    color: '#002A1C',
    fontSize: 4
  }
});