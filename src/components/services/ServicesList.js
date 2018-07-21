import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { ServiceItem } from './ServiceItem';

const services = [{ title: 'title', key: '1' }];

class ServicesList extends Component {
  renderItem() {
    return <ServiceItem />;
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={services} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { ServicesList };
