import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  logo: {
    marginTop: 65,
    width: 75,
    height: 75
  },
  divider: {
    marginTop: 48,
    borderColor: '#CCD4D1',
    height: 1,
    width: '100%'
  },
  navigationButtonContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    marginTop: -1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#CCD4D1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationButton: {

    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});