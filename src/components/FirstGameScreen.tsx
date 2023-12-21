import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import GameOffScreen from './GameOffScreen';
  import firestore from '@react-native-firebase/firestore';
  import RNProgressHud from 'progress-hud';
  
  const FirstScreenGame = () => {
    const [isShow, setIsShow] = useState(false);
    const [name, setName] = useState();
    const ProgressHUDMaskType: any = RNProgressHud.ProgressHUDMaskType;
  
    const handleOnclick = async () => {
      RNProgressHud.showWithStatus('WellCome...', ProgressHUDMaskType.none);
      setIsShow(true);
      firestore()
        .collection('user')
        .doc('userId')
        .update({
          name: name,
        })
        .then(() => {
          console.log('User updated!');
        })
        .finally(() => RNProgressHud.dismiss());
    };
  
    useEffect(() => {
      firestore()
        .collection('user')
        .doc('userId')
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setName(documentSnapshot.data()?.name);
          }
        });
    }, []);
  
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isShow ? (
          <GameOffScreen />
        ) : (
          <ImageBackground
            style={{
              width: '100%',
              // flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../assets/bgFirst.jpg')}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter name"
            />
            <TouchableOpacity
              onPress={handleOnclick}
              style={{
                marginTop: 20,
              }}>
              <Image source={require('../assets/icPlay.png')} style={styles.icon} />
            </TouchableOpacity>
          </ImageBackground>
        )}
      </View>
    );
  };
  
  export default FirstScreenGame;
  
  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    input: {
      width: Dimensions.get('window').width / 2,
      height: 52,
      backgroundColor: '#F5F5F5',
      borderRadius: 15,
      paddingHorizontal: 10,
    },
    icon: {
      width: 80,
      height: 80,
      opacity: 0.9,
    },
  });
  