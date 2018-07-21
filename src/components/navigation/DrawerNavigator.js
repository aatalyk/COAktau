import { createDrawerNavigator } from 'react-navigation';

import { StackNavigator } from './StackNavigator';
import { SideMenu } from '../side_menu/SideMenu';

export const DrawerNavigator = createDrawerNavigator(
  {
    ['Home']: StackNavigator,
  },
  {
    contentComponent: SideMenu,
  },
);
