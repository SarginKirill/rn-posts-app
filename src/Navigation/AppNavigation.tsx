import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen } from '../Screens/MainScreen';
import { PostScreen } from '../Screens/PostScreen';
import { AddPostScreen } from '../Screens/AddPostScreen';

export type RootStackParamList = {
  Post: { id: number };
  Home: undefined;
  AddPost: undefined;
};

export const AppNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={{
            title: '',
          }}
        />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
