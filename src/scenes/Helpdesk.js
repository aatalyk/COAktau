import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { SearchBar } from '../components/SearchBar';
import { HelpdeskItem } from '../components/helpdesk/HelpdeskItem';

const mockData = [
	{
		title: 'PropTypes exports a range of validators that can be used to make sure the data you receive is valid. ',
		date: 'Updated today',
		detail:
			'In the following example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines:'
	},
	{
		title: 'PropTypes exports a range of validators that can be used to make sure the data you receive is valid. ',
		date: 'Updated today',
		detail:
			'In the following example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines:'
	}
];

class Helpdesk extends Component {
	renderItem = ({ item }) => <HelpdeskItem item={item} />;

	render() {
		return (
			<View style={styles.container}>
				<SearchBar />
				<FlatList data={mockData} renderItem={this.renderItem} keyExtractor={(item, index) => index} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	}
});

export { Helpdesk };
