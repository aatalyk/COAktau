import React, { Component } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { NotificationItem } from './NotificationItem';
import { colors } from '../../assets';
import { fetchNotifsRequested } from '../../actions';

const propTypes = {
	navigation: PropTypes.object,
	loading: PropTypes.bool,
	notifsItems: PropTypes.array,
	fetchNotifsRequested: PropTypes.func,
	lang: PropTypes.string
};

class NotificationsScreen extends Component {
	componentDidMount() {
		this.props.fetchNotifsRequested();
	}

	renderItem = ({ item }) => {
		return <NotificationItem item={item} onPress={() => this.onPress(item)} />;
	};

	renderSeparator = () => <View style={styles.separator} />;

	onPress = item => this.props.navigation.navigate('NotificationPage', { item });

	onRefresh = () => this.props.fetchNotifsRequested();

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.notifsItems}
					renderItem={this.renderItem}
					style={styles.flatList}
					ItemSeparatorComponent={this.renderSeparator}
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
		backgroundColor: 'white'
	},
	flatList: {
		flex: 1
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
