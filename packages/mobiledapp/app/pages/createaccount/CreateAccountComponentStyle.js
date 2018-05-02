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
    width: 40,
    height: 40
  },
  title: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20
  },
  firstParagraph: {
    marginTop: 'auto',
    marginLeft: 32,
    marginRight: 32,
    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  },

  warningMessage: {
    marginTop: 10,
    marginRight: 32,
    marginBottom: 10,
    marginLeft: 32,
    fontSize: 14,
    color: '#EA2F57',
    fontFamily: 'WorkSans-Regular'
  },

  secondParagraph: {
    marginLeft: 32,
    marginRight: 32,
    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  },

  secondParagraphRedText: {
    color: '#EA2F57',
    fontFamily: 'WorkSans-Regular'
  },

  seedButtonContainer: {

    marginTop: 'auto',
    backgroundColor: '#005143',
    borderRadius: 4,

    width: 190,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center'
  },

  seedButton: {

    fontFamily: 'RobotoMono-Regular',
    width: 140,
    height: 80,
    color: 'white',
    fontSize: 14
  },

  tapToCopyMessage: {

    fontSize: 12,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular',
    marginBottom: 'auto'
  },

  buttonContainer: {

    marginTop: 16,
    marginBottom: 32,
    backgroundColor: '#5DD0C2',
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    fontSize: 14,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular'
  }
});