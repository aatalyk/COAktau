import React, { Component } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';
import PageControl from 'react-native-page-control';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => <View style={[styles.container, { backgroundColor: '#ff4081' }]} />;
const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;

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
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    header: () => (
      <Header title="Home" leftItem={<MenuButton onPress={() => navigation.openDrawer()} />} />
    ),
  });

  state = {
    currentPage: 0,
    index: 0,
    routes: [{ key: 'first', title: 'First' }, { key: 'second', title: 'Second' }],
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

  renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabbar}
      labelStyle={styles.tabbarLabel}
      indicatorStyle={styles.tabbarIndicator}
    />
  );

  onTabViewIndexChange = (index) => this.setState({ index });

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
            currentPageIndicatorTintColor="white"
            indicatorStyle={styles.pageControlIndicator}
            currentIndicatorStyle={styles.pageControlIndicator}
            indicatorSize={styles.pageControlIndicatorSize}
          />
        </View>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          onIndexChange={this.onTabViewIndexChange}
          initialLayout={styles.tabViewInitialLayout}
          style={styles.tabView}
          useNativeDriver
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.4,
    elevation: 1,
    shadowColor: 'black',
    flex: 0.3,
  },
  tabbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  tabbarLabel: {
    color: 'black',
  },
  tabbarIndicator: {
    backgroundColor: 'blue',
  },
  tabView: {
    marginTop: 5,
  },
  tabViewInitialLayout: {
    width: SCREEN_WIDTH,
    height: 44,
  },
  pageControlIndicator: {
    borderRadius: 5,
  },
  pageControlIndicatorSize: {
    width: 8,
    height: 8,
  },
});

export { Home };
