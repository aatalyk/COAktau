import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { images } from '../../assets';

export const ServiceItem = () => (
  <TouchableOpacity>
    <View style={styles.container}>
      <Image source={images.news} style={styles.image} />
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
  image: {
    width: 44,
    height: 44,
  },
  title: {
    marginLeft: 10,
  },
});
