import React, { Component } from "react";
import { ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import PropTypes from "prop-types";

import { textStyles } from "../../assets";
import { ScaledImage } from "../common";

const propTypes = {
  navigation: PropTypes.object
};

const SCREEN_WIDTH = Dimensions.get("window").width;

class NewsPage extends Component {
  render() {
    const item = this.props.navigation.getParam("item");
    const lang = this.props.navigation.getParam("lang");

    return (
      <ScrollView style={styles.container}>
        <ScaledImage source={{ uri: item.imageUrl }} />
        <Text style={styles.title}>{item[lang].title}</Text>
        <Text style={styles.description}>{item[lang].content}</Text>
      </ScrollView>
    );
  }
}

NewsPage.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white"
  },
  image: {
    width: SCREEN_WIDTH,
    height: 200
  },
  title: {
    ...textStyles.h1,
    marginHorizontal: 15,
    marginTop: 10
  },
  description: {
    ...textStyles.p,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 30
  }
});

export { NewsPage };
