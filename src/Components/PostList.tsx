import { FlatList, StyleSheet } from 'react-native';
import { PostCart } from './PostCart';
import { useAppDispatch, useAppSelector } from '../Store/Store';
import { useEffect } from 'react';
import { getPosts } from '../Store/Slices/PostSlice';

interface IPostListProps {}

export const PostList: React.FC<IPostListProps> = ({}) => {
  console.log('Render PostList');

  const { posts, loading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <>
      <FlatList
        style={styles.listWrapper}
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PostCart id={item.id} title={item.title} body={item.body} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    paddingTop: 20,
  },
});
