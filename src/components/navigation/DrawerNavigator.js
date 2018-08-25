import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { Header } from './Header';
import { IconButton } from '../common/IconButton';
import { Home } from '../../scenes/Home';
import { NotificationPage } from '../notifications';
import { ServicesList, Services, ServiceDetails, AboutService } from '../services';
import { FAQ } from '../faq';
import { News } from '../news';
import { Notifications } from '../notifications';
import { NewsPage } from '../news';
import { Settings } from '../../components/settings';
import { Contact } from '../../components/contact';
import { About } from '../about';
import { SideMenu } from '../side_menu/SideMenu';
import { images, settings } from '../../assets';

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
const navigationOptions = (titleKaz, titleRus, withMenuButton = false) => ({ navigation }) => {
	const imgSource = withMenuButton ? images.menu : images.back;
	const onPress = () => (withMenuButton ? navigation.openDrawer() : navigation.goBack());

	return {
		header: () => (
			<Header
				titleKaz={titleKaz}
				titleRus={titleRus}
				leftItem={<IconButton imgSource={imgSource} onPress={onPress} />}
			/>
		)
	};
};
/* eslint-enable */

const stack = {
	Home: {
		screen: Home,
		navigationOptions: navigationOptions(settings.kaz.navigation.home, settings.rus.navigation.home)
	},
	ServicesList: {
		screen: ServicesList,
		navigationOptions: navigationOptions(settings.kaz.navigation.services, settings.rus.navigation.services)
	},
	Services: {
		screen: Services,
		navigationOptions: navigationOptions(settings.kaz.navigation.services, settings.rus.navigation.services)
	},
	ServiceDetails: {
		screen: ServiceDetails,
		navigationOptions: navigationOptions(settings.kaz.navigation.services, settings.rus.navigation.services)
	},
	AboutService: {
		screen: AboutService,
		navigationOptions: navigationOptions(settings.kaz.navigation.services, settings.rus.navigation.services)
	},
	FAQ: {
		screen: FAQ,
		navigationOptions: navigationOptions(settings.kaz.navigation.faq, settings.rus.navigation.faq)
	},
	Notifications: {
		screen: Notifications,
		navigationOptions: navigationOptions(settings.kaz.navigation.notifs, settings.rus.navigation.notifs)
	},
	NotificationPage: {
		screen: NotificationPage,
		navigationOptions: navigationOptions('', '')
	},
	News: {
		screen: News,
		navigationOptions: navigationOptions(settings.kaz.navigation.news, settings.rus.navigation.news)
	},
	NewsPage: {
		screen: NewsPage,
		navigationOptions: navigationOptions(settings.kaz.navigation.news, settings.rus.navigation.news)
	},
	Settings: {
		screen: Settings,
		navigationOptions: navigationOptions(settings.kaz.navigation.settings, settings.rus.navigation.settings)
	},
	Contact: {
		screen: Contact,
		navigationOptions: navigationOptions(settings.kaz.navigation.contact, settings.rus.navigation.contact)
	},
	About: {
		screen: About,
		navigationOptions: navigationOptions(settings.kaz.navigation.about, settings.rus.navigation.about)
	}
};

export const DrawerNavigator = createDrawerNavigator(
	{
		[DrawerRoutes.HomeNavigator]: createStackNavigator(
			{
				...stack,
				Home: {
					screen: Home,
					navigationOptions: navigationOptions(
						settings.kaz.navigation.home,
						settings.rus.navigation.home,
						true
					)
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
					navigationOptions: navigationOptions(
						settings.kaz.navigation.services,
						settings.rus.navigation.services,
						true
					)
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
					navigationOptions: navigationOptions(
						settings.kaz.navigation.myServices,
						settings.rus.navigation.myServices,
						true
					)
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
					navigationOptions: navigationOptions(
						settings.kaz.navigation.notifs,
						settings.rus.navigation.notifs,
						true
					)
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
					navigationOptions: navigationOptions(
						settings.kaz.navigation.news,
						settings.rus.navigation.news,
						true
					)
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
					navigationOptions: navigationOptions(
						settings.kaz.navigation.settings,
						settings.rus.navigation.settings,
						true
					)
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
					navigationOptions: navigationOptions(
						settings.kaz.navigation.contact,
						settings.rus.navigation.contact,
						true
					)
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
					navigationOptions: navigationOptions(
						settings.kaz.navigation.about,
						settings.rus.navigation.about,
						true
					)
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
					navigationOptions: navigationOptions(settings.kaz.navigation.faq, settings.rus.navigation.faq, true)
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
