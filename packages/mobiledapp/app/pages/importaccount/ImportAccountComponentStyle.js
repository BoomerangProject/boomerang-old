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
    marginTop: 10,
    marginBottom: 0
  },
  seedLabel: {
    marginTop: 'auto',
    fontSize: 14
  },
  seedTextContainer: {

    marginTop: 3,
    backgroundColor: '#005143',
    borderRadius: 4,

    width: 190,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  seedText: {},
  button: {}
});

// .ImportAccount {
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