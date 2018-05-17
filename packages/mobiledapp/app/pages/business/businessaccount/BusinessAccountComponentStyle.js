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
  fieldContainer: {
    width: '100%',
    padding: 16,
    justifyContent: 'flex-start'
  },
  field: {
    fontSize: 12,
    color: '#002A1C',
    fontFamily: 'WorkSans-Regular',
  }
});


// .Account {
//
//   font-family: $defaultFont;
//   color: #002A1C;
//
// &.container {
//
//     display: flex;
//     flex-direction: column;
//     background-color: white;
//     align-items: center;
//     border: 1px solid black;
//     width: 250px;
//     height: 400px;
//   }
//
// &.logo {
//
//     margin-top: 15px;
//     width: 50px;
//     height: 50px;
//   }
//
// &.Address {
//
//     margin-top: 15px;
//     font-size: x-small;
//   }
// }