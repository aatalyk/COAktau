import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
	LayoutAnimation,
	Linking,
	Platform
} from 'react-native';
import PropTypes from 'prop-types';

import { images, textStyles, settings, colors } from '../../assets';
import { faqLocalizedPropType } from '../../propTypes';
import { getFormattedDate } from '../common';

const propTypes = {
	index: PropTypes.number,
	item: faqLocalizedPropType,
	lang: PropTypes.string
};

class FAQitem extends Component {
	state = {
		isSelected: false
	};

	componentDidUpdate(_, prevState) {
		if (this.state.isSelected != prevState.isSelected) {
			LayoutAnimation.easeInEaseOut();
		}
	}

	onPress = () => this.setState({ isSelected: !this.state.isSelected });

	onWriteButtonPress = () => Linking.openURL('mailto:soaktau@gmail.com');

	renderDetails() {
		return (
			<View>
				<Text style={styles.detail}>{getFormattedDate(this.props.item.createdAt)}</Text>
				<Text style={[styles.detail, { color: 'black' }]}>{this.props.item.answer}</Text>
				<View style={styles.separator} />
				<Text style={[styles.detail, { color: 'black', textAlign: 'center' }]}>
					{settings[this.props.lang].text.noAnswer}
				</Text>
				<View style={styles.replyButton}>
					<Button
						title={settings[this.props.lang].buttons.composeEmail.toUpperCase()}
						onPress={this.onWriteButtonPress}
						color={colors.soBlue}
					/>
				</View>
			</View>
		);
	}

	render() {
		const { isSelected } = this.state;
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback style={styles.touchable} onPress={this.onPress}>
					<View style={styles.titleContainer}>
						<Text style={[styles.title, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
							{`${this.props.index + 1}. ${this.props.item.question}`}
						</Text>
						<View style={styles.button}>
							<Image source={isSelected ? images.close : images.plus} style={styles.image} />
						</View>
					</View>
				</TouchableWithoutFeedback>
				{isSelected && this.renderDetails()}
			</View>
		);
	}
}

FAQitem.propTypes = propTypes;

const styles = StyleSheet.create({
	touchable: {
		height: 44
	},
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		padding: 15,
		backgroundColor: 'white'
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	title: {
		flex: 1,
		...textStyles.h1
	},
	detail: {
		...textStyles.p,
		flex: 1,
		paddingTop: 10,
		color: colors.grayDark,
		paddingBottom: 10
	},
	button: {
		alignItems: 'flex-start'
	},
	separator: {
		paddingTop: 10,
		borderBottomColor: 'grey',
		borderBottomWidth: 0.5
	},
	replyButton: {
		...textStyles.p
	},
	image: {
		width: 20,
		height: 20
	}
});

export { FAQitem };
