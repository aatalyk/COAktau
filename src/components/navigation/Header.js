import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, textStyles } from '../../assets';

const propTypes = {
  leftItem: PropTypes.node,
  rightItem: PropTypes.node,
  title: PropTypes.node,
};

export const Header = ({ leftItem, rightItem, title }) => (
  <View>
    <View style={styles.orangeView} />
    <View style={styles.container}>
      <View style={styles.leftItem}>{leftItem}</View>
      <Text style={textStyles.p}>{title}</Text>
      <View style={styles.rightItem}>{rightItem}</View>
    </View>
  </View>
);

Header.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
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
  orangeView: {
    backgroundColor: colors.orange,
    height: 20,
  },
});
