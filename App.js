import React, { Component } from 'react';
import { Platform, UIManager } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './src/store';
import { DrawerNavigator } from './src/components/navigation';

export default class App extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <DrawerNavigator />
      </Provider>
    );
  }
}
