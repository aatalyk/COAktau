import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import PageControl from 'react-native-page-control';
import PropTypes from 'prop-types';

import { images, colors, textStyles } from '../../assets';
import { AndroidPagingView } from './AndroidPagingView';

const propTypes = {
	data: PropTypes.array,
	lang: PropTypes.string,
	navigation: PropTypes.object,
	manualPaging: PropTypes.bool,
	onItemPress: PropTypes.func,
	loadFinish: PropTypes.func,
	style: PropTypes.oneOf([PropTypes.object, PropTypes.number])
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const HEIGHT = 200;

class AutoPagingFlatList extends Component {
	state = {
		currentIndex: 0
	};

	componentDidMount() {
		if (Platform.OS === 'ios' && !this.props.manualPaging) {
			this.interval = setInterval(() => {
				const { currentIndex } = this.state;
				const { data } = this.props;
				const count = data.length;
				const nextIndex = count > 1 && currentIndex < count - 1 ? currentIndex + 1 : 0;

				if (count > 0) {
					this.flatList.scrollToIndex({
						index: nextIndex,
						animated: true
					});
				}
			}, 2500);
		}
	}

	componentWillUnmount() {
		if (Platform.OS === 'ios') {
			clearInterval(this.interval);
		}
	}

	onScrollEnd = event => {
		const contentOffset = event.nativeEvent.contentOffset;
		const viewSize = event.nativeEvent.layoutMeasurement;

		const currentIndex = Math.floor(contentOffset.x / viewSize.width);
		this.setState({ currentIndex });
	};

	getItemLayout = (data, index) => ({
		length: SCREEN_WIDTH,
		offset: SCREEN_WIDTH * index,
		index
	});

	onItemPress = () =>
		this.props.navigation &&
		this.props.navigation.navigate('NewsPage', {
			item: this.props.data[this.state.currentIndex],
			lang: this.props.lang
		});

	renderItem = ({ item }) => (
		<TouchableWithoutFeedback onPress={this.props.onItemPress || this.onItemPress}>
			<View style={styles.imageContainer}>
				<Image
					defaultSource={images.imgPlaceholder}
					style={styles.image}
					source={{ uri: item.icon || undefined }}
					onLoad={this.props.loadFinish}
				/>
				{item.title && (
					<Text style={styles.itemText} numberOfLines={2}>
						{item.title}
					</Text>
				)}
			</View>
		</TouchableWithoutFeedback>
	);

	keyExtractor = (_, index) => index + '';

	render() {
		const { data, style } = this.props;

		return (
			<View style={[styles.container, style]}>
				{Platform.OS === 'ios' ? (
					<FlatList
						ref={ref => {
							this.flatList = ref;
						}}
						data={data}
						renderItem={this.renderItem}
						horizontal
						pagingEnabled={Platform.OS === 'ios'}
						onMomentumScrollEnd={this.onScrollEnd}
						getItemLayout={this.getItemLayout}
						showsHorizontalScrollIndicator={false}
						keyExtractor={this.keyExtractor}
					/>
				) : (
					<AndroidPagingView
						data={data}
						renderItem={this.renderItem}
						onPageSelected={position => this.setState({ currentIndex: position })}
					/>
				)}
				{!!data && (
					<PageControl
						style={styles.pageControl}
						numberOfPages={data.length}
						currentPage={this.state.currentIndex}
						pageIndicatorTintColor={colors.soBlue}
						currentIndexIndicatorTintColor="white"
						indicatorStyle={styles.pageControlIndicator}
						currentIndicatorStyle={styles.pageControlIndicator}
						indicatorSize={styles.pageControlIndicatorSize}
					/>
				)}
			</View>
		);
	}
}

AutoPagingFlatList.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		overflow: 'visible',
		height: 250,
		width: SCREEN_WIDTH
	},
	imageContainer: {
		width: SCREEN_WIDTH,
		height: HEIGHT
	},
	view: {},
	image: {
		width: SCREEN_WIDTH * 0.9,
		height: HEIGHT,
		borderRadius: 10,
		alignSelf: 'center',
		marginHorizontal: SCREEN_WIDTH * 0.05
	},
	pageControl: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		backgroundColor: colors.soLightBlue,
		paddingVertical: 7,
		borderRadius: 7
	},
	pageControlIndicator: {
		borderRadius: 5
	},
	pageControlIndicatorSize: {
		width: 8,
		height: 8
	},
	itemText: {
		...textStyles.h3,
		position: 'absolute',
		marginHorizontal: SCREEN_WIDTH * 0.05 + 10,
		bottom: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.2)'
	}
});

export { AutoPagingFlatList };
