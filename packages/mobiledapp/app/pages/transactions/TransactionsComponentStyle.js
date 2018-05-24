import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  businessInfoContainer: {
    width: '100%',
    padding: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  businessName: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    fontSize: 18,
    fontWeight: 'bold'
  },
  businessDescription: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    fontSize: 14
  },
});
