import React, { Component } from 'react';
import { View, ScrollView, Animated, Dimensions, StyleSheet, Platform, NetInfo } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from '../store';

import { ServicesAndFAQ } from '../components/services';
import { AutoPagingFlatList } from '../components/home/AutoPagingFlatList';
import { colors, settings, images } from '../assets';
import { fetchNewsRequested } from '../actions';
import { Notifications } from '../components/notifications';
import { MessageScreen } from '../components/common';

const SCREEN_WIDTH = Dimensions.get('window').width;

const propTypes = {
	navigation: PropTypes.object,
	newsItems: PropTypes.array,
	fetchNewsRequested: PropTypes.func,
	lang: PropTypes.string
};

class HomeScreen extends Component {
	state = {
		index: 0,
		routes: [
			{
				key: 'first',
				title: settings[store.getState().settings.lang].navigation.notifs
			},
			{
				key: 'second',
				title: settings[store.getState().settings.lang].navigation.myServices
			}
		],
		connected: true,
		scrollY: new Animated.Value(Platform.OS === 'ios' ? -250 : 0)
	};

	constructor(props) {
		super(props);
		this.props.fetchNewsRequested();
	}

	componentDidMount() {
		this.checkConnection();
		NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange);
	}

	checkConnection = () => {
		NetInfo.getConnectionInfo().then(connectionInfo => {
			const connected = connectionInfo.type !== 'none';
			this.setState({ connected });
		});
	};

	handleFirstConnectivityChange = connectionInfo => {
		const connected = connectionInfo.type !== 'none';
		this.setState({ connected });
	};

	renderTabBar = props => (
		<TabBar
			{...props}
			style={styles.tabbar}
			labelStyle={styles.tabbarLabel}
			indicatorStyle={styles.tabbarIndicator}
		/>
	);

	onTabViewIndexChange = index => this.setState({ index });

	onScroll = () => {
		console.warn('onScroll');
		Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
			useNativeDriver: true
		});
	};

	render() {
		const { lang, navigation, newsItems } = this.props;

		const news = newsItems.filter(newsItem => newsItem.isMain);

		const scrollY = Animated.add(this.state.scrollY, Platform.OS === 'ios' ? 0 : 0);

		const headerTranslate = scrollY.interpolate({
			inputRange: [0, 250],
			outputRange: [0, -250],
			extrapolate: 'clamp'
		});

		console.warn(headerTranslate);

		return (
			<Animated.View style={[styles.container, { transform: [{ translateY: headerTranslate }] }]}>
				<AutoPagingFlatList data={news} lang={lang} navigation={navigation} />
				<TabView
					renderTabBar={this.renderTabBar}
					navigationState={this.state}
					renderScene={SceneMap({
						first: () => (
							<Notifications
								onScroll={Animated.event(
									[{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
									{
										useNativeDriver: true
									}
								)}
								navigation={navigation}
							/>
						),
						second: () => <ServicesAndFAQ navigation={navigation} />
					})}
					onIndexChange={this.onTabViewIndexChange}
					initialLayout={styles.tabViewInitialLayout}
					style={styles.tabView}
					useNativeDriver
				/>
			</Animated.View>
		);
	}
}

HomeScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	tabView: {
		marginTop: Platform.OS === 'ios' ? 0 : -5
	},
	tabbar: {
		backgroundColor: Platform.OS === 'android' ? 'white' : colors.transparent,
		height: 60,
		justifyContent: 'center'
	},
	tabbarLabel: {
		color: 'black',
		textAlign: 'center'
	},
	tabbarIndicator: {
		backgroundColor: colors.soBlue,
		height: 3
	},
	tabViewInitialLayout: {
		width: SCREEN_WIDTH,
		height: 200
	}
});

const mapStateToProps = ({ news, settings }) => ({
	newsItems: news.newsItems,
	lang: settings.lang
});

export const Home = connect(
	mapStateToProps,
	{ fetchNewsRequested }
)(HomeScreen);
