import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ServicesAndFAQ } from '../components/services';
import { AutoPagingFlatList } from '../components/home/AutoPagingFlatList';
import { colors } from '../assets';
import { fetchNewsRequested } from '../actions';
import { Notifications } from './Notifications';

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
		routes: [{ key: 'first', title: 'First' }, { key: 'second', title: 'Second' }]
	};

	constructor(props) {
		super(props);
		this.props.fetchNewsRequested();
	}

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
		return (
			<View style={styles.container}>
				<AutoPagingFlatList
					data={this.props.newsItems}
					lang={this.props.lang}
					navigation={this.props.navigation}
				/>
				<TabView
					renderTabBar={this.renderTabBar}
					navigationState={this.state}
					renderScene={SceneMap({
						first: () => <Notifications />,
						second: () => <ServicesAndFAQ navigation={this.props.navigation} />
					})}
					onIndexChange={this.onTabViewIndexChange}
					initialLayout={styles.tabViewInitialLayout}
					style={{ marginTop: Platform.OS === 'ios' ? 0 : -5 }}
					useNativeDriver
				/>
			</View>
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
