import { createDrawerNavigator } from 'react-navigation';
import { StackNavigator } from './StackNavigator';

export const DrawerNavigator = createDrawerNavigator({
  ['Home']: StackNavigator,
});
