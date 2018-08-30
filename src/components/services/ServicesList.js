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
  fetchServicesRequested: PropTypes.func,
  myServices: PropTypes.array,
  showsMyServices: PropTypes.bool
};

class ServicesListScreen extends Component {
  componentDidMount() {
    this.props.fetchServicesRequested();
  }

  renderItem = ({ item }) => (
    <ServiceItem item={item} onPress={() => this.onPress(item)} />
  );

  keyExtractor = (_, index) => index + "";

  renderSeparator = () => <View style={styles.separator} />;

  onShowMorePress = () => {
    const action = StackActions.push({
      routeName: "ServicesList"
    });
    this.props.navigation.dispatch(action);
  };

  onPress = e => this.props.navigation.navigate("Services", { e });

  getShortData = data => data.slice(0, 2);

  render() {
    const {
      isPartiallyShown,
      data,
      lang,
      showsMyServices,
      myServices
    } = this.props;
    const serviceItems =
      isPartiallyShown || showsMyServices ? myServices : data;

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
          {serviceItems.length === 0 ? (
            <Text style={styles.noDataText}>
              {settings[lang].text.noMyServices}
            </Text>
          ) : (
            <FlatList
              data={serviceItems}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.renderSeparator}
            />
          )}
        </View>
        {isPartiallyShown && (
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={this.onShowMorePress}
          >
            <Text style={styles.showMoreText}>
              {settings[lang].buttons.showMore}
            </Text>
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
  },
  noDataText: {
    ...textStyles.p,
    marginHorizontal: 15,
    marginTop: 20,
    textAlign: "center",
    fontSize: 12
  }
});

const mapStateToProps = ({ services, settings, myServices }) => ({
  myServices,
  data: services.data,
  lang: settings.lang
});

export const ServicesList = connect(
  mapStateToProps,
  { fetchServicesRequested }
)(ServicesListScreen);
