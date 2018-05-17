import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  balanceTextContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  balanceText: {
    fontSize: 56,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});