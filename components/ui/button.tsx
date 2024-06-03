import { Button as ReactButton, ButtonProps, StyleSheet, Pressable } from "react-native";

export function Button(props: ButtonProps) {
  return <Pressable {...props} style={styles.button}  />
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#044557'
  }
});