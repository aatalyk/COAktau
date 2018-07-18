import React, { Component } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import PageControl from 'react-native-page-control';

import { MenuButton, Header } from '../components/navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const mockData = [
  { key: 'a' },
  { key: 'b' },
  { key: 'c' },
  { key: 'd' },
  { key: 'e' },
  { key: 'f' },
];

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    header: () => <Header title="Home" leftItem={<MenuButton />} />,
  };

  state = {
    currentPage: 0,
  };

  onScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    const currentPage = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ currentPage });
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
        <View style={styles.adsList}>
          <FlatList
            data={mockData}
            renderItem={this.renderItem}
            horizontal
            pagingEnabled
            onMomentumScrollEnd={this.onScrollEnd}
            showsHorizontalScrollIndicator={false}
          />
          <PageControl
            style={styles.pageControl}
            numberOfPages={6}
            currentPage={this.state.currentPage}
            hidesForSinglePage
            pageIndicatorTintColor="gray"
            currentPageIndicatorTintColor="red"
            indicatorStyle={{ borderRadius: 5 }}
            currentIndicatorStyle={{ borderRadius: 5 }}
            indicatorSize={{ width: 8, height: 8 }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pageControl: {
    alignSelf: 'center',
    marginTop: -15,
  },
  adsList: {
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: 'black',
  },
};

export { Home };
