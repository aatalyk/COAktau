import React, { Component } from 'react';
import {
	View,
	Button,
	Image,
	ScrollView,
	Text,
	Dimensions,
	RefreshControl,
	WebView,
	AppState,
	StyleSheet
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { images, textStyles, colors } from '../assets';
import { fetchMyCityItemRequested } from '../actions';
import { PlaceHolder } from '../components/common';
import { AutoPagingFlatList } from '../components/home/AutoPagingFlatList';
import { addViewCount } from '../config';

const propTypes = {
	loading: PropTypes.bool,
	fetchMyCityItemRequested: PropTypes.func,
	newsItem: PropTypes.object,
	navigation: PropTypes.object
};

const SCREEN_WIDTH = Dimensions.get('window').width;

class MyCityDetailedScreen extends Component {
	state = {
		appState: AppState.currentState,
		screenWidth: SCREEN_WIDTH,
		heightScaled: 0,
		videoPaused: false,
		loading: true
	};

	componentDidMount() {
		this.fetchMyCityItem();
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	handleAppStateChange = nextAppState => {
		this.setState({ appState: nextAppState });
	};

	fetchMyCityItem() {
		const { id } = this.props.navigation.getParam('item', {});
		addViewCount('myCity', id);
		this.props.fetchMyCityItemRequested(id);
	}

	renderVideo = newsItem => {
		const videoID = newsItem.video.split('v=')[1].substring(0, 11);
		return this.state.appState === 'active' ? (
			<WebView
				style={styles.webView}
				source={{ uri: `https://www.youtube.com/embed/${videoID}?autoplay=0?controls=0?modestbranding=1` }}
				mediaPlaybackRequiresUserAction
				scalesPageToFit
				domStorageEnabled
				bounces={false}
				scrollEnabled={false}
			/>
		) : (
			<View />
		);
	};

	renderImage = newsItem => {
		return (
			<AutoPagingFlatList
				data={newsItem.imageUrls.map(imageUrl => ({ icon: imageUrl }))}
				onItemPress={() => null}
				manualPaging
				loadFinish={this.loadFinish}
			/>
		);
	};

	renderNode = (node, index, siblings, parent, defaultRenderer) => {
		if (node.name == 'img') {
			return <Image source={{ uri: node.attribs.src }} style={{ width: 200, height: 200 }} />;
		}
	};

	onBuffer = ({ isBuffering }) => {
		this.setState({ isBuffering });
	};

	loadFinish = () => {
		this.setState({ loading: false });
	};

	render() {
		const { loading, newsItem } = this.props;
		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolder />
			</View>
		) : (
			<ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={false} />}>
				{newsItem.imageUrls.length > 1 ? this.renderImage(newsItem) : this.renderVideo(newsItem)}
				<Text style={styles.title}>{newsItem.title}</Text>
				<View style={styles.line} />
				<View style={styles.view}>
					<Image style={styles.icon} source={images.view} />
					<Text style={styles.text}>{newsItem.viewCount + 1}</Text>
				</View>
				<HTMLView value={newsItem.body} renderNode={this.renderNode} style={styles.body} stylesheet={styles} />
			</ScrollView>
		);
	}
}

MyCityDetailedScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	webView: {
		alignSelf: 'stretch',
		height: 300
	},
	placeHolderContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	view: {
		flexDirection: 'row',
		margin: 20,
		marginBottom: 0
	},
	icon: {
		width: 20,
		height: 20,
		marginRight: 10
	},
	text: {
		flex: 1,
		...textStyles.p,
		color: colors.grayDark
	},
	title: {
		...textStyles.h2,
		marginHorizontal: 15,
		margin: 20
	},
	line: {
		backgroundColor: colors.soBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.2,
		marginLeft: 20,
		borderRadius: 2
	},
	body: {
		...textStyles.p,
		marginHorizontal: 15,
		margin: 20,
		lineHeight: 30
	},
	htmlView: {
		margin: 10
	},
	p: {
		...textStyles.p
	},
	a: {
		fontWeight: '300',
		color: '#FF3366' // make links coloured pink
	},
	b: {
		fontWeight: 'bold'
	}
});

const mapStateToProps = ({ myCityItem }) => ({
	loading: myCityItem.loading,
	newsItem: myCityItem.newsItem
});

export const MyCityDetailed = connect(
	mapStateToProps,
	{ fetchMyCityItemRequested }
)(MyCityDetailedScreen);
