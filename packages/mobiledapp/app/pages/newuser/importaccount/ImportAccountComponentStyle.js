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
    fontFamily: 'WorkSans-Regular',
    marginTop: 8,
    marginBottom: 8,
    color: '#002A1C',
    fontSize: 22,
  },
  seedLabel: {
    marginTop: 'auto',
    fontSize: 12,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular',
  },
  seedTextContainer: {

    marginTop: 3,
    backgroundColor: '#005143',
    borderRadius: 4,

    width: 190,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center'
  },
  seedText: {
    fontFamily: 'RobotoMono-Regular',
    width: 150,
    height: 100,
    color: 'white',
    fontSize: 14
  },

  importAccountButtonContainer: {

    marginTop: 'auto',
    marginBottom: 90,
    backgroundColor: '#5DD0C2',
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  importAccountButton: {
    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});