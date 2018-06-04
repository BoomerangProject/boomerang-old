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
  businessNameTextInput: {
    width: '75%',
    marginBottom: 32
  },
  businessDescriptionTextInput: {
    width: '75%',
    marginBottom: 64
  },
  okayButtonContainer: {

    position: 'absolute',
    width: '60%',
    height: 50,
    bottom: 48,
    backgroundColor: '#5DD0C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  okayButton: {

    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});