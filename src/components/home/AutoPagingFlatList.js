import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import PageControl from 'react-native-page-control';
import PropTypes from 'prop-types';

const propTypes = {
	data: PropTypes.array,
	lang: PropTypes.string,
	navigation: PropTypes.object
};
const SCREEN_WIDTH = Dimensions.get('window').width;

class AutoPagingFlatList extends Component {
	state = {
		currentIndex: 0
	};

	componentDidMount() {
		if (Platform.OS === 'ios') {
			this.interval = setInterval(() => {
				const { currentIndex } = this.state;
				const nextIndex =
					this.props.data.length > 0 && currentIndex < this.props.data.length - 1 ? currentIndex + 1 : 0;

				if (this.props.data && this.props.data.length > 0) {
					this.flatList.scrollToIndex({
						index: Math.max(nextIndex, 0),
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
		<TouchableWithoutFeedback onPress={this.onItemPress}>
			<Image
				resizeMode="cover"
				style={{ width: SCREEN_WIDTH, height: 150 }}
				source={{ uri: item.imageUrl || undefined }}
			/>
		</TouchableWithoutFeedback>
	);

	keyExtractor = (_, index) => index + '';

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					ref={ref => {
						this.flatList = ref;
					}}
					data={this.props.data.slice(0, 5)}
					renderItem={this.renderItem}
					horizontal
					pagingEnabled
					onMomentumScrollEnd={this.onScrollEnd}
					getItemLayout={this.getItemLayout}
					showsHorizontalScrollIndicator={false}
					keyExtractor={this.keyExtractor}
				/>
				<PageControl
					style={styles.pageControl}
					numberOfPages={this.props.data.length}
					currentPage={this.state.currentIndex}
					hidesForSinglePage
					pageIndicatorTintColor="gray"
					currentIndexIndicatorTintColor="white"
					indicatorStyle={styles.pageControlIndicator}
					currentIndicatorStyle={styles.pageControlIndicator}
					indicatorSize={styles.pageControlIndicatorSize}
				/>
			</View>
		);
	}
}

AutoPagingFlatList.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.5,
		elevation: 3,
		shadowColor: 'black',
		flex: 0.3,
		overflow: 'visible'
	},
	pageControl: {
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		paddingVertical: 7,
		borderRadius: 7
	},
	pageControlIndicator: {
		borderRadius: 5
	},
	pageControlIndicatorSize: {
		width: 8,
		height: 8
	}
});

export { AutoPagingFlatList };
