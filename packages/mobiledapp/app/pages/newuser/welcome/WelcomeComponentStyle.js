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
    marginTop: 'auto',
    width: 50,
    height: 50
  },
  welcomeMessage: {

    fontSize: 24,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular',
    marginTop: 20
  },
  createAccountButtonContainer: {

    marginTop: 65,
    marginBottom: 15,
    width: '60%',
    height: 50,
    backgroundColor: '#5DD0C2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  createAccountButton: {

    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  },
  importAccountButtonContainer: {

    width: '60%',
    height: 50,
    backgroundColor: '#5DD0C2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  importAccountButton: {

    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  },
  version: {

    color: '#5DD0C2',
    marginTop: 'auto',
    marginBottom: 15,
    fontSize: 18,
    fontFamily: 'WorkSans-Regular'
  }
});