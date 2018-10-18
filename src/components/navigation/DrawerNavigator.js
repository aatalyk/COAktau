import React from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import { Header } from './Header';
import { IconButton } from '../common/IconButton';
import { Home } from '../../scenes/Home';
import { MyCity } from '../../scenes/MyCity';
import { MyCityDetailed } from '../../scenes/MyCityDetailed';
import { NotificationPage } from '../notifications';
import { ServicesList, Services, ServiceDetails, AboutService, MyServicesList } from '../services';
import { FAQ } from '../faq';
import { News } from '../news';
import { Notifications } from '../notifications';
import { NewsPage } from '../news';
import { Settings } from '../../components/settings';
import { Contact } from '../../components/contact';
import { About } from '../about';
import { MyHelper, Dictionary, PhraseList, Chat } from '../chat';
import { CalcScreen, AlertScreen } from '../calculator';
import { SideMenu } from '../side_menu/SideMenu';
import { images, settings } from '../../assets';

export const DrawerRoutes = {
	HomeNavigator: 'HomeNavigator',
	ServicesNavigator: 'ServicesNavigator',
	MyServicesNavigator: 'MyServicesNavigator',
	NewsNavigator: 'NewsNavigator',
	MyCity: 'MyCity',
	NotifsNavigator: 'NotifsNavigator',
	FAQNavigator: 'FAQNavigator',
	MyHelperNavigator: 'MyHelperNavigator',
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
		screen: Services
	},
	ServiceDetails: {
		screen: ServiceDetails
	},
	AboutService: {
		screen: AboutService
	},
	FAQ: {
		screen: FAQ,
		navigationOptions: navigationOptions(settings.kaz.navigation.faq, settings.rus.navigation.faq)
	},
	MyHelper: {
		screen: MyHelper
	},
	Dictionary: {
		screen: Dictionary
	},
	PhraseList: {
		screen: PhraseList
	},
	Chat: {
		screen: Chat
	},
	Notifications: {
		screen: Notifications,
		navigationOptions: navigationOptions(settings.kaz.navigation.notifs, settings.rus.navigation.notifs)
	},
	NotificationPage: {
		screen: NotificationPage
	},
	News: {
		screen: News,
		navigationOptions: navigationOptions(settings.kaz.navigation.news, settings.rus.navigation.news)
	},
	NewsPage: {
		screen: NewsPage
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
	},
	CalcScreen: {
		screen: CalcScreen,
		navigationOptions: navigationOptions(settings.kaz.navigation.calc, settings.rus.navigation.calc)
	},
	AlertScreen: {
		screen: AlertScreen
	},
	MyCityDetailed: {
		screen: MyCityDetailed,
		navigationOptions: navigationOptions(settings.kaz.navigation.myCity, settings.rus.navigation.myCity)
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
				MyServicesList: {
					screen: MyServicesList,
					navigationOptions: navigationOptions(
						settings.kaz.navigation.myServices,
						settings.rus.navigation.myServices,
						true
					)
				}
			},
			{
				initialRouteName: 'MyServicesList'
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
		[DrawerRoutes.MyCity]: createStackNavigator(
			{
				...stack,
				MyCity: {
					screen: MyCity,
					navigationOptions: navigationOptions(
						settings.kaz.navigation.myCity,
						settings.rus.navigation.myCity,
						true
					)
				}
			},
			{
				initialRouteName: 'MyCity'
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
		),
		[DrawerRoutes.MyHelperNavigator]: createStackNavigator(
			{
				...stack,
				MyHelper: {
					screen: MyHelper
				}
			},
			{
				initialRouteName: 'MyHelper'
			}
		)
	},
	{
		contentComponent: SideMenu
	}
);
