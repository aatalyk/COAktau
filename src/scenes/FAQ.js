import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../assets';
import { SearchBar } from '../components/SearchBar';
import { FAQitem } from '../components/helpdesk/FAQitem';

const mockData = [
  {
    title:
      'PropTypes exports a range of validators that can be used to make sure the data you receive is valid. ',
    date: 'Updated today',
    detail:
      'In the following example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines:',
  },
  {
    title:
      'PropTypes exports a range of validators that can be used to make sure the data you receive is valid. ',
    date: 'Updated today',
    detail:
      'In the following example, the nested title and body text will inherit the fontFamily from styles.baseText, but the title provides its own additional styles. The title and body will stack on top of each other on account of the literal newlines:',
  },
];

const propTypes = {
  style: PropTypes.object,
  isFullyShown: PropTypes.bool,
};

class FAQ extends Component {
  renderItem = ({ item }) => <FAQitem item={item} />;

  keyExtractor = (_, index) => index + '';

  renderSearchBar = () =>
    this.props.isFullyShown ? (
      <SearchBar />
    ) : (
      <Text style={styles.title}>Frequently asked questions</Text>
    );

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <FlatList
          data={mockData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderSearchBar}
        />
        <TouchableOpacity style={styles.showMoreButton}>
          <Text style={styles.showMoreText}>SHOW MORE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

FAQ.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 18,
    color: colors.grayLight,
  },
  showMoreButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 44,
  },
  showMoreText: {
    marginRight: 15,
    color: colors.blue,
  },
});

export { FAQ };
