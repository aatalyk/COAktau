import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { ServicesAndQuestions } from '../components/services';
import { AutoPagingFlatList } from '../components/home/AutoPagingFlatList';

const FirstRoute = () => <View style={[styles.container, { backgroundColor: '#ff4081' }]} />;
const SecondRoute = () => <ServicesAndQuestions />;

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
    index: 0,
    routes: [{ key: 'first', title: 'First' }, { key: 'second', title: 'Second' }],
  };

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
        <AutoPagingFlatList data={mockData} />
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
});

export { Home };
