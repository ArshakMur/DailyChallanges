import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';

type AppInputProps = {} & TextInputProps;

const AppInput: React.FC<AppInputProps> = props => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <TextInput
        style={{borderBottomWidth: 1, borderColor: '#8B8787'}}
        selectionColor={'#8B8787'}
        {...props}
      />
    </View>
  );
};

export {AppInput};

const styles = StyleSheet.create({});
