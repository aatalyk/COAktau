import React, {Component} from "react";
import {View, Text, FlatList, StyleSheet, Image, Dimensions, Platform, TouchableWithoutFeedback} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PageControl from "react-native-page-control";
import PropTypes from "prop-types";

import {images, colors, textStyles} from "../../assets";
import {AndroidPagingView} from "./AndroidPagingView";

const propTypes = {
	data: PropTypes.array,
	lang: PropTypes.string,
	navigation: PropTypes.object,
	manualPaging: PropTypes.bool,
	onItemPress: PropTypes.func,
	loadFinish: PropTypes.func,
	style: PropTypes.oneOf([PropTypes.object, PropTypes.number]),
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const HEIGHT = 200;

class AutoPagingFlatList extends Component {
	state = {
		currentIndex: 0,
	};

	componentDidMount() {
		if (Platform.OS === "ios" && !this.props.manualPaging) {
			this.interval = setInterval(() => {
				const {currentIndex} = this.state;
				const {data} = this.props;
				const count = data.length;
				const nextIndex = count > 1 && currentIndex < count - 1 ? currentIndex + 1 : 0;

				if (count > 0) {
					this.flatList.scrollToIndex({
						index: nextIndex,
						animated: true,
					});
				}
			}, 2500);
		}
	}

	componentWillUnmount() {
		if (Platform.OS === "ios") {
			clearInterval(this.interval);
		}
	}

	onScrollEnd = event => {
		const contentOffset = event.nativeEvent.contentOffset;
		const viewSize = event.nativeEvent.layoutMeasurement;

		const currentIndex = Math.floor(contentOffset.x / viewSize.width);
		this.setState({currentIndex});
	};

	getItemLayout = (data, index) => ({
		length: SCREEN_WIDTH,
		offset: SCREEN_WIDTH * index,
		index,
	});

	onItemPress = () =>
		this.props.navigation &&
		this.props.navigation.navigate("NewsPage", {
			item: this.props.data[this.state.currentIndex],
			lang: this.props.lang,
		});

	renderItem = ({item}) => (
		<TouchableWithoutFeedback onPress={this.props.onItemPress || this.onItemPress}>
			<View style={styles.imageContainer}>
				<View style={styles.roundedImageContainer}>
					<Image
						defaultSource={images.imgPlaceholder}
						style={styles.image}
						source={{uri: item.icon || undefined}}
						onLoad={this.props.loadFinish}
					/>
					{!!item.title && (
						<LinearGradient
							colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]}
							style={styles.gradientTextWrapper}
						>
							<Text style={styles.itemText} numberOfLines={2}>
								{item.title}
							</Text>
						</LinearGradient>
					)}
				</View>
			</View>
		</TouchableWithoutFeedback>
	);

	keyExtractor = (_, index) => index + "";

	render() {
		const {data, style} = this.props;

		return (
			<View style={[styles.container, style]}>
				{Platform.OS === "ios" ? (
					<FlatList
						ref={ref => {
							this.flatList = ref;
						}}
						data={data}
						renderItem={this.renderItem}
						horizontal
						pagingEnabled={Platform.OS === "ios"}
						onMomentumScrollEnd={this.onScrollEnd}
						getItemLayout={this.getItemLayout}
						showsHorizontalScrollIndicator={false}
						keyExtractor={this.keyExtractor}
					/>
				) : (
					<AndroidPagingView
						data={data}
						renderItem={this.renderItem}
						onPageSelected={position => this.setState({currentIndex: position})}
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
		overflow: "visible",
		height: 250,
		width: SCREEN_WIDTH,
	},
	imageContainer: {
		width: SCREEN_WIDTH,
		height: HEIGHT,
		overflow: "hidden",
	},
	view: {},
	image: {
		width: SCREEN_WIDTH * 0.9,
		height: HEIGHT,
	},
	roundedImageContainer: {
		width: SCREEN_WIDTH * 0.9,
		height: HEIGHT,
		borderRadius: 10,
		alignSelf: "center",
		marginHorizontal: SCREEN_WIDTH * 0.05,
		overflow: "hidden",
	},
	pageControl: {
		position: "absolute",
		bottom: 10,
		alignSelf: "center",
		backgroundColor: colors.soLightBlue,
		paddingVertical: 7,
		borderRadius: 7,
	},
	pageControlIndicator: {
		borderRadius: 5,
	},
	pageControlIndicatorSize: {
		width: 8,
		height: 8,
	},
	itemText: {
		...textStyles.h3,
		marginBottom: 15,
		marginHorizontal: SCREEN_WIDTH * 0.05 + 10,
	},
	gradientTextWrapper: {
		height: HEIGHT / 2,
		justifyContent: "flex-end",
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
});

export {AutoPagingFlatList};
