import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { NotificationItem } from '../components/notifications';
import { colors } from '../assets';

const MOCK_DATA = [{ key: '1', title: 'Abcdefg' }, { key: '2', title: 'Abcdefg' }];

class Notifications extends Component {
  renderItem = ({ item }) => <NotificationItem item={item} />;

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={MOCK_DATA}
          renderItem={this.renderItem}
          style={styles.flatList}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueUltraLight,
  },
  flatList: {
    flex: 1,
    marginVertical: 20,
  },
  separator: {
    backgroundColor: colors.grayUltraLight,
    height: 1,
  },
});

export { Notifications };
