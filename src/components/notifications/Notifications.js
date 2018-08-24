import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NotificationItem } from './NotificationItem';
import { colors } from '../../assets';
import { fetchNotifsRequested } from '../../actions';

const MOCK_DATA = [{ key: '1', title: 'Abcdefg' }, { key: '2', title: 'Abcdefg' }];

const propTypes = {
	notifsItems: PropTypes.array,
	fetchNotifsRequested: PropTypes.func
};

class NotificationsScreen extends Component {
	componentDidMount() {
		this.props.fetchNotifsRequested();
		console.warn('notifs', this.props.data);
	}

	renderItem = ({ item }) => <NotificationItem item={item} />;

	renderSeparator = () => <View style={styles.separator} />;

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={MOCK_DATA}
					renderItem={this.renderItem}
					style={styles.flatList}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</View>
		);
	}
}

NotificationsScreen.propTypes = propTypes;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.blueUltraLight
	},
	flatList: {
		flex: 1,
		marginVertical: 20
	},
	separator: {
		backgroundColor: colors.grayUltraLight,
		height: 1
	}
});

const mapStateToProps = ({ notifs }) => ({
	notifsItems: notifs.notifsItems
});

export const Notifications = connect(
	mapStateToProps,
	{ fetchNotifsRequested }
)(NotificationsScreen);
