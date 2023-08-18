import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';

export const PostScreen: React.FC = () => {
  console.log('Render PostScreen');

  return (
    <SafeAreaView>
      <Text>Post Screen</Text>
    </SafeAreaView>
  );
};
