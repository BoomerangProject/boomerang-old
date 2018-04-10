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

  },
  firstParagraph: {
    marginTop: auto;
marginLeft: 23;
marginRight: 23;
fontSize: 0.7em;
},

warningMessage: {
  margin: 10 30 10 30;
  fontSize: 0.7em;
  color: #EA2F57;
},

secondParagraph: {
  marginLeft: 23;
  marginRight: 23;
  fontSize: 0.7em;
},

secondParagraphRedText: {
  color: #EA2F57;
},

seedButton: {

  marginTop: auto;
  font-family: $monospaceFont;

  width: 190;
  height: 60;

  border: none;
  outline: none;
  background-color: #005143;

  padding: 5 26 5 26;
  font-weight: 300;
  fontSize: 0.6em;
  color: white;
  white-space: normal;
  word-wrap: break-word;

  -moz-border-radius: 4;
  -webkit-border-radius: 4;
  border-radius: 4;
},

tapToCopyMessage: {

  fontSize: x-small;
},

button: {

  marginTop: 10;
  margin-bottom: 15;

  width: 190;
  height: 40;
  fontSize: small;
  border: none;
  outline: none;
  box-shadow: 0 2 #F6F6F6;
  background-color: #5DD0C2;
}
});


// .CreateAccount {
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
//     border: 1 solid black;
//     width: 250;
//     height: 400;
//   }
//
// &.logo {
//
//     marginTop: 15;
//     width: 50;
//     height: 50;
//   }
//
// &.title {
//
//     marginTop: 5;
//     margin-bottom: 0;
//
//     // didn't have to add this for "npm run start", but deployed script needed it
//     // TODO -- find out why
//
//     fontSize: 1rem;
//     font-weight: 500;
//     line-height: 1.2;
//   }
//
// &.firstParagraph {
//     marginTop: auto;
//     marginLeft: 23;
//     marginRight: 23;
//     fontSize: 0.7em;
//   }
//
// &.warningMessage {
//     margin: 10 30 10 30;
//     fontSize: 0.7em;
//     color: #EA2F57;
//   }
//
// &.secondParagraph {
//     marginLeft: 23;
//     marginRight: 23;
//     fontSize: 0.7em;
//   }
//
// &.secondParagraphRedText {
//     color: #EA2F57;
//   }
//
// &.seedButton {
//
//     marginTop: auto;
//     font-family: $monospaceFont;
//
//     width: 190;
//     height: 60;
//
//     border: none;
//     outline: none;
//     background-color: #005143;
//
//     padding: 5 26 5 26;
//     font-weight: 300;
//     fontSize: 0.6em;
//     color: white;
//     white-space: normal;
//     word-wrap: break-word;
//
//     -moz-border-radius: 4;
//     -webkit-border-radius: 4;
//     border-radius: 4;
//   }
//
// &.tapToCopyMessage {
//
//     fontSize: x-small;
//   }
//
// &.button {
//
//     marginTop: 10;
//     margin-bottom: 15;
//
//     width: 190;
//     height: 40;
//     fontSize: small;
//     border: none;
//     outline: none;
//     box-shadow: 0 2 #F6F6F6;
//     background-color: #5DD0C2;
//   }
// }