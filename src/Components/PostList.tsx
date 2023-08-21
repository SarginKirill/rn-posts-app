import { FlatList, StyleSheet, View, Text } from 'react-native';
import { PostCart } from './PostCart';
import { useAppDispatch, useAppSelector } from '../Store/Store';
import { useEffect, useMemo } from 'react';
import { getPosts } from '../Store/Slices/PostSlice';
import { Button } from './UI/Button';

interface IPostListProps {}

export const PostList: React.FC<IPostListProps> = ({}) => {
  console.log('Render PostList');

  const { posts, loading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const headerList = useMemo(
    () => (
      <View style={styles.titleLine}>
        <Text style={styles.titile}>Posts:</Text>
      </View>
    ),
    []
  );

  return (
    <View style={{}}>
      <FlatList
        ListHeaderComponent={headerList}
        contentContainerStyle={{ paddingBottom: 10 }}
        style={styles.listWrapper}
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PostCart id={item.id} title={item.title} body={item.body} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    paddingTop: 20,
  },

  titleLine: { marginBottom: 20 },
  titile: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
});
