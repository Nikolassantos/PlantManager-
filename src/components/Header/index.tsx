import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import ProfileImage from '../../assets/profile.png';

function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Nikolas</Text>
      </View>

      <Image source={ProfileImage} style={styles.image} />
    </View>
  );
}

export default Header;
