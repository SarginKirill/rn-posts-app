import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const MainScreen: React.FC = () => {
  console.log('Render MainScreen');

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <TouchableHighlight
        style={{ padding: 10, borderColor: '#ccc', borderWidth: 1 }}
        onPress={() => navigation.navigate('Post' as never)}
      >
        <Text>Go Post</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};
