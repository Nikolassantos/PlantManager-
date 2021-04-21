import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { styles } from './styles';
import { IPlantCardPrimary } from './types';
import { Text } from 'react-native';
import { SvgFromUri } from 'react-native-svg';

function PlantCardPrimary({ data, ...rest }: IPlantCardPrimary) {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
}
export default PlantCardPrimary;
