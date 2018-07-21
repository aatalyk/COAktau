import React, { Component } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { images } from '../../assets';

const propTypes = {
	item: PropTypes.object
};

class HelpdeskItem extends Component {
	state = {
		isSelected: false
	};

	onPress = () => this.setState({ isSelected: !this.state.isSelected });

	render() {
		return this.state.isSelected ? (
			<TouchableOpacity onPress={this.onPress}>
				<View style={styles.container}>
					<View style={styles.titleContainer}>
						<Text style={[styles.title, { fontWeight: 'bold' }]}>{this.props.item.title}</Text>
						<View style={styles.button}>
							<TouchableOpacity onPress={this.onPress}>
								<Image source={images.close} style={styles.image} />
							</TouchableOpacity>
						</View>
					</View>
					<Text style={styles.detail}>{this.props.item.date}</Text>
					<Text style={[styles.detail, { color: 'black' }]}>{this.props.item.detail}</Text>
					<View style={styles.separator} />
					<Text style={[styles.detail, { color: 'black', textAlign: 'center' }]}>Не нашли ответ?</Text>
					<View style={styles.replyButton}>
						<Button title="Написать" />
					</View>
				</View>
			</TouchableOpacity>
		) : (
			<TouchableOpacity onPress={this.onPress}>
				<View style={[styles.titleContainer, { margin: 10 }]}>
					<Text style={styles.title}>{this.props.item.title}</Text>
					<View style={styles.button}>
						<Button title="plus" onPress={this.onPress} style={styles.button} />
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

HelpdeskItem.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		margin: 10
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

export { HelpdeskItem };
