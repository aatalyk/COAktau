import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import { ServiceItem } from './ServiceItem';

const services = [{ title: 'title', key: '1' }, { title: 'title', key: '2' }];

const propTypes = {
  style: PropTypes.object,
};

class ServicesList extends Component {
  renderItem() {
    return <ServiceItem />;
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            data={services}
            renderItem={this.renderItem}
          />
        </View>
        <TouchableOpacity style={styles.showMoreButton}>
          <Text style={styles.showMoreText}>SHOW MORE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ServicesList.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'gray',
    height: 1,
    marginLeft: 70,
  },
  showMoreButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 44,
  },
  showMoreText: {
    marginRight: 15,
    color: 'blue',
  },
});

export { ServicesList };
