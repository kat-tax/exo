import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import theme from './theme';

export interface InputProps {
  placeholder: string;
}

/**
 * A simple input component
 */
export function Input(props: InputProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.placeholder}>
        {props.placeholder}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 381,
    height: 63,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  placeholder: {
    height: 24,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#000000',
  },
});
