import React, {useCallback} from 'react';
import {Alert} from 'react-native';
import {getStorageValue, setStorageValue} from '../../../utils/storage';
import {TChallenge} from '../../types';
import {useFocusEffect} from '@react-navigation/native';

const STORAGE_KEYS = {
  CHALLENGES: 'challenges',
};

type UseCompletedChallengesControllerReturnType = {
  completedChallenges: TChallenge[];
  isLoading: boolean;
  loadCompletedChallenges: () => Promise<void>;
  onRemoveChallenge: (id: string) => Promise<void>;
  onCompletedStatusChange: (id: string) => Promise<void>;
};

export const useCompletedChallengesController =
  (): UseCompletedChallengesControllerReturnType => {
    const [completedChallenges, setCompletedChallenges] = React.useState<
      TChallenge[]
    >([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const loadCompletedChallenges = async (withoutTime?: boolean) => {
      if (!withoutTime) {
        setIsLoading(true);
      }
      try {
        const storedChallenges = await getStorageValue<TChallenge[]>(
          STORAGE_KEYS.CHALLENGES,
          [],
        );
        if (storedChallenges) {
          const completed = storedChallenges.filter(
            challenge => challenge.isCompleted,
          );
          setCompletedChallenges(completed);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load completed challenges.');
      } finally {
        if (withoutTime) {
          setIsLoading(false);
        } else {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      }
    };

    const onRemoveChallenge = async (id: string) => {
      try {
        const storedChallenges = await getStorageValue<TChallenge[]>(
          STORAGE_KEYS.CHALLENGES,
          [],
        );
        const updatedChallenges = storedChallenges?.filter(
          challenge => challenge.id !== id,
        );
        if (updatedChallenges) {
          await setStorageValue(STORAGE_KEYS.CHALLENGES, updatedChallenges);
          loadCompletedChallenges(true); // Reload after removal
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to remove challenge.');
      }
    };

    const onCompletedStatusChange = async (id: string) => {
      try {
        const storedChallenges = await getStorageValue<TChallenge[]>(
          STORAGE_KEYS.CHALLENGES,
          [],
        );
        const updatedChallenges = storedChallenges?.map(challenge => {
          if (challenge.id === id) {
            challenge.isCompleted = !challenge.isCompleted;
          }
          return challenge;
        });
        if (updatedChallenges) {
          await setStorageValue(STORAGE_KEYS.CHALLENGES, updatedChallenges);
          loadCompletedChallenges(true);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to change completion status.');
      }
    };

    useFocusEffect(
      useCallback(() => {
        loadCompletedChallenges();
      }, []),
    );

    return {
      completedChallenges,
      isLoading,
      loadCompletedChallenges,
      onRemoveChallenge,
      onCompletedStatusChange,
    };
  };
