import { createStackNavigator } from 'react-navigation';
import { Home } from '../../scenes/Home';

export const StackNavigator = createStackNavigator(
  {
    ['Home']: Home,
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

export * from './Header';
export * from './MenuButton';
