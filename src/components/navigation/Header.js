import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { IconButton } from '../common';
import { colors, textStyles } from '../../assets';

const propTypes = {
	leftItem: PropTypes.node,
	rightItem: PropTypes.node,
	titleKaz: PropTypes.string,
	titleRus: PropTypes.string,
	lang: PropTypes.oneOf(['kaz', 'rus'])
};

const HeaderComponent = ({ leftItem, rightItem, titleKaz, titleRus, lang }) => (
	<View>
		<LinearGradient colors={['#e33b6eff', '#d1478bff', '#d1478bff']} style={styles.linearGradient} />
		<View style={styles.orangeView} />
		<View style={styles.container}>
			<View style={styles.leftItem}>{leftItem}</View>
			<Text style={[textStyles.p, { flex: 1, textAlign: 'center' }]} numberOfLines={1}>
				{lang === 'kaz' ? titleKaz : titleRus}
			</Text>
			<View style={styles.rightItem}>{rightItem ? rightItem : <IconButton />}</View>
		</View>
	</View>
);

HeaderComponent.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		justifyContent: 'space-between',
		flexDirection: 'row',
		height: 56,
		alignItems: 'center',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 3,
		shadowColor: 'black'
	},
	leftItem: {
		marginLeft: 5,
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	rightItem: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		marginRight: 5
	},
	linearGradient: {
		height: 20
	}
});

const mapStateToProps = ({ settings }) => ({
	lang: settings.lang
});

export const Header = connect(mapStateToProps)(HeaderComponent);
