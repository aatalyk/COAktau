import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { Header } from './Header';
import { IconButton } from '../common/IconButton';
import { Home } from '../../scenes/Home';
import { ServicesList, Services, ServiceDetails } from '../services';
import { FAQ } from '../faq';
import { News } from '../news';
import { Notifications } from '../notifications';
import { NotificationPage } from '../notifications';
import { NewsPage } from '../news';
import { Settings } from '../../components/settings';
import { Contact } from '../../components/contact';
import { About } from '../about';
import { SideMenu } from '../side_menu/SideMenu';
import { images } from '../../assets';

export const DrawerRoutes = {
	HomeNavigator: 'HomeNavigator',
	ServicesNavigator: 'ServicesNavigator',
	MyServicesNavigator: 'MyServicesNavigator',
	NewsNavigator: 'NewsNavigator',
	NotifsNavigator: 'NotifsNavigator',
	FAQNavigator: 'FAQNavigator',
	ContactNavigator: 'ContactNavigator',
	AboutNavigator: 'AboutNavigator',
	SettingsNavigator: 'SettingsNavigator'
};

/* eslint-disable */
const navigationOptions = (title, withMenuButton = false) => ({ navigation }) => {
	const imgSource = withMenuButton ? images.menu : images.back;
	const onPress = () => (withMenuButton ? navigation.openDrawer() : navigation.goBack());

	return {
		header: () => <Header title={title} leftItem={<IconButton imgSource={imgSource} onPress={onPress} />} />
	};
};
/* eslint-enable */

const stack = {
	Home: {
		screen: Home,
		navigationOptions: navigationOptions('Home')
	},
	ServicesList: {
		screen: ServicesList,
		navigationOptions: navigationOptions('Services')
	},
	Services: {
		screen: Services,
		navigationOptions: navigationOptions('Services')
	},
	ServiceDetails: {
		screen: ServiceDetails,
		navigationOptions: navigationOptions('ServiceDetails')
	},
	FAQ: {
		screen: FAQ,
		navigationOptions: navigationOptions('FAQ')
	},
	Notifications: {
		screen: Notifications,
		navigationOptions: navigationOptions('Notifications')
	},
	NotificationPage: {
		screen: NotificationPage,
		navigationOptions: navigationOptions('')
	},
	News: {
		screen: News,
		navigationOptions: navigationOptions('News')
	},
	NewsPage: {
		screen: NewsPage,
		navigationOptions: navigationOptions('NewsPage')
	},
	Settings: {
		screen: Settings,
		navigationOptions: navigationOptions('Settings')
	},
	Contact: {
		screen: Contact,
		navigationOptions: navigationOptions('Contact')
	},
	About: {
		screen: About,
		navigationOptions: navigationOptions('About')
	}
};

export const DrawerNavigator = createDrawerNavigator(
	{
		[DrawerRoutes.HomeNavigator]: createStackNavigator(
			{
				...stack,
				Home: {
					screen: Home,
					navigationOptions: navigationOptions('Home', true)
				}
			},
			{
				initialRouteName: 'Home'
			}
		),
		[DrawerRoutes.ServicesNavigator]: createStackNavigator(
			{
				...stack,
				ServicesList: {
					screen: ServicesList,
					navigationOptions: navigationOptions('Services', true)
				}
			},
			{
				initialRouteName: 'ServicesList'
			}
		),
		[DrawerRoutes.MyServicesNavigator]: createStackNavigator(
			{
				...stack,
				ServicesList: {
					screen: ServicesList,
					navigationOptions: navigationOptions('My Services', true)
				}
			},
			{
				initialRouteName: 'ServicesList'
			}
		),
		[DrawerRoutes.NotifsNavigator]: createStackNavigator(
			{
				...stack,
				Notifications: {
					screen: Notifications,
					navigationOptions: navigationOptions('Notifications', true)
				}
			},
			{
				initialRouteName: 'Notifications'
			}
		),
		[DrawerRoutes.NewsNavigator]: createStackNavigator(
			{
				...stack,
				News: {
					screen: News,
					navigationOptions: navigationOptions('News', true)
				}
			},
			{
				initialRouteName: 'News'
			}
		),
		[DrawerRoutes.SettingsNavigator]: createStackNavigator(
			{
				...stack,
				Settings: {
					screen: Settings,
					navigationOptions: navigationOptions('Settings', true)
				}
			},
			{
				initialRouteName: 'Settings'
			}
		),
		[DrawerRoutes.ContactNavigator]: createStackNavigator(
			{
				...stack,
				Contact: {
					screen: Contact,
					navigationOptions: navigationOptions('Contact', true)
				}
			},
			{
				initialRouteName: 'Contact'
			}
		),
		[DrawerRoutes.AboutNavigator]: createStackNavigator(
			{
				...stack,
				About: {
					screen: About,
					navigationOptions: navigationOptions('About', true)
				}
			},
			{
				initialRouteName: 'About'
			}
		),
		[DrawerRoutes.FAQNavigator]: createStackNavigator(
			{
				...stack,
				FAQ: {
					screen: FAQ,
					navigationOptions: navigationOptions(FAQ, true)
				}
			},
			{
				initialRouteName: 'FAQ'
			}
		)
	},
	{
		contentComponent: SideMenu
	}
);
