import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import appsFlyer from 'react-native-appsflyer';
import Orientation from 'react-native-orientation-locker';
import {FirstData, CheckData} from '../controller/StoreManager';
import firestore from '@react-native-firebase/firestore';

appsFlyer.initSdk(
  {
    devKey: 'mHC7pFQmGYnekBZ3ModWWd',
    isDebug: false,
    onInstallConversionDataListener: true,
    onDeepLinkListener: true,
  },
  result => {
    console.log(result);
  },
  error => {
    console.error(error);
  },
);

const GameWeb = () => {
  const [urlNotLocal, setCurlNotLocal] = useState('');

  const handleNavigationStateChange = (navState: any) => {};

  const appsFlyerEvent = async (response: string) => {
    const jsonObject = JSON.parse(response);
    const eventType = jsonObject.event_type;
    let map: any = {};

    const isFirstPurchase = await CheckData('isFirstPurchase');

    if (eventType === 'af_purchase') {
      if (isFirstPurchase == true) {
        return;
      }
      map.af_currency = jsonObject.af_currency;
      map.af_revenue = jsonObject.af_revenue;
      map.uid = jsonObject.uid;
    } else if (eventType === 'af_first_purchase') {
      map.af_currency = jsonObject.af_currency;
      map.af_revenue = jsonObject.af_revenue;
      map.uid = jsonObject.uid;
      FirstData('isFirstPurchase', false);
    } else if (eventType === 'af_complete_registration') {
      map.uid = jsonObject.uid;
      map.pid = jsonObject.pid;
    } else if (eventType === 'af_login') {
      map.uid = jsonObject.uid;
    }

    appsFlyer
      .logEvent(eventType, map)
      .then(() => console.log('Sent event !!!!!'))
      .catch(err => console.log(err))
      .finally(() => console.log('Endddd'));
  };

  useEffect(() => {
    firestore()
      .collection('url')
      .doc('id')
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setCurlNotLocal(documentSnapshot.data()?.urlgame);
        }
      });
  }, []);

  useEffect(() => {
    Orientation.unlockAllOrientations();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <WebView
        source={{uri: urlNotLocal}}
        style={{flex: 1}}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={event => {
          appsFlyerEvent(event.nativeEvent.data);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default GameWeb;
