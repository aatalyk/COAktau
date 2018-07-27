import { createStackNavigator } from 'react-navigation';

import { Home } from '../../scenes/Home';
import { ServicesList } from '../services';
import { FAQ } from '../faq/FAQ';
import { News } from '../news/News';
import { NewsPage } from '../news/NewsPage';

export const HomeRoutes = {
	Home: 'Home',
	Services: 'Services',
	FAQ: 'FAQ',
	Notifications: 'FAQ',
	News: 'News'
};

export const HomeNavigator = createStackNavigator(
	{
		[HomeRoutes.Home]: Home,
		[HomeRoutes.Services]: ServicesList,
		[HomeRoutes.FAQ]: FAQ,
		[HomeRoutes.News]: News,
		NewsPage: NewsPage
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
