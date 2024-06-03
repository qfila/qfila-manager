import { Text, TextInput, TextInputProps, View, StyleSheet } from "react-native";

interface InputProps {
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
}

export function Input(props: InputProps & TextInputProps) {
  const { fullWidth, error, helperText, ...restInputProps } = props

  return (
    <View>
        <TextInput {...restInputProps} style={styles.input} />
        {helperText && (
          <Text style={styles.errorText}>
            {helperText}
          </Text>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },
  input: {
    height: 40,
    borderColor: '#9a9a9a',
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});