import { AppRegistry } from 'react-native';
import { YellowBox } from 'react-native';
import { start } from './App';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  // 'Warning: componentWillMount is deprecated',
  // 'Warning: componentWillReceiveProps is deprecated',
]);

// prevent red screen from coming up
console.reportErrorsAsExceptions = false;

start();

