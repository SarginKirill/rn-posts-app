import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo } from 'react';
import { RootStackParamList } from '../Navigation/AppNavigation';
import { PostList } from '../Components/PostList';
import { StyleSheet } from 'react-native';

export const MainScreen: React.FC = () => {
  console.log('Render MainScreen');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToPost = useCallback(
    () => navigation.navigate('Post', { id: 42 }),
    []
  );

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <PostList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    paddingHorizontal: 16,
  },
});
