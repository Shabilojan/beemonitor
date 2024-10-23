const { AppRegistry } = require('react-native');

import App from './App'; // or your root component file
import { name as appName } from './app.json'; // ensure this file exists and contains the app name

AppRegistry.registerComponent(appName, () => App);
