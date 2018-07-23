import React, { Component } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { images } from '../../assets';

const propTypes = {
	title: PropTypes.string
};

class SearchBar extends Component {
	state = {
		text: ''
	};

	search = text => this.setState({ text });

	clear = () => this.setState({ text: '' });

	onPress = () => {};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.searchContainer}>
					<TouchableOpacity onPress={this.onPress}>
						<Image source={images.search} style={styles.image} />
					</TouchableOpacity>
					<TextInput
						value={this.state.text}
						placeholder="Search"
						onChangeText={this.search}
						style={styles.textInput}
					/>
				</View>
				<TouchableOpacity onPress={this.clear}>
					<Image source={images.close} style={styles.image} />
				</TouchableOpacity>
			</View>
		);
	}
}

SearchBar.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'gray',
		height: 50
	},
	searchContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 15,
		height: 30,
		marginLeft: 5,
		marginRight: 5
	},
	textInput: {
		flex: 1,
		marginRight: 10
	},
	image: {
		width: 15,
		height: 15,
		marginLeft: 10,
		marginRight: 10
	}
});

export { SearchBar };
