/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PatchPromise from './monkeyPatch';

PatchPromise();


AppRegistry.registerComponent(appName, () => App);
