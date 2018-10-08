import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { AutoPagingFlatList } from "../components/home/AutoPagingFlatList";

const propTypes = {
  data: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  lang: PropTypes.oneOf(["kaz", "rus"])
};

const data = [
  {
    imageUrls: [
      "https://sportshub.cbsistatic.com/i/r/2018/09/13/358b7d4f-ad4c-434a-89e7-089c39bd7d96/thumbnail/770x433/333e34ee5754a4291d887656c1ad4f2e/gennady-golovkin-training-canelo.jpg",
      "https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg"
    ],
    title: "Title goi mynau",
    body: "Body ma ne mynau"
  },
  {
    imageUrls: [
      "https://sportshub.cbsistatic.com/i/r/2018/09/13/358b7d4f-ad4c-434a-89e7-089c39bd7d96/thumbnail/770x433/333e34ee5754a4291d887656c1ad4f2e/gennady-golovkin-training-canelo.jpg",
      "https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/embed/public/2018/09/28/canelo-alvarez-gennady-golovkin.jpg"
    ],
    title: "Title goi mynau",
    body: "Body ma ne mynau"
  }
];

class MyCityScreen extends Component {
  onItemPress = index => () => {
    const { navigation, lang } = this.props;

    navigation.navigate("MyCityDetailed", {
      item: data[index],
      lang
    });
  };

  renderItem = index => (
    <AutoPagingFlatList
      data={data[index].imageUrls.map(imageUrl => ({
        imageUrl
      }))}
      key={`${index}`}
      onItemPress={this.onItemPress(index)}
      style={styles.autoPagingFlatList}
      manualPaging
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {data.map((_, index) => this.renderItem(index))}
      </View>
    );
  }
}

MyCityScreen.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  autoPagingFlatList: {
    flex: 0
  }
});

const mapStateToProps = ({ settings }) => ({
  lang: settings.lang
});

export const MyCity = connect(mapStateToProps)(MyCityScreen);
