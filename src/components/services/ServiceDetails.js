import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors, images, textStyles } from '../../assets';

const propTypes = {
	navigation: PropTypes.object
};

class ServiceDetails extends Component {
	renderItem = e => {
		const { item } = e;
		return (
			<TouchableOpacity onPress={this.onPress}>
				<View style={styles.detailContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Image source={images.right} style={styles.image} />
				</View>
			</TouchableOpacity>
		);
	};

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => this.props.navigation.navigate('AboutService');

	render() {
		const { details } = this.props.navigation.getParam('e', {});
		return (
			<View style={styles.container}>
				<FlatList
					data={details}
					renderItem={this.renderItem}
					keyExtractor={(_, index) => index + ''}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</View>
		);
	}
}

ServiceDetails.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	detailContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 10
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
	}
});

export { ServiceDetails };
