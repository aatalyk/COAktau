import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';

import { images } from '../../assets';

const propTypes = {
	item: PropTypes.object
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

	onWriteButtonPress = () => this.setState({ isSelected: this.state.isSelected });

	renderDetails() {
		return (
			<View>
				<Text style={styles.detail}>{this.props.item.date}</Text>
				<Text style={[styles.detail, { color: 'black' }]}>{this.props.item.detail}</Text>
				<View style={styles.separator} />
				<Text style={[styles.detail, { color: 'black', textAlign: 'center' }]}>Не нашли ответ?</Text>
				<View style={styles.replyButton}>
					<Button title="Написать" onPress={this.onWriteButtonPress} />
				</View>
			</View>
		);
	}

	render() {
		const { isSelected } = this.state;
		return (
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={this.onPress}>
					<View style={styles.titleContainer}>
						<Text style={[styles.title, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
							{this.props.item.title}
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
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		margin: 15
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	title: {
		flex: 1,
		fontSize: 18
	},
	detail: {
		flex: 1,
		paddingTop: 10,
		fontSize: 18,
		color: 'grey',
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
		borderColor: 'orange',
		borderWidth: 1
	},
	image: {
		width: 20,
		height: 20
	}
});

export { FAQitem };
