import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { textStyles, images } from '../../assets';

const propTypes = {
	item: PropTypes.shape({
		icon: PropTypes.string,
		title: PropTypes.string
	}),
	onPress: PropTypes.func,
	lang: PropTypes.oneOf(['kaz', 'rus'])
};

const ServiceListItemScreen = ({ item, onPress, lang }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<View style={styles.titleContainer}>
					{!!item[lang].icon && (
						<Image
							defaultSource={images.placeholder}
							source={{ uri: item[lang].icon } || images.search}
							style={styles.image}
						/>
					)}
					{!!item[lang].title && <Text style={styles.title}>{item[lang].title}</Text>}
					<Image source={images.right} style={styles.icon} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

ServiceListItemScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
		backgroundColor: 'white',
		minHeight: 100,
		borderRadius: 10
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20
	},
	image: {
		width: 30,
		height: 30
	},
	title: {
		flex: 1,
		marginLeft: 10,
		...textStyles.p
	},
	icon: {
		width: 20,
		height: 20,
		borderRadius: 5,
		marginLeft: 5
	}
});

const mapStateToProps = ({ settings }) => ({ lang: settings.lang });

export const ServiceListItem = connect(mapStateToProps)(ServiceListItemScreen);
