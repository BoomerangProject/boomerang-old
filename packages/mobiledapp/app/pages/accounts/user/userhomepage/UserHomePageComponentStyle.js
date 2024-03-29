import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {

    paddingTop: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: '#002A1C',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  profileText: {
    fontFamily: 'WorkSans-Regular',
    marginTop: 4,
    color: '#002A1C',
    fontSize: 10,
  },

  buttonContainer: {

    marginTop: 16,
    marginBottom: 32,
    width: '40%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    fontSize: 12,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});