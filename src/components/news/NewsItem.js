import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { textStyles, images, colors } from "../../assets";
import { newsPropType } from "../../propTypes";
import { ScaledImage } from "../common";

const propTypes = {
  item: newsPropType,
  onPress: PropTypes.func,
  lang: PropTypes.string
};

export const NewsItem = ({ item, onPress, lang }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <ScaledImage
        defaultSource={images.placeholder}
        source={{ uri: item.imageUrl }}
      />
      <View style={styles.textContainer}>
        <Text style={textStyles.p}>{item[lang].title}</Text>
        <Text style={styles.date}>{item[lang].date}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

NewsItem.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  textContainer: {
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 10
  },
  date: {
    ...textStyles.p,
    marginTop: 5,
    fontSize: 12,
    color: colors.grayLight,
    textAlign: "left"
  },
  image: {
    resizeMode: "contain"
  }
});
