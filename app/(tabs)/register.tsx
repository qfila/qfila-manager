import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import SignUpForm from '@/components/SignUpForm';

export default function FormScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>QFILA</Text>
        <Text style={styles.subtitle}>
          Cadastro
        </Text>
      </View>
      <SignUpForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    width: 'auto'
  },
  top: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 48,
    fontFamily: 'Poppins-Light',
    lineHeight: 60
  },
  subtitle: {
    fontSize: 24,
    color: '#777',
    fontFamily: 'Poppins-Light',
    lineHeight: 30
  }
});
