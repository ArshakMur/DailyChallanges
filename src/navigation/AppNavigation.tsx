import {StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AddChallengeScreen,
  EditChallengeScreen,
  HomeScreen,
  CompletedChallengesScreen,
} from '../screens';

export const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9395D3',
          },
        }}>
        <AppStack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerTitle: 'Challenges'}}
        />
        <AppStack.Screen
          options={{headerTitle: 'Add Challenge'}}
          name={'AddChallenge'}
          component={AddChallengeScreen}
        />
        <AppStack.Screen
          options={{headerTitle: 'Edit Challenge'}}
          name={'EditChallenge'}
          component={EditChallengeScreen}
        />
        <AppStack.Screen
          options={{headerTitle: 'Completed Challenges'}}
          name={'CompletedChallenge'}
          component={CompletedChallengesScreen}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export {AppNavigation};

const styles = StyleSheet.create({});
