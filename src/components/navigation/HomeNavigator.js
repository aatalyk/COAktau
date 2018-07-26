import { createStackNavigator } from 'react-navigation';

import { Home } from '../../scenes/Home';
import { ServicesList } from '../services';
import { FAQ } from '../faq/FAQ';
import { News } from '../news/News';

export const HomeRoutes = {
	Home: 'Home',
	Services: 'Services',
	FAQ: 'FAQ',
	News: 'News'
};

export const HomeNavigator = createStackNavigator(
	{
		[HomeRoutes.Home]: Home,
		[HomeRoutes.Services]: ServicesList,
		[HomeRoutes.FAQ]: FAQ,
		[HomeRoutes.News]: News
	},
	{
		headerStyle: {
			backgroundColor: '#f4511e'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		},
		headerMode: 'screen'
	}
);
