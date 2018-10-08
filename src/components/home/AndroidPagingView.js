import React, { Component } from "react";
import {
  ViewPagerAndroid,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";

import { images } from "../../assets";

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ imageUrl: PropTypes.string.isRequired })
  ),
  style: PropTypes.oneOf([PropTypes.object, PropTypes.number, PropTypes.array])
};

const SCREEN_WIDTH = Dimensions.get("window").width;

class AndroidPagingView extends Component {
  renderItem = (item, index) => (
    <TouchableWithoutFeedback onPress={this.onItemPress} key={`${index}`}>
      <Image
        defaultSource={images.imgPlaceholder}
        resizeMode="cover"
        style={{ width: SCREEN_WIDTH, height: 150 }}
        source={{ uri: item.imageUrl || undefined }}
      />
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <ViewPagerAndroid style={[styles.viewPager, this.props.style]}>
        {this.props.data.map((item, index) => this.renderItem(item, index))}
      </ViewPagerAndroid>
    );
  }
}

AndroidPagingView.propTypes = propTypes;

const styles = StyleSheet.create({
  viewPager: {
    flex: 1
  }
});

export { AndroidPagingView };
