import { Text, StyleSheet } from 'react-native';

interface ILoaderProps {
  title?: string;
}

export const Loader: React.FC<ILoaderProps> = ({ title = 'Loading...' }) => {
  return <Text style={style.loadingText}>{title}</Text>;
};

const style = StyleSheet.create({
  loadingText: {
    fontSize: 16,
    lineHeight: 18,
  },
});
