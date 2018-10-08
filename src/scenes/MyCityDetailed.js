import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { textStyles } from "../assets";
import { AutoPagingFlatList } from "../components/home/AutoPagingFlatList";

const propTypes = {
  item: PropTypes.shape({
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    body: PropTypes.string,
    navigation: PropTypes.object
  })
};

class MyCityDetailed extends Component {
  render() {
    const item = this.props.navigation.getParam("item");

    return (
      <View style={styles.container}>
        <AutoPagingFlatList
          data={item.imageUrls.map(imageUrl => ({ imageUrl }))}
          onItemPress={() => null}
          manualPaging
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  }
}

MyCityDetailed.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  title: {
    ...textStyles.h1,
    marginHorizontal: 15,
    marginTop: 10
  },
  body: {
    ...textStyles.p,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 30
  }
});

export { MyCityDetailed };
