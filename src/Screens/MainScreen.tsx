import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { RootStackParamList } from '../Navigation/AppNavigation';

export const MainScreen: React.FC = () => {
  console.log('Render MainScreen');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigateToPost = useCallback(
    () => navigation.navigate('Post', { id: 42 }),
    []
  );

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <TouchableHighlight
        style={{ padding: 10, borderColor: '#ccc', borderWidth: 1 }}
        onPress={navigateToPost}
      >
        <Text>Go Post</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};
