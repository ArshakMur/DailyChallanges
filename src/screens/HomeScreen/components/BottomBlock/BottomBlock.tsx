import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import AllIcon from '../../../../assets/png/All.png';
import DoneIcon from '../../../../assets/png/Done.png';
import {useNavigation} from '@react-navigation/native';

const BottomBlock = () => {
  const navigation = useNavigation();

  const onAddPress = () => {
    navigation.navigate('AddChallenge');
  };

  const onCompletedPress = () => {
    navigation.navigate('CompletedChallenge');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onAddPress}
        style={styles.block}>
        <Image source={AllIcon} style={{width: 18, height: 13}} />
        <Text style={styles.text}>ADD</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onCompletedPress}
        style={styles.block}>
        <Image source={DoneIcon} style={{width: 18, height: 11}} />
        <Text style={styles.text}>Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(BottomBlock);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  block: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  text: {
    textAlign: 'center',
    color: '#8B8787',
    fontWeight: '600',
  },
});
