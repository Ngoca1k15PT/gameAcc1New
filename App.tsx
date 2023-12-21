import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Stratification from './src/components/Stratification';
import {FirstData, CheckData} from './src/controller/StoreManager';
import { Provider } from 'react-redux'
import store from './src/redux/store'

CheckData('isFirstOpen').then(data => {
  if (data == null || data == undefined || data == '' || data == false) {
    FirstData('isFirstOpen', true);
    FirstData('isFirstPurchase', true);
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Stratification />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});