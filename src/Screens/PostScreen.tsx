import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type PostScreenRouteProp = RouteProp<
  {
    PostScreen: {
      id: number;
    };
  },
  'PostScreen'
>;

export const PostScreen: React.FC = () => {
  const { params } = useRoute<PostScreenRouteProp>();

  console.log('Render PostScreen', params.id);

  return (
    <SafeAreaView>
      <Text>Post Screen</Text>
    </SafeAreaView>
  );
};
