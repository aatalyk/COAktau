import { createStackNavigator } from 'react-navigation';

import { Home } from '../../scenes/Home';
import { ServicesList } from '../services';

export const HomeRoutes = {
  Home: 'Home',
  Services: 'Services',
};

export const HomeNavigator = createStackNavigator(
  {
    [HomeRoutes.Home]: Home,
    [HomeRoutes.Services]: ServicesList,
  },
  {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerMode: 'screen',
  },
);
