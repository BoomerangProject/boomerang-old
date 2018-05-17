import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    marginTop: 'auto'
  },
  logo: {
    width: 50,
    height: 50
  },
  loadingTextContainer: {
    flex: 2,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 'auto'
  },
  text: {
    fontSize: 24,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  },
  visibleDots: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    fontSize: 24
  },
  hiddenDots: {
    fontFamily: 'WorkSans-Regular',
    color: '#ffffff',
    fontSize: 24
  },
  spacer: {
    flex: 3
  }
});
