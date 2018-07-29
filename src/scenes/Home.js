import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import PropTypes from 'prop-types';

import { ServicesAndFAQ } from '../components/services';
import { AutoPagingFlatList } from '../components/home/AutoPagingFlatList';
import { colors } from '../assets';

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: colors.blueUltraLight }]} />
);

const SCREEN_WIDTH = Dimensions.get('window').width;
const mockData = [
  { key: 'a' },
  { key: 'b' },
  { key: 'c' },
  { key: 'd' },
  { key: 'e' },
  { key: 'f' },
];

const propTypes = {
  navigation: PropTypes.object,
};

class Home extends Component {
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
            second: () => <ServicesAndFAQ navigation={this.props.navigation} />,
          })}
          onIndexChange={this.onTabViewIndexChange}
          initialLayout={styles.tabViewInitialLayout}
          style={{ marginTop: Platform.OS === 'ios' ? 0 : -5 }}
          useNativeDriver
        />
      </View>
    );
  }
}

Home.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabbar: {
    backgroundColor: Platform.OS === 'android' ? 'white' : colors.transparent,
    height: 44,
    borderBottomColor: colors.grayUltraLight,
    borderBottomWidth: 1,
  },
  tabbarLabel: {
    color: 'black',
  },
  tabbarIndicator: {
    backgroundColor: colors.blue,
    height: 3,
  },
  tabViewInitialLayout: {
    width: SCREEN_WIDTH,
    height: 44,
  },
});

export { Home };
