import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppInput, Button} from '../../components';
import {useAddChallengeController} from './useAddChallengeController';

const AddChallengeScreen = () => {
  const {
    titleText,
    detailText,
    onDetailTextChange,
    onSubmit,
    onTitleTextChange,
  } = useAddChallengeController();
  return (
    <View style={styles.container}>
      <View style={{gap: 10}}>
        <AppInput
          placeholder="Title"
          value={titleText}
          onChangeText={onTitleTextChange}
        />
        <AppInput
          placeholder="Detail"
          value={detailText}
          onChangeText={onDetailTextChange}
          multiline
        />
      </View>
      <Button
        label="ADD"
        contentContainerStyle={styles.button}
        onPress={onSubmit}
      />
    </View>
  );
};

export {AddChallengeScreen};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 50,
  },
});
