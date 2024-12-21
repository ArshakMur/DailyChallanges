import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useCompletedChallengesController} from './useCompletedChallengesController';
import {Challenge} from '../../components';

export const CompletedChallengesScreen = () => {
  const {
    completedChallenges,
    isLoading,
    loadCompletedChallenges,
    onCompletedStatusChange,
    onRemoveChallenge,
  } = useCompletedChallengesController();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={{backgroundColor: '#D6D7EF', flex: 1}}>
      {completedChallenges.length === 0 ? (
        <Text style={styles.emptyText}>No completed challenges available.</Text>
      ) : (
        <FlatList
          data={completedChallenges}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: 7,
            gap: 8,
            paddingVertical: 22,
          }}
          renderItem={({item}) => (
            <Challenge
              onRemoveChallenge={onRemoveChallenge}
              onCompletedStatusChange={onCompletedStatusChange}
              {...item}
            />
          )}
          onRefresh={loadCompletedChallenges}
          refreshing={isLoading}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});
