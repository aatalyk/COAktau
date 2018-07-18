import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  leftItem: PropTypes.node,
  rightItem: PropTypes.node,
  title: PropTypes.node,
};

export const Header = ({ leftItem, rightItem, title }) => (
  <View style={styles.container}>
    <View style={styles.leftItem}>{leftItem}</View>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.rightItem}>{rightItem}</View>
  </View>
);

Header.propTypes = propTypes;

const styles = {
  container: {
    marginTop: 8,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: 'black',
  },
  leftItem: {
    marginLeft: 10,
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  rightItem: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
};
