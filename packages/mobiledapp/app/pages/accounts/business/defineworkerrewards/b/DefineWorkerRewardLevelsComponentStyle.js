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
  logo: {
    width: 20,
    height: 20
  },
  sliderContainer: {
    width: '90%',
    marginTop: 8
  },
  sliderLabelText: {
    fontSize: 12,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular',
    marginLeft: 12
  },
  buttonContainer: {

    backgroundColor: '#5DD0C2',
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  button: {
    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});

