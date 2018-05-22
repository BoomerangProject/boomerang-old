import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

  container: {

    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 1,
    backgroundColor: '#CCD4D1'
  },
  itemTile: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#CCD4D1',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white'
  },
  businessImage: {
    width: 0,
    backgroundColor: '#FF0000'
  },
  businessInfoContainer: {
    width: '80%',
    flexDirection: 'column'
  },
  businessRatingContainer: {
    width: '20%',
    flexDirection: 'column'
  },
  businessName: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    fontSize: 16,
    fontWeight: 'bold'
  },
  businessDescription: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    fontSize: 12
  },
  businessRating: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    fontSize: 20
  },
  numberOfBusinessRatings: {
    fontFamily: 'WorkSans-Regular',
    color: '#002A1C',
    fontSize: 12
  }
});