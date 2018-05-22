import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  balanceTextContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  balanceText: {
    fontSize: 28,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});