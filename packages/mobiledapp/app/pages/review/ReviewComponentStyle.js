import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  fieldContainer: {
    width: '100%',
    padding: 16,
    justifyContent: 'flex-start'
  },
  field: {
    fontSize: 10,
    color: '#002A1C',
    fontFamily: 'RobotoMono-Regular'
  },
  reviewInformation: {
    marginTop: 16,
    fontSize: 10,
    color: '#002A1C',
    fontFamily: 'RobotoMono-Regular'
  }
});
