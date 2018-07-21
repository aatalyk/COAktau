import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import PageControl from 'react-native-page-control';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.array,
};
const SCREEN_WIDTH = Dimensions.get('window').width;

class AutoPagingFlatList extends Component {
  state = {
    currentIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { currentIndex } = this.state;
      const nextIndex = currentIndex < this.props.data.length - 1 ? currentIndex + 1 : 0;
      this.flatList.scrollToIndex({ index: nextIndex, animated: true });
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    const currentIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ currentIndex });
  };

  renderItem() {
    return (
      <Image
        resizeMode="cover"
        style={{ width: SCREEN_WIDTH, height: 150 }}
        source={{
          uri: 'https://www.telegraph.co.uk/content/dam/Travel/Cruise/river-spree-berlin.jpg',
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={(ref) => {
            this.flatList = ref;
          }}
          data={this.props.data}
          renderItem={this.renderItem}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={this.onScrollEnd}
          showsHorizontalScrollIndicator={false}
        />
        <PageControl
          style={styles.pageControl}
          numberOfPages={6}
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    elevation: 0,
    shadowColor: 'black',
    flex: 0.3,
  },
  pageControl: {
    alignSelf: 'center',
    marginTop: -15,
  },
  pageControlIndicator: {
    borderRadius: 5,
  },
  pageControlIndicatorSize: {
    width: 8,
    height: 8,
  },
});

export { AutoPagingFlatList };
