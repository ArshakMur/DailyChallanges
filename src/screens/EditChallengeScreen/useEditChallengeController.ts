import {useState} from 'react';
import {Alert} from 'react-native';
import {TChallenge} from '../../types';
import {getStorageValue, setStorageValue} from '../../../utils/storage';
const STORAGE_KEYS = {
  CHALLENGES: 'challenges',
};

type UseEditChallengeControllerReturnType = {
  titleText: string;
  detailText: string;
  onTitleTextChange: (text: string) => void;
  onDetailTextChange: (text: string) => void;
  onSave: () => Promise<void>;
};

export const useEditChallengeController = (
  initialChallenge: TChallenge,
): UseEditChallengeControllerReturnType => {
  const [titleText, setTitleText] = useState<string>(initialChallenge.title);
  const [detailText, setDetailText] = useState<string>(initialChallenge.detail);

  const onSave = async () => {
    if (!titleText) {
      Alert.alert('Validation Error', 'Title cannot be empty.');
      return;
    }

    if (!detailText) {
      Alert.alert('Validation Error', 'Detail cannot be empty.');
      return;
    }
    try {
      const storedChallenges: TChallenge[] =
        (await getStorageValue<TChallenge[]>(STORAGE_KEYS.CHALLENGES, [])) ||
        [];
      const updatedChallenges = storedChallenges.map(challenge =>
        challenge.id === initialChallenge.id
          ? {...challenge, title: titleText, detail: detailText}
          : challenge,
      );
      await setStorageValue(STORAGE_KEYS.CHALLENGES, updatedChallenges);
      Alert.alert('Success', 'Challenge updated successfully.');
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong while updating the challenge.',
      );
    }
  };

  return {
    titleText,
    detailText,
    onTitleTextChange: setTitleText,
    onDetailTextChange: setDetailText,
    onSave,
  };
};
