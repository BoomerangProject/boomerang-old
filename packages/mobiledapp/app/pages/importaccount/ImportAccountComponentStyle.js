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
    fontSize: 20,
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
    height: 110,
    justifyContent: 'center',
    alignItems: 'center'
  },
  seedText: {
    fontFamily: 'RobotoMono-Regular',
    width: 150,
    height: 80,
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


// .ImportAccount {
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
//     margin-top: auto;
//     width: 50px;
//     height: 50px;
//   }
//
// &.title {
//
//     margin-top: 10px;
//     margin-bottom: 0;
//
//     // didn't have to add this for "npm run start", but deployed script needed it
//     // TODO -- find out why
//
//     font-size: 1rem;
//     font-weight: 500;
//     line-height: 1.2;
//   }
//
// &.seedLabel {
//     margin-top: auto;
//     font-size: 0.7em;
//   }
//
// &.seedTextContainer {
//
//     margin-top: 3px;
//     background-color: #005143;
//     -moz-border-radius: 4px;
//     -webkit-border-radius: 4px;
//     border-radius: 4px;
//
//     display: flex;
//     width: 190px;
//     height: 60px;
//     justify-content: center;
//     align-items: center;
//   }
//
// &.seedText {
//
//     background: none;
//     font-family: $monospaceFont;
//
//     width: 140px;
//     height: 40px;
//
//     border: none;
//     outline: none;
//     overflow-y: hidden;
//
//     font-weight: 300;
//     font-size: 0.6em;
//     color: white;
//     white-space: normal;
//     word-wrap: break-word;
//
//
//
//     resize: none;
//
//     vertical-align: middle;
//     text-align: center;
//     display: table-cell;
//   }
//
// &.button {
//     margin-top: auto;
//     margin-bottom: 45px;
//
//     width: 190px;
//     height: 40px;
//     font-size: small;
//     border: none;
//     outline: none;
//     box-shadow: 0px 2px #F6F6F6;
//     background-color: #5DD0C2;
//   }
// }