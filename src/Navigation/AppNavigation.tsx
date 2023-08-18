import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainScreen } from '../Screens/MainScreen';
import { PostScreen } from '../Screens/PostScreen';

export type RootStackParamList = {
  Post: { id: number };
  Home: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
