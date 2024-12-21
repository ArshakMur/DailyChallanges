import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import EditIcon from '../../assets/png/Edit.png';
import CompletedIcon from '../../assets/png/Completed.png';
import RemoveIcon from '../../assets/png/Remove.png';
import {useNavigation} from '@react-navigation/native';
import {TChallenge} from '../../types';

type ChallengeProps = TChallenge & {
  onRemoveChallenge: (id: string) => Promise<void>;
  onCompletedStatusChange: (id: string) => Promise<void>;
};

const Challenge: React.FC<ChallengeProps> = ({
  title,
  detail,
  id,
  isCompleted,
  onRemoveChallenge,
  onCompletedStatusChange,
}) => {
  const navigation = useNavigation();

  const onEditPress = () => {
    navigation.navigate('EditChallenge', {
      challenge: {
        title,
        detail,
        id,
        isCompleted,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.block, styles.leftBlock]}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={3}>{detail}</Text>
      </View>
      <View style={[styles.block, styles.rightBlock]}>
        <TouchableOpacity
          onPress={onEditPress}
          hitSlop={10}
          activeOpacity={0.7}>
          <Image source={EditIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onRemoveChallenge(id)}
          hitSlop={10}
          activeOpacity={0.7}>
          <Image source={RemoveIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onCompletedStatusChange(id);
          }}
          hitSlop={10}
          activeOpacity={0.7}>
          <Image
            source={CompletedIcon}
            style={
              isCompleted
                ? {backgroundColor: 'green', borderRadius: 50}
                : undefined
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Challenge);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 22,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    width: '100%',
  },
  block: {
    width: '50%',
  },
  leftBlock: {
    gap: 5,
  },
  rightBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: '#9395D3',
    fontWeight: '800',
    fontSize: 15,
  },
});
