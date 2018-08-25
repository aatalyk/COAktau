import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { StackActions } from "react-navigation";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { ServiceItem } from "./ServiceItem";
import { fetchServicesRequested } from "../../actions";
import { colors, textStyles, settings } from "../../assets";

const propTypes = {
  style: PropTypes.object,
  navigation: PropTypes.object,
  isPartiallyShown: PropTypes.bool,
  lang: PropTypes.string,
  data: PropTypes.array,
  fetchServicesRequested: PropTypes.func
};

class ServicesListScreen extends Component {
  componentDidMount() {
    this.props.fetchServicesRequested();
  }

  renderItem = ({ item }) => {
    const localizedItem = item[this.props.lang];
    return (
      <ServiceItem
        item={localizedItem}
        onPress={() => this.onPress(localizedItem)}
      />
    );
  };

  keyExtractor = ({ index }) => index + "";

  renderSeparator = () => <View style={styles.separator} />;

  onShowMorePress = () => {
    const action = StackActions.push({
      routeName: "ServicesList"
    });
    this.props.navigation.dispatch(action);
  };

  onPress = e => this.props.navigation.navigate("Services", { e });

  render() {
    const { isPartiallyShown, data, lang } = this.props;
    return (
      <View
        style={[
          styles.container,
          this.props.style,
          { flex: !isPartiallyShown ? 1 : undefined }
        ]}
      >
        {isPartiallyShown && (
          <Text style={styles.title}>{settings[lang].navigation.services}</Text>
        )}
        <View>
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
        {this.props.isPartiallyShown && (
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

ServicesListScreen.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.grayUltraLight,
    marginLeft: 10,
    marginRight: 10
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
  title: {
    ...textStyles.p,
    marginLeft: 15,
    marginTop: 20,
    color: colors.grayLight
  }
});

const mapStateToProps = ({ services, settings }) => ({
  data: services.data,
  lang: settings.lang
});

export const ServicesList = connect(
  mapStateToProps,
  { fetchServicesRequested }
)(ServicesListScreen);
