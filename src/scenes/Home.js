import React, {Component} from "react";
import {ScrollView, Dimensions, StyleSheet, Platform, NetInfo, View} from "react-native";
import {TabView, TabBar, SceneMap} from "react-native-tab-view";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {store} from "../store";

import {ServicesAndFAQ} from "../components/services";
import {AutoPagingFlatList} from "../components/home/AutoPagingFlatList";
import {colors, settings} from "../assets";
import {fetchNewsRequested} from "../actions";
import {NotificationItem} from "../components/notifications/NotificationItem";

const SCREEN_WIDTH = Dimensions.get("window").width;

const propTypes = {
	navigation: PropTypes.object,
	newsItems: PropTypes.array,
	fetchNewsRequested: PropTypes.func,
	lang: PropTypes.string,
	notifsItems: PropTypes.array,
};

class HomeScreen extends Component {
	state = {
		index: 0,
		routes: [
			{
				key: "first",
				title: settings[store.getState().settings.lang].navigation.notifs,
			},
			{
				key: "second",
				title: settings[store.getState().settings.lang].navigation.myServices,
			},
		],
		connected: true,
	};

	constructor(props) {
		super(props);
		this.props.fetchNewsRequested();
	}

	componentDidMount() {
		this.checkConnection();
		NetInfo.addEventListener("connectionChange", this.handleFirstConnectivityChange);
	}

	checkConnection = () => {
		NetInfo.getConnectionInfo().then(connectionInfo => {
			const connected = connectionInfo.type !== "none";
			this.setState({connected});
		});
	};

	handleFirstConnectivityChange = connectionInfo => {
		const connected = connectionInfo.type !== "none";
		this.setState({connected});
	};

	renderTabBar = props => (
		<TabBar {...props} style={styles.tabbar} labelStyle={styles.tabbarLabel} indicatorStyle={styles.tabbarIndicator} />
	);

	onTabViewIndexChange = index => this.setState({index});

	render() {
		const {lang, navigation, newsItems, notifsItems} = this.props;

		const news = newsItems.filter(newsItem => newsItem.isMain);

		return (
			<ScrollView showsVerticalScrollIndicator={false} style={[styles.container]}>
				<AutoPagingFlatList data={news} lang={lang} navigation={navigation} />
				<TabView
					renderTabBar={this.renderTabBar}
					navigationState={this.state}
					renderScene={SceneMap({
						first: () => (
							<View style={styles.notificationsContainer}>
								{[...notifsItems].slice(0, 30).map((item, index) => (
									<NotificationItem
										item={item}
										onPress={() => navigation.navigate("NotificationPage", {item})}
										key={index}
									/>
								))}
							</View>
						),
						second: () => <ServicesAndFAQ navigation={navigation} />,
					})}
					onIndexChange={this.onTabViewIndexChange}
					initialLayout={styles.tabViewInitialLayout}
					style={styles.tabView}
					useNativeDriver
				/>
			</ScrollView>
		);
	}
}

HomeScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	tabView: {
		marginTop: Platform.OS === "ios" ? 0 : -5,
	},
	tabbar: {
		backgroundColor: Platform.OS === "android" ? "white" : colors.transparent,
		height: 60,
		justifyContent: "center",
	},
	tabbarLabel: {
		color: "black",
		textAlign: "center",
	},
	tabbarIndicator: {
		backgroundColor: colors.soBlue,
		height: 3,
	},
	tabViewInitialLayout: {
		width: SCREEN_WIDTH,
		height: 200,
	},
	notificationsContainer: {
		flex: 1,
		backgroundColor: colors.soLightBlue,
		paddingBottom: 20,
		paddingHorizontal: 10,
	},
});

const mapStateToProps = ({news, settings, notifs}) => ({
	newsItems: news.newsItems,
	lang: settings.lang,
	notifsItems: notifs.notifsItems,
});

export const Home = connect(
	mapStateToProps,
	{fetchNewsRequested},
)(HomeScreen);
