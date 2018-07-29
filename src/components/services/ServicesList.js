import React, { Component } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ServiceItem } from './ServiceItem';
import { fetchServicesRequested } from '../../actions';
import { colors, textStyles } from '../../assets';

const propTypes = {
	style: PropTypes.object,
	navigation: PropTypes.object,
	isPartiallyShown: PropTypes.bool,
	lang: PropTypes.string,
	data: PropTypes.array,
	fetchServicesRequested: PropTypes.func
};

class ServicesListScreen extends Component {
	componentDidMount() {
		this.props.fetchServicesRequested();
	}

	renderItem = ({ item }) => {
		const localizedItem = item[this.props.lang];
		return <ServiceItem item={localizedItem} />;
	};

	renderSeparator() {
		return <View style={styles.separator} />;
	}

	onShowMorePress = () => {
		const action = StackActions.push({
			routeName: 'ServicesList'
		});
		this.props.navigation.dispatch(action);
	};

	render() {
		const { isPartiallyShown } = this.props;
		return (
			<View style={[styles.container, this.props.style, { flex: !isPartiallyShown ? 1 : undefined }]}>
				{isPartiallyShown && <Text style={styles.title}>Services</Text>}
				<View>
					<FlatList
						ItemSeparatorComponent={this.renderSeparator}
						data={this.props.data}
						renderItem={this.renderItem}
					/>
				</View>
				{this.props.isPartiallyShown && (
					<TouchableOpacity style={styles.showMoreButton} onPress={this.onShowMorePress}>
						<Text style={styles.showMoreText}>SHOW MORE</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

ServicesListScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	separator: {
		backgroundColor: colors.grayUltraLight,
		height: 1,
		marginLeft: 10
	},
	showMoreButton: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: 44
	},
	showMoreText: {
		marginRight: 15,
		color: colors.blue
	},
	title: {
		...textStyles.h1,
		marginLeft: 15,
		marginTop: 20,
		color: colors.grayLight
	}
});

const mapStateToProps = ({ services, settings }) => ({
	data: services.data,
	lang: settings.lang
});

export const ServicesList = connect(
	mapStateToProps,
	{ fetchServicesRequested }
)(ServicesListScreen);
