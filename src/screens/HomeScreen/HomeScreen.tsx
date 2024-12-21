import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {BottomBlock} from './components';
import {useChallengesListController} from './useChallengesListController';
import {Challenge} from '../../components';

const HomeScreen = () => {
  const {challenges, isLoading, onRemoveChallenge, onCompletedStatusChange} =
    useChallengesListController();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{backgroundColor: '#D6D7EF', flex: 1}}>
      <View style={{flex: 1}}>
        {challenges.length === 0 ? (
          <Text style={styles.emptyText}>No challenges available.</Text>
        ) : (
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={challenges}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Challenge
                onRemoveChallenge={onRemoveChallenge}
                onCompletedStatusChange={onCompletedStatusChange}
                {...item}
              />
            )}
          />
        )}
      </View>
      <BottomBlock />
    </View>
  );
};

export {HomeScreen};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  contentContainerStyle: {
    paddingHorizontal: 7,
    gap: 8,
    paddingVertical: 22,
  },
});
