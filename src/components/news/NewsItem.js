import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { fonts, textStyles } from '../../assets';

const propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  lang: PropTypes.string,
};

export const NewsItem = ({ item, onPress, lang }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Text style={styles.title}>{item[lang].title}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </View>
  </TouchableOpacity>
);

NewsItem.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    flex: 1,
    fontFamily: fonts.MerriweatherRegular,
    ...textStyles.p,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginLeft: 5,
  },
});
