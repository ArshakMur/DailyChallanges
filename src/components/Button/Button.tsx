import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';

type ButtonProps = {
  onPress?: () => void;
  label: string;
  contentContainerStyle?: ViewStyle;
};

const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  contentContainerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, contentContainerStyle]}
      onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export {Button};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: '#9395D3',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  },
});
