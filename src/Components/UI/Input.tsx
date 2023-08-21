import { StyleProp, TextInput, ViewStyle } from 'react-native';

interface IInputProps {
  value: string;
  placeholder?: string;
  onTextChange: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  autoFocus?: boolean;
  multiline?: boolean;
}

export const Input: React.FC<IInputProps> = ({
  value,
  placeholder,
  onTextChange,
  autoFocus = false,
  multiline = false,
  style,
}) => {
  console.log('Render Input');

  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onTextChange}
      autoFocus={autoFocus}
      style={[style]}
      multiline={multiline}
      textAlignVertical="top"
    />
  );
};
