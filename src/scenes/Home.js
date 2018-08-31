import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Platform, NetInfo } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from '../store';

import { ServicesAndFAQ } from '../components/services';
import { AutoPagingFlatList } from '../components/home/AutoPagingFlatList';
import { colors, settings } from '../assets';
import { fetchNewsRequested } from '../actions';
import { Notifications } from '../components/notifications';
import { ConnectionPage } from '../components/common';

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
				title: settings[store.getState().settings.lang].navigation.faq
			}
		],
		connected: true
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

	render() {
		const { lang, navigation, newsItems } = this.props;
		return this.state.connected ? (
			<View style={styles.container}>
				<AutoPagingFlatList data={newsItems} lang={lang} navigation={navigation} />
				<TabView
					renderTabBar={this.renderTabBar}
					navigationState={this.state}
					renderScene={SceneMap({
						first: () => <Notifications navigation={navigation} />,
						second: () => <ServicesAndFAQ navigation={navigation} />
					})}
					onIndexChange={this.onTabViewIndexChange}
					initialLayout={styles.tabViewInitialLayout}
					style={{ marginTop: Platform.OS === 'ios' ? 0 : -5 }}
					useNativeDriver
				/>
			</View>
		) : (
			<ConnectionPage lang={lang} onPress={this.checkConnection} />
		);
	}
}

HomeScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	tabbar: {
		backgroundColor: Platform.OS === 'android' ? 'white' : colors.transparent,
		height: 44,
		borderBottomColor: colors.grayUltraLight,
		borderBottomWidth: 1
	},
	tabbarLabel: {
		color: 'black'
	},
	tabbarIndicator: {
		backgroundColor: colors.blue,
		height: 3
	},
	tabViewInitialLayout: {
		width: SCREEN_WIDTH,
		height: 44
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
