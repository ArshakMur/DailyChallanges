import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {TChallenge} from '../../types';
import {getStorageValue, setStorageValue} from '../../../utils/storage';
import {Alert} from 'react-native';

const STORAGE_KEYS = {
  CHALLENGES: 'challenges',
};

type UseChallengesListControllerReturnType = {
  challenges: TChallenge[];
  isLoading: boolean;
  onRemoveChallenge: (id: string) => Promise<void>;
  onCompletedStatusChange: (id: string) => Promise<void>;
};

export const useChallengesListController =
  (): UseChallengesListControllerReturnType => {
    const [challenges, setChallenges] = useState<TChallenge[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useFocusEffect(
      useCallback(() => {
        const fetchChallenges = async () => {
          setIsLoading(true);
          try {
            const storedChallenges: TChallenge[] =
              (await getStorageValue<TChallenge[]>(
                STORAGE_KEYS.CHALLENGES,
                [],
              )) || [];
            setChallenges(storedChallenges || []);
          } catch (error) {
            console.error('Error loading challenges:', error);
          } finally {
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }
        };

        fetchChallenges();
      }, []),
    );

    const onRemoveChallenge = async (id: string) => {
      try {
        const updatedChallenges = challenges.filter(
          challenge => challenge.id !== id,
        );
        setChallenges(updatedChallenges);
        await setStorageValue(STORAGE_KEYS.CHALLENGES, updatedChallenges);
      } catch (error) {
        Alert.alert(
          'Error',
          'Something went wrong while removing the challenge.',
        );
      }
    };

    const onCompletedStatusChange = async (id: string) => {
      try {
        const updatedChallenges = challenges.map(challenge =>
          challenge.id === id
            ? {...challenge, isCompleted: !challenge.isCompleted}
            : challenge,
        );
        setChallenges(updatedChallenges);
        await setStorageValue(STORAGE_KEYS.CHALLENGES, updatedChallenges);
      } catch (error) {
        Alert.alert('Error', 'Failed to update challenge.');
      }
    };

    return {
      challenges,
      isLoading,
      onRemoveChallenge,
      onCompletedStatusChange,
    };
  };
