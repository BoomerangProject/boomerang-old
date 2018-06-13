import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainer: {

    width: '80%',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    width: '100%',
    height: 2,
    backgroundColor: '#002A1C',
  },
  flatListStyle: {
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    height: 36,
    marginTop: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#6F877F',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'RobotoMono-Regular',
    color: '#002A1C',
    fontSize: 10
  }
});