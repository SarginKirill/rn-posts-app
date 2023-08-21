import { View, Text, StyleSheet } from 'react-native';

interface ILoaderProps {
  title?: string;
}

export const Loader: React.FC<ILoaderProps> = ({ title = 'Loading...' }) => {
  return (
    <View style={style.loadingWrapper}>
      <Text style={style.loadingText}>{title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  loadingWrapper: {},
  loadingText: {
    fontSize: 16,
    lineHeight: 18,
  },
});
