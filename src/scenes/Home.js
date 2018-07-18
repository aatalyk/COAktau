import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { MenuButton, Header } from '../components/navigation';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Home" leftItem={<MenuButton />} />
        <Text>Home!</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};

export { Home };
