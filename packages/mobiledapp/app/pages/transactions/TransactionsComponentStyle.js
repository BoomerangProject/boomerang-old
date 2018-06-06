import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 16
  },
  title: {
    fontFamily: 'WorkSans-Regular',
    marginTop: 16,
    marginBottom: 8,
    color: '#002A1C',
    fontSize: 18,
  },
  transactionText: {
    fontFamily: 'RobotoMono-Regular',
    color: '#002A1C',
    fontSize: 8,
    marginTop: 4
  },
});
