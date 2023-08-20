import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from '../Store/Store';

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
  const postId = params.id;
  const { posts } = useAppSelector((state) => state.posts);

  const post = posts.find((item) => item.id === postId);

  console.log('Render PostScreen', post);

  return (
    <SafeAreaView edges={['bottom']} style={styles.sreenWrapper}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{post?.title}</Text>
        <Text style={styles.body}>{post?.body}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sreenWrapper: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '700',
    marginBottom: 30,
    marginTop: 20,
  },
  body: {
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 30,
  },
});
