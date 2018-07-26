import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

import { Header } from './Header';
import { MenuItem } from './MenuItem';

import { images } from '../../assets';
import { HomeRoutes } from '../navigation';

const menuItems = [
	{ image: images.home, title: 'Главная' },
	{ image: images.case, title: 'Все услуги' },
	{ image: images.star, title: 'Мои услуги' },
	{ image: images.news, title: 'Уведомления' },
	{ image: images.speaker, title: 'Новости' },
	{ image: images.question, title: 'Справка' },
	{ image: images.pin, title: 'Контакты' },
	{ image: images.info, title: 'О приложении' },
	{ image: images.settings, title: 'Настройки' },
	{ image: images.exit, title: 'Выход' }
];

const propTypes = {
	navigation: PropTypes.object
};

class SideMenu extends Component {
	state = {
		currentIndex: 0,
		itemHeight: 44
	};

	renderItem = ({ item }) => <MenuItem image={item.image} title={item.title} />;

	onPress = currentIndex => () => {
		this.setState({ currentIndex });
		this.navigateRoute(currentIndex);
	};

	navigateRoute = index => {
		const routes = Object.keys(HomeRoutes);
		const navigateAction = NavigationActions.navigate({
			routeName: routes[index]
		});
		this.props.navigation.dispatch(navigateAction);
	};

	onLayout = ({ nativeEvent }) => {
		const { height } = nativeEvent.layout;
		const itemHeight = menuItems.length > 0 ? height / menuItems.length : 0;
		this.setState({ itemHeight });
	};

	render() {
		return (
			<View style={styles.container}>
				<Header title="социальное обеспечение актау" />
				<View style={styles.menuContainer} onLayout={this.onLayout}>
					{menuItems.map((item, index) => (
						<MenuItem
							onPress={this.onPress(index)}
							key={index}
							regularImage={item.image}
							selectedImage={item.image}
							title={item.title}
							isSelected={index === this.state.currentIndex}
							height={this.state.itemHeight}
						/>
					))}
				</View>
			</View>
		);
	}
}

SideMenu.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	menuContainer: {
		flex: 1,
		marginVertical: 10
	}
});

export { SideMenu };
