import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { textStyles } from "../../assets";

const propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string
  }),
  onPress: PropTypes.func,
  lang: PropTypes.oneOf(["kaz", "rus"])
};

const ServiceItemScreen = ({ item, onPress, lang }) => {
  const localizedItem = item[lang];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {!!localizedItem.icon && (
          <Image source={{ uri: localizedItem.icon }} style={styles.image} />
        )}
        {!!localizedItem.title && (
          <Text style={styles.title}>{localizedItem.title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

ServiceItemScreen.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 15
  },
  image: {
    width: 30,
    height: 30
  },
  title: {
    marginLeft: 10,
    ...textStyles.p
  }
});

const mapStateToProps = ({ settings }) => ({ lang: settings.lang });

export const ServiceItem = connect(mapStateToProps)(ServiceItemScreen);
