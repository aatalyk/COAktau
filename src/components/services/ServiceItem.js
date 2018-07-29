import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { textStyles } from '../../assets';

export const ServiceItem = () => (
  <TouchableOpacity>
    <View style={styles.container}>
      <Text style={styles.title}>Service</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  title: {
    marginLeft: 10,
    ...textStyles.p,
  },
});
