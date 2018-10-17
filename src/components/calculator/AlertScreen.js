import React, { Component } from 'react';
import { View, Image, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { textStyles, settings, images, colors } from '../../assets';
import PropTypes from 'prop-types';

import { Header } from '../navigation';
import { IconButton } from '../common';

const propTypes = {
	navigation: PropTypes.object,
	lang: PropTypes.string
};

const SCREEN_WIDTH = Dimensions.get('window').width;

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
				<View style={styles.line} />
				<View style={styles.itemContainer}>
					<Text style={styles.title}>{settings[this.props.lang].text.calcYear}</Text>
					<Text style={styles.detail}>{result.year}</Text>
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
					<Text style={[styles.title]}>{settings[this.props.lang].text.socialHelpSize}</Text>
					<Text style={styles.detail}>{result.result} тг</Text>
				</View>
				{result.revenuePerPerson <= result.povertyMin && <Image style={styles.image} source={images.approve} />}
				<Text style={[styles.finalText, { color: 'black' }]}>
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
		textAlign: 'left',
		margin: 20
	},
	title: {
		flex: 1,
		...textStyles.p,
		color: colors.grayDark,
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
		margin: 20,
		marginBottom: 20
	},
	line: {
		backgroundColor: colors.soBlue,
		height: 3,
		width: SCREEN_WIDTH * 0.2,
		marginLeft: 20,
		borderRadius: 2
	},
	image: {
		width: 40,
		height: 40,
		margin: 10,
		alignSelf: 'center'
	}
});

const mapStateToProps = ({ settings }) => ({
	lang: settings.lang
});

export const AlertScreen = connect(mapStateToProps)(Alert);
