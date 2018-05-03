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
  title: {

    fontSize: 22,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular',
    marginTop: 20
  },
  userAccountButtonContainer: {

    marginTop: 65,
    width: '60%',
    height: 50,
    backgroundColor: '#5DD0C2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userAccountButton: {

    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  },
  workerAccountButtonContainer: {

    marginTop: 20,
    width: '60%',
    height: 50,
    backgroundColor: '#5DD0C2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  workerAccountButton: {

    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  },
  businessAccountButtonContainer: {

    marginTop: 20,
    width: '60%',
    height: 50,
    backgroundColor: '#5DD0C2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'auto'
  },
  businessAccountButton: {

    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});