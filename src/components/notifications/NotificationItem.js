import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.object,
};

export const NotificationItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.letterContainer}>
      <Text style={styles.letter}>{item.title.charAt(0)}</Text>
    </View>
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

NotificationItem.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  letterContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: 'white',
  },
  title: {
    marginLeft: 10,
  },
});
