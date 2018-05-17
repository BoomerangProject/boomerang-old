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
    width: 40,
    height: 40
  },
  title: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    marginTop: 8,
    fontSize: 22
  },
  addProfilePhotoButton: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'#002A1C',
  },
  buttonContainer: {

    width: '60%',
    height: 50,
    backgroundColor: '#5DD0C2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48
  },
  button: {

    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});