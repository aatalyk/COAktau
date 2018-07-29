import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { NewsItem } from './NewsItem';
import { images, colors } from '../../assets';

const mockNews = [
  {
    title: 'Build a diverse portfolio of early-stage startup investments ',
    imgSource: images.example,
    description: 'Build a diverse portfolio of early-stage startup investments ',
  },
  {
    title: 'Build a diverse portfolio of early-stage startup investments ',
    imgSource: images.example,
    description: 'Build a diverse portfolio of early-stage startup investments ',
  },
  {
    title: 'Build a diverse portfolio of early-stage startup investments ',
    imgSource: images.example,
    description: 'Build a diverse portfolio of early-stage startup investments ',
  },
];

const propTypes = {
  navigation: PropTypes.object,
};

class News extends Component {
  renderItem = ({ item }) => <NewsItem item={item} onPress={this.onPress(item)} />;

  keyExtractor = (_, index) => index + '';

  renderSearchBar = () => <View style={styles.line} />;

  onPress = (item) => () => this.props.navigation.navigate('NewsPage', { item: item });

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={mockNews}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSearchBar}
        />
      </View>
    );
  }
}

News.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  line: {
    height: 0.5,
    backgroundColor: colors.grayUltraLight,
    marginLeft: 10,
    marginRight: 10,
  },
});

export { News };
