import { FlatList, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../Store/Store';
import { CommentItem } from './CommentItem';
import { useEffect } from 'react';
import { getComments } from '../Store/Slices/CommentsSlice';

interface ICommentsListProps {
  postId: number;
}

export const CommentsList: React.FC<ICommentsListProps> = ({ postId }) => {
  console.log('Render CommentsList');

  const { comments, loading } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getComments(postId));
  }, []);

  if (!comments.length) {
    return <Text style={[styles.titleBlock]}>No comments...</Text>;
  }

  return (
    <View>
      <Text style={styles.titleBlock}>Comments:</Text>

      {/* <FlatList
        bounces={false}
        nestedScrollEnabled
        data={comments}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <CommentItem id={item.id} postId={item.postId} text={item.text} />
        )}
        keyExtractor={(item) => `${item.id}`}
      /> */}

      <ScrollView bounces={false} contentContainerStyle={{ gap: 10 }}>
        {comments.map((comm) => (
          <CommentItem
            key={comm.id}
            id={comm.id}
            postId={comm.postId}
            text={comm.text}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBlock: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
});
