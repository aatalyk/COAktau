import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { Header } from './Header';
import { IconButton } from '../common/IconButton';
import { Home } from '../../scenes/Home';
import { ServicesList } from '../services';
import { FAQ } from '../faq/FAQ';
import { News } from '../news/News';
import { NewsPage } from '../news/NewsPage';
import { Settings } from '../../components/settings';
import { SideMenu } from '../side_menu/SideMenu';
import { images } from '../../assets';

export const DrawerRoutes = {
	HomeNavigator: 'HomeNavigator',
	ServicesNavigator: 'ServicesNavigator',
	MyServicesNavigator: 'MyServicesNavigator',
	NotifsNavigator: 'NotifsNavigator',
	NewsNavigator: 'NewsNavigator',
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
	FAQ: {
		screen: FAQ,
		navigationOptions: navigationOptions('FAQ')
	},
	Notifications: {
		screen: FAQ,
		navigationOptions: navigationOptions('Notifications')
	},
	News: {
		screen: News,
		navigationOptions: navigationOptions('News')
	},
	NewsPage: {
		screen: NewsPage,
		navigationOptions: navigationOptions('NewsPage')
	},
	SettingsPage: {
		screen: Settings,
		navigationOptions: navigationOptions('Settings')
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
				News: {
					screen: News,
					navigationOptions: navigationOptions('Notifications', true)
				}
			},
			{
				initialRouteName: 'News'
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
		)
	},
	{
		contentComponent: SideMenu
	}
);
