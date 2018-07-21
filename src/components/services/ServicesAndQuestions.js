import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { ServicesList } from './';

class ServicesAndQuestions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ServicesList style={styles.servicesList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  servicesList: {
    marginTop: 20,
  },
});

export { ServicesAndQuestions };
