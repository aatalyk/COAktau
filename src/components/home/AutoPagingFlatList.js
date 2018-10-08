import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import PageControl from 'react-native-page-control';
import PropTypes from 'prop-types';

import { images } from '../../assets';
import { AndroidPagingView } from './AndroidPagingView';

const propTypes = {
	data: PropTypes.array,
	lang: PropTypes.string,
	navigation: PropTypes.object,
	manualPaging: PropTypes.bool,
	onItemPress: PropTypes.func,
	style: PropTypes.oneOf([PropTypes.object, PropTypes.number])
};

const SCREEN_WIDTH = Dimensions.get('window').width;

class AutoPagingFlatList extends Component {
<<<<<<< HEAD
	state = {
		currentIndex: 0
	};

	componentDidMount() {
		if (Platform.OS === 'ios' && !this.props.manualPaging) {
			this.interval = setInterval(() => {
				const { currentIndex } = this.state;
				const { data } = this.props;
				const count = Math.min(5, data.length - 1);
				const nextIndex =
					data.slice(0, count).length > 0 && currentIndex < data.slice(0, count).length - 1
						? currentIndex + 1
						: 0;

				if (data.slice(0, count) && data.slice(0, count).length > 0) {
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

	onItemPress = () => {
		console.warn('Pressed');
		this.props.navigation &&
			this.props.navigation.navigate('NewsPage', {
				item: this.props.data[this.state.currentIndex],
				lang: this.props.lang
			});
	};

	renderItem = ({ item }) => (
		<TouchableWithoutFeedback onPress={this.props.onItemPress || this.onItemPress}>
			<Image
				defaultSource={images.imgPlaceholder}
				resizeMode="cover"
				style={{ width: SCREEN_WIDTH, height: 150 }}
				source={{ uri: item.imageUrl || undefined }}
			/>
		</TouchableWithoutFeedback>
	);

	keyExtractor = (_, index) => index + '';

	render() {
		const { data, style } = this.props;

		if (Platform.OS === 'android') {
			return <AndroidPagingView data={data} style={[styles.container, style]} onItemPress={this.onItemPress} />;
		}

		return (
			<View style={[styles.container, style]}>
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
				{!!data &&
					data.length > 1 && (
						<PageControl
							style={styles.pageControl}
							numberOfPages={data.length}
							currentPage={this.state.currentIndex}
							hidesForSinglePage
							pageIndicatorTintColor="gray"
							currentIndexIndicatorTintColor="white"
							indicatorStyle={styles.pageControlIndicator}
							currentIndicatorStyle={styles.pageControlIndicator}
							indicatorSize={styles.pageControlIndicatorSize}
						/>
					)}
			</View>
		);
	}
=======
  state = {
    currentIndex: 0
  };

  componentDidMount() {
    if (Platform.OS === "ios" && !this.props.manualPaging) {
      this.interval = setInterval(() => {
        const { currentIndex } = this.state;
        const { data } = this.props;
        const count = Math.min(5, data.length - 1);
        const nextIndex =
          data.slice(0, count).length > 0 &&
          currentIndex < data.slice(0, count).length - 1
            ? currentIndex + 1
            : 0;

        if (data.slice(0, count) && data.slice(0, count).length > 0) {
          this.flatList.scrollToIndex({
            index: nextIndex,
            animated: true
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
    this.setState({ currentIndex });
  };

  getItemLayout = (data, index) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index
  });

  onItemPress = () =>
    this.props.navigation &&
    this.props.navigation.navigate("NewsPage", {
      item: this.props.data[this.state.currentIndex],
      lang: this.props.lang
    });

  renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={this.props.onItemPress || this.onItemPress}
    >
      <Image
        defaultSource={images.imgPlaceholder}
        resizeMode="cover"
        style={{ width: SCREEN_WIDTH, height: 150 }}
        source={{ uri: item.imageUrl || undefined }}
      />
    </TouchableWithoutFeedback>
  );

  keyExtractor = (_, index) => index + "";

  render() {
    const { data, style } = this.props;

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
            onItemPress={this.props.onItemPress || this.onItemPress}
            onPageSelected={position =>
              this.setState({ currentIndex: position })
            }
          />
        )}
        {!!data &&
          data.length > 1 && (
            <PageControl
              style={styles.pageControl}
              numberOfPages={data.length}
              currentPage={this.state.currentIndex}
              hidesForSinglePage
              pageIndicatorTintColor="gray"
              currentIndexIndicatorTintColor="white"
              indicatorStyle={styles.pageControlIndicator}
              currentIndicatorStyle={styles.pageControlIndicator}
              indicatorSize={styles.pageControlIndicatorSize}
            />
          )}
      </View>
    );
  }
>>>>>>> master
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
