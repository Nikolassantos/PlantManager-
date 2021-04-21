import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { IPrimaryButtonProps } from './types';

import { styles } from './styles';

function PrimaryButton({ title, ...rest }: IPrimaryButtonProps) {
  return (
    <TouchableOpacity {...rest} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryButton;
