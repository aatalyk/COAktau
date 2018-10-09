import React, { Component } from 'react';
import { ScrollView, Text, Dimensions, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';

import { textStyles } from '../assets';
import { AutoPagingFlatList } from '../components/home/AutoPagingFlatList';

const propTypes = {
	item: PropTypes.shape({
		imageUrls: PropTypes.arrayOf(PropTypes.string),
		title: PropTypes.string,
		body: PropTypes.string,
		navigation: PropTypes.object
	})
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class MyCityDetailed extends Component {
	state = {
		screenWidth: SCREEN_WIDTH,
		heightScaled: 0,
		videoPaused: false,
		loading: true
	};

	renderVideo = item => (
		<TouchableOpacity onPress={this.enableFullScreen}>
			<Video
				source={{
					uri:
						'https://firebasestorage.googleapis.com/v0/b/coaktau-274df.appspot.com/o/0hh1.mov?alt=media&token=13934f20-6c08-4d37-a5c3-dd6edbab55e0'
				}}
				ref={ref => {
					this.player = ref;
				}}
				style={{
					width: this.state.screenWidth,
					height: this.state.heightScaled
				}}
				resizeMode="cover"
				paused={this.state.videoPaused}
				onLoad={response => {
					const { width, height } = response.naturalSize;
					const heightScaled = height * (this.state.screenWidth / width);

					this.setState({
						heightScaled,
						videoPaused: false,
						loading: false
					});
				}}
			/>
		</TouchableOpacity>
	);

	renderImage = item => {
		return (
			<AutoPagingFlatList
				data={item.imageUrls.map(imageUrl => ({ imageUrl }))}
				onItemPress={() => null}
				manualPaging
				loadFinish={this.loadFinish}
			/>
		);
	};

	onBuffer = ({ isBuffering }) => {
		this.setState({ isBuffering });
	};

	enableFullScreen = () => {
		this.player.presentFullscreenPlayer();
	};

	loadFinish = () => this.setState({ loading: false });

	render() {
		const item = this.props.navigation.getParam('item');

		return (
			<ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.loading} />}>
				{item.imageUrls ? this.renderImage(item) : this.renderVideo(item)}
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.body}>{item.body}</Text>
			</ScrollView>
		);
	}
}

MyCityDetailed.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	title: {
		...textStyles.h1,
		marginHorizontal: 15,
		marginTop: 10
	},
	body: {
		...textStyles.p,
		marginHorizontal: 15,
		marginTop: 10,
		marginBottom: 20,
		lineHeight: 30
	}
});

export { MyCityDetailed };
