import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { StackActions } from "react-navigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { colors, textStyles, settings } from "../../assets";
import { SearchBar } from "../common";
import { FAQitem } from "./FAQitem";
import { fetchFAQRequested } from "../../actions";
import { faqPropType } from "../../propTypes";

const propTypes = {
  style: PropTypes.object,
  navigation: PropTypes.object,
  isPartiallyShown: PropTypes.bool,
  data: PropTypes.arrayOf(faqPropType),
  fetchFAQRequested: PropTypes.func,
  lang: PropTypes.string
};

class FAQScreen extends Component {
  componentDidMount() {
    this.props.fetchFAQRequested();
  }

  renderSeparator() {
    return <View style={styles.separator} />;
  }

  renderItem = ({ item, index }) => {
    const localizedItem = item[this.props.lang];
    return <FAQitem item={localizedItem} index={index} />;
  };

  keyExtractor = (_, index) => index + "";

  renderSearchBar = () =>
    this.props.isPartiallyShown ? (
      <Text style={styles.title}>
        {settings[this.props.lang].navigation.faq}
      </Text>
    ) : (
      <SearchBar />
    );

  onShowMorePress = () => {
    const action = StackActions.push({
      routeName: "FAQ"
    });
    this.props.navigation.dispatch(action);
  };

  getShortData = () => this.props.data.slice(0, 2);

  render() {
    const { lang, isPartiallyShown, data } = this.props;
    const faqItems = isPartiallyShown ? this.getShortData() : data;

    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          data={faqItems}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderSearchBar}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {isPartiallyShown && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={this.onShowMorePress}
          >
            <Text style={styles.showMoreText}>{settings[lang].showMore}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

FAQScreen.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  title: {
    ...textStyles.p,
    marginLeft: 15,
    marginTop: 20,
    color: colors.grayLight
  },
  showMoreButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 44
  },
  showMoreText: {
    marginRight: 15,
    color: colors.blue
  },
  separator: {
    backgroundColor: colors.grayUltraLight,
    height: 1
  }
});

const mapStateToProps = ({ faq, settings }) => ({
  data: faq.data,
  lang: settings.lang
});

export const FAQ = connect(
  mapStateToProps,
  { fetchFAQRequested }
)(FAQScreen);
