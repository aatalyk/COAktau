import React, { Component } from 'react';
import { ScrollView, Text, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  navigation: PropTypes.object,
};

const SCREEN_WIDTH = Dimensions.get('window').width;

class NewsPage extends Component {
  render() {
    const item = this.props.navigation.getParam('item');
    const lang = this.props.navigation.getParam('lang');

    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item[lang].title}</Text>
        <Text style={styles.description}>{item[lang].content}</Text>
      </ScrollView>
    );
  }
}

NewsPage.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  image: {
    width: SCREEN_WIDTH,
    height: 200,
  },
  title: {
    fontSize: 20,
    marginHorizontal: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 10,
  },
});

export { NewsPage };
