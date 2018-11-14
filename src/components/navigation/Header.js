import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { IconButton } from '../common';
import { textStyles, colors, images } from '../../assets';
import { TaxiHeader } from '../../components/taxi';

const propTypes = {
	leftItem: PropTypes.node,
	rightItem: PropTypes.node,
	titleKaz: PropTypes.string,
	titleRus: PropTypes.string,
	lang: PropTypes.oneOf(['kaz', 'rus']),
	taxi: PropTypes.bool
};

const HeaderComponent = ({ leftItem, rightItem, titleKaz, titleRus, lang, taxi }) => (
	<View>
		<View style={styles.linearGradient} />
		<View style={styles.orangeView} />
		<View style={styles.container}>
			<View style={styles.leftItem}>{leftItem}</View>
			{!taxi ? (
				<Text style={[textStyles.p, { flex: 1, textAlign: 'center' }]} numberOfLines={1}>
					{lang === 'kaz' ? titleKaz : titleRus}
				</Text>
			) : (
				<TaxiHeader />
			)}
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
		alignItems: 'center'
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
		height: getStatusBarHeight(),
		backgroundColor: colors.soBlue
	},
	image: {
		width: 30,
		height: 30
	}
});

const mapStateToProps = ({ settings }) => ({
	lang: settings.lang
});

export const Header = connect(mapStateToProps)(HeaderComponent);
