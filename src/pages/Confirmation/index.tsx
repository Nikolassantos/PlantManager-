import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import PrimaryButton from '../../components/primaryButton';

import { styles } from './styles';

function Confirmation() {
  const navigation = useNavigation();

  function handleConfirmation() {
    navigation.navigate('plantSelect');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <PrimaryButton onPress={handleConfirmation} title="Começar" />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Confirmation;
