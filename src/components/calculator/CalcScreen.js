import React, { Component } from "react";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Calculator } from "./Calculator";
import { FAQItem } from "./FAQItem";
import { fetchCalcParamsRequested, fetchCalcFaqRequested } from "../../actions";

const propTypes = {
  navigation: PropTypes.object,
  lang: PropTypes.string,
  fetchCalcParamsRequested: PropTypes.func,
  fetchCalcFaqRequested: PropTypes.func,
  params: PropTypes.object,
  faq: PropTypes.object
};

class Calc extends Component {
  componentDidMount() {
    this.fetchParamsFAQ();
  }

  renderItem = ({ item, index }) => <FAQItem item={item} index={index} />;

  fetchParamsFAQ = () => {
    this.props.fetchCalcParamsRequested();
    this.props.fetchCalcFaqRequested();
  };

  onScroll() {
    Keyboard.dismiss();
  }

  render() {
    const { faq, params, navigation, lang } = this.props;
    return (
      <ScrollView style={styles.container} onScroll={this.onScroll}>
        <KeyboardAvoidingView
          behavior={Platform.select({
            ios: "position",
            android: null
          })}
        >
          <Calculator
            lang={lang}
            navigation={navigation}
            livingCost={params.livingCost}
            povertyMin={params.povertyMin}
          />
          <FlatList
            data={faq}
            renderItem={this.renderItem}
            keyExtractor={(_, index) => index + ""}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

Calc.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

const mapStateToProps = ({ settings, calc }) => ({
  lang: settings.lang,
  params: calc.params,
  faq: calc.faq
});

export const CalcScreen = connect(
  mapStateToProps,
  { fetchCalcParamsRequested, fetchCalcFaqRequested }
)(Calc);
