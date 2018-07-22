import { createDrawerNavigator } from 'react-navigation';

import { HomeNavigator } from './HomeNavigator';
import { SideMenu } from '../side_menu/SideMenu';

export const DrawerNavigator = createDrawerNavigator(
  {
    ['Home']: HomeNavigator,
  },
  {
    contentComponent: SideMenu,
  },
);
