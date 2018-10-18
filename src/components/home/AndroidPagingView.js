import React, { Component } from 'react';
import { View, ViewPagerAndroid, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({ imageUrl: PropTypes.string.isRequired })),
	style: PropTypes.oneOf([PropTypes.object, PropTypes.number, PropTypes.array]),
	onPageSelected: PropTypes.func,
	renderItem: PropTypes.func
};

class AndroidPagingView extends Component {
	onPageSelected = ({ nativeEvent }) => {
		this.props.onPageSelected(nativeEvent.position);
	};

	renderItem = (item, index) => <View key={`${index}`}>{this.props.renderItem({ item })}</View>;

	render() {
		return (
			<ViewPagerAndroid style={[styles.viewPager, this.props.style]} onPageSelected={this.onPageSelected}>
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
