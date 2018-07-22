import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackActions } from 'react-navigation';
import PropTypes from 'prop-types';

import { ServiceItem } from './ServiceItem';
import { colors } from '../../assets';
import { HomeRoutes } from '../navigation';

const services = [{ title: 'title', key: '1' }, { title: 'title', key: '2' }];

const propTypes = {
  style: PropTypes.object,
  navigation: PropTypes.object,
  isPartiallyShown: PropTypes.bool,
};

class ServicesList extends Component {
  renderItem() {
    return <ServiceItem />;
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  onShowMorePress = () => {
    const action = StackActions.push({
      routeName: HomeRoutes.Services,
    });
    this.props.navigation.dispatch(action);
  };

  render() {
    const { isPartiallyShown } = this.props;
    return (
      <View style={[styles.container, this.props.style, { flex: !isPartiallyShown && 1 }]}>
        <View>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            data={services}
            renderItem={this.renderItem}
          />
        </View>
        {this.props.isPartiallyShown && (
          <TouchableOpacity style={styles.showMoreButton} onPress={this.onShowMorePress}>
            <Text style={styles.showMoreText}>SHOW MORE</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: colors.grayLight,
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
    color: colors.blue,
  },
});

export { ServicesList };
