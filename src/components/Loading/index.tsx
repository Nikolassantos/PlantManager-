import React from 'react';
import { View } from 'react-native';

import LottieView from 'lottie-react-native';
import LoadingAnimation from '../../assets/load.json';
import { styles } from './styles';

function Loading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={LoadingAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}
export default Loading;
