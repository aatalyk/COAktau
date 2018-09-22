import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { textStyles, settings, images, colors } from '../../assets';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.string
};

class Alert extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: () => (
				<Header
					titleKaz=""
					titleRus=""
					leftItem={<IconButton imgSource={images.close} onPress={() => navigation.goBack()} />}
				/>
			)
		};
	};

	render() {
		const result = this.props.navigation.getParam('result', {});
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.headerTitle}>{settings[this.props.lang].calc.result}</Text>
				<View style={styles.itemContainer}>
					<Text style={styles.title}>{settings[this.props.lang].text.calcYear}</Text>
					<Text style={styles.detail}>{result.year} тг</Text>
				</View>
				<View style={styles.itemContainer}>
					<Text style={styles.title}>{settings[this.props.lang].text.livingCost}</Text>
					<Text style={styles.detail}>{result.livingCost} тг</Text>
				</View>
				<View style={styles.itemContainer}>
					<Text style={styles.title}>{settings[this.props.lang].text.povertyMin}</Text>
					<Text style={styles.detail}>{result.povertyMin} тг</Text>
				</View>
				<View style={styles.itemContainer}>
					<Text style={styles.title}>{settings[this.props.lang].text.revenue}</Text>
					<Text style={styles.detail}>{result.revenuePerPerson} тг</Text>
				</View>
				<View style={styles.itemContainer}>
					<Text style={[styles.title, { fontWeight: 'bold' }]}>
						{settings[this.props.lang].text.socialHelpSize}
					</Text>
					<Text style={styles.detail}>{result.result} тг</Text>
				</View>
				<Text
					style={[
						styles.finalText,
						{ color: result.revenuePerPerson > result.povertyMin ? colors.redLight : colors.greenLight }
					]}
				>
					{result.revenuePerPerson > result.povertyMin
						? settings[this.props.lang].text.calcResultNegative
						: `${settings[this.props.lang].text.calcResultPositive} ${result.result} ${
								settings[this.props.lang].text.calcResultPositivePerFamily
						  }`}
				</Text>
			</ScrollView>
		);
	}
}

Alert.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	itemContainer: {
		flexDirection: 'row',
		margin: 20
	},
	headerTitle: {
		...textStyles.h1,
		fontSize: 22,
		color: colors.orange,
		textAlign: 'center',
		margin: 10
	},
	title: {
		flex: 1,
		...textStyles.p,
		color: colors.gray,
		marginRight: 10
	},
	detail: {
		flex: 1,
		...textStyles.h1,
		textAlign: 'right',
		marginLeft: 10
	},
	finalText: {
		...textStyles.h1,
		color: 'green',
		textAlign: 'center',
		margin: 10,
		marginBottom: 20
	}
});

const mapStateToProps = ({ settings }) => ({
	lang: settings.lang
});

export const AlertScreen = connect(mapStateToProps)(Alert);
