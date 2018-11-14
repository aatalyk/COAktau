import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';

import { images, textStyles, colors } from '../../assets';
import { ServiceDetails } from './ServiceDetails';

const propTypes = {
	index: PropTypes.number,
	lang: PropTypes.string,
	item: PropTypes.object,
	navigation: PropTypes.object
};

class ServicesItem extends Component {
	state = {
		isSelected: false
	};

	componentDidUpdate(_, prevState) {
		if (this.state.isSelected != prevState.isSelected) {
			LayoutAnimation.easeInEaseOut();
		}
	}

	renderDetails() {
		const { item } = this.props;
		return (
			<View>
				<ServiceDetails item={item} navigation={this.props.navigation} />
			</View>
		);
	}

	onPress = () => {
		const { item, lang } = this.props;
		item[lang].isCalc
			? this.props.navigation.navigate('CalcScreen', { item })
			: this.setState((prevState, prevProps) => ({
					isSelected: !prevState.isSelected
			  }));
	};

	render() {
		const { isSelected } = this.state;
		const { item } = this.props;
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={this.onPress}>
					<View style={styles.detailContainer}>
						<Text style={[styles.title, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
							{item[this.props.lang].title}
						</Text>
						<Image source={isSelected ? images.down : images.right} style={styles.image} />
					</View>
				</TouchableWithoutFeedback>
				{isSelected && this.renderDetails()}
			</View>
		);
	}
}

ServicesItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	detailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20
	},
	title: {
		flex: 1,
		...textStyles.p
	},
	image: {
		width: 20,
		height: 20
	},
	separator: {
		height: 0.5,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 10,
		marginRight: 10
	},
	buttonText: {
		...textStyles.p,
		color: 'white'
	},
	buttonContainer: {
		backgroundColor: colors.orange,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export { ServicesItem };
