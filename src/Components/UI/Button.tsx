import {
  TouchableHighlight,
  Text,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface IButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FC<IButtonProps> = ({ title, onPress, style }) => {
  console.log('Render Button');

  return (
    <TouchableHighlight underlayColor="#a35234" style={style} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
    color: '#fff',
  },
});
