import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { RootStackParamList } from '../Navigation/AppNavigation';
import { PostList } from '../Components/PostList';
import { StyleSheet, View } from 'react-native';
import { Button } from '../Components/UI/Button';

export const MainScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToAddPost = useCallback(
    () => navigation.navigate('AddPost'),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <View style={{ flex: 1 }}>
        <PostList />
      </View>
      <View>
        <Button
          title="Add post"
          onPress={navigateToAddPost}
          style={styles.addPostBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  addPostBtn: {
    width: '100%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#FF7F50',
    marginBottom: 16,
    marginTop: 16,
  },
});
