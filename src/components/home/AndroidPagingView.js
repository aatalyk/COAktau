import React, { Component } from 'react';
import { View, ViewPagerAndroid, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { images } from '../../assets';

const propTypes = {
	data: PropTypes.array,
	style: PropTypes.oneOf([PropTypes.object, PropTypes.number, PropTypes.array]),
	onPageSelected: PropTypes.func,
	onItemPress: PropTypes.func
};

const SCREEN_WIDTH = Dimensions.get('window').width;

class AndroidPagingView extends Component {
	onPageSelected = ({ nativeEvent }) => {
		this.props.onPageSelected(nativeEvent.position);
	};

	renderItem = (item, index) => {
		console.log(item);
		return (
			<View key={`${index}`}>
				<TouchableWithoutFeedback onPress={this.props.onItemPress}>
					<Image
						defaultSource={images.imgPlaceholder}
						resizeMode="cover"
						style={{ width: SCREEN_WIDTH, height: 150 }}
						source={{ uri: item.icon }}
					/>
				</TouchableWithoutFeedback>
			</View>
		);
	};

	render() {
		const { data } = this.props;
		console.warn('AUto', this.props.data);
		return (
			<ViewPagerAndroid style={[styles.viewPager, this.props.style]} onPageSelected={this.onPageSelected}>
				{data.map((item, index) => this.renderItem(item, index))}
			</ViewPagerAndroid>
		);
	}
}

AndroidPagingView.propTypes = propTypes;

const styles = StyleSheet.create({
	viewPager: {
		flex: 1,
		backgroundColor: 'green'
	}
});

export { AndroidPagingView };
