import React, { Component } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NotificationItem } from './NotificationItem';
import { colors } from '../../assets';
import { fetchNotifsRequested } from '../../actions';
import { PlaceHolderList } from '../common';

const propTypes = {
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	notifsItems: PropTypes.array,
	fetchNotifsRequested: PropTypes.func,
	lang: PropTypes.string,
	scrollEnabled: PropTypes.bool
};

class NotificationsScreen extends Component {
	componentDidMount() {
		this.props.fetchNotifsRequested();
	}

	renderItem = ({ item }) => <NotificationItem item={item} onPress={() => this.onPress(item)} />;

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => this.props.navigation.navigate('NotificationPage', { item });

	onRefresh = () => this.props.fetchNotifsRequested();

	render() {
		const { loading, scrollEnabled, notifsItems } = this.props;

		const items = scrollEnabled ? notifsItems : notifsItems.slice(0, 10);

		return loading ? (
			<View style={styles.placeHolderContainer}>
				<PlaceHolderList />
			</View>
		) : (
			<View style={styles.container}>
				<FlatList
					scrollEnabled={scrollEnabled}
					data={items}
					renderItem={this.renderItem}
					scrollEventThrottle={1}
					style={styles.flatList}
					keyExtractor={(_, index) => index + ''}
					refreshControl={<RefreshControl refreshing={this.props.loading} onRefresh={this.onRefresh} />}
				/>
			</View>
		);
	}
}

NotificationsScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.soLightBlue
	},
	placeHolderContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	flatList: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10
	},
	separator: {
		height: 1,
		backgroundColor: colors.grayUltraLight,
		marginLeft: 15,
		marginRight: 15
	}
});

const mapStateToProps = ({ notifs, settings }) => ({
	loading: notifs.loading,
	notifsItems: notifs.notifsItems,
	lang: settings.lang
});

export const Notifications = connect(
	mapStateToProps,
	{ fetchNotifsRequested }
)(NotificationsScreen);
