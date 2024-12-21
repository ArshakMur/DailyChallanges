import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppInput, Button} from '../../components';
import {useRoute} from '@react-navigation/native';
import {TChallenge} from '../../types';
import {useEditChallengeController} from './useEditChallengeController';
type RouteParams = {
  challenge: TChallenge;
};
const EditChallengeScreen = () => {
  const route = useRoute();
  const {challenge} = route.params as RouteParams;

  const {titleText, detailText, onTitleTextChange, onDetailTextChange, onSave} =
    useEditChallengeController(challenge);

  return (
    <View style={styles.container}>
      <View style={{gap: 10}}>
        <AppInput
          value={titleText}
          onChangeText={onTitleTextChange}
          placeholder="Challenge Title"
        />
        <AppInput
          value={detailText}
          onChangeText={onDetailTextChange}
          placeholder="Challenge Details"
          multiline
        />
      </View>
      <Button
        label="EDIT"
        contentContainerStyle={styles.button}
        onPress={onSave}
      />
    </View>
  );
};

export {EditChallengeScreen};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 50,
  },
});
