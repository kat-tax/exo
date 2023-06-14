import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import theme from './theme';

export interface ButtonProps {
  showlabel: boolean;
  label: string;
  state: 'Default' | 'Hover' | 'Selected';
}

/**
 * A simple button component
 */
export function Button(props: ButtonProps) {
  const classes = {
    root: [
      styles.root,
      props.state === 'Hover' && styles.rootHover,
      props.state === 'Selected' && styles.rootSelected,
    ],
    tests: [
      styles.tests,
      props.state === 'Selected' && styles.testsSelected,
    ],
  };

  return (
    <View style={classes.root}>
      {props.showlabel && 
        <Text style={classes.tests}>
          {props.label}
        </Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 22,
    paddingHorizontal: 150,
    backgroundColor: '#000000',
    borderRadius: 4,
  },
  rootHover: {
    backgroundColor: '#222222',
  },
  rootSelected: {
    backgroundColor: '#ffd28d',
  },
  tests: {
    height: 24,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#ffffff',
  },
  testsSelected: {
    color: '#000000',
  },
});
