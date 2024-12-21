import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {TChallenge} from '../../types';
import {getStorageValue, setStorageValue} from '../../../utils/storage';

const STORAGE_KEYS = {
  CHALLENGES: 'challenges',
};

const generateId = () =>
  Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

type UseAddChallengeControllerReturnType = {
  titleText: string;
  onTitleTextChange: (text: string) => void;
  detailText: string;
  onDetailTextChange: (text: string) => void;
  onSubmit: () => Promise<void>;
};

export const useAddChallengeController =
  (): UseAddChallengeControllerReturnType => {
    const [titleText, setTitleText] = useState('');
    const [detailText, setDetailText] = useState('');

    const onSubmit = useCallback(async () => {
      if (!titleText) {
        Alert.alert('Validation Error', 'Title cannot be empty.');
        return;
      }

      if (!detailText) {
        Alert.alert('Validation Error', 'Detail cannot be empty.');
        return;
      }

      const newChallenge: TChallenge = {
        id: generateId(),
        title: titleText.trim(),
        detail: detailText.trim(),
        isCompleted: false,
      };

      try {
        console.log(newChallenge);

        const existingChallenges: TChallenge[] =
          (await getStorageValue<TChallenge[]>(STORAGE_KEYS.CHALLENGES, [])) ||
          [];
        console.log(2);

        const updatedChallenges = existingChallenges
          ? [...existingChallenges, newChallenge]
          : [newChallenge];
        console.log(existingChallenges);

        await setStorageValue(STORAGE_KEYS.CHALLENGES, updatedChallenges);
        setTitleText('');
        setDetailText('');
        Alert.alert('Success', 'Challenge added successfully.');
      } catch (error) {
        Alert.alert(
          'Error',
          'Something went wrong while saving the challenge.',
        );
      }
    }, [titleText, detailText]);

    return {
      titleText,
      detailText,
      onTitleTextChange: setTitleText,
      onDetailTextChange: setDetailText,
      onSubmit,
    };
  };
