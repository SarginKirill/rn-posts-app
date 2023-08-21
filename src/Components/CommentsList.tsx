import { View, Text, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../Store/Store';
import { CommentItem } from './CommentItem';
import { useEffect, useState } from 'react';
import { getComments } from '../Store/Slices/CommentsSlice';
import { Loader } from './UI/Loader';

interface ICommentsListProps {
  postId: number;
}

export const CommentsList: React.FC<ICommentsListProps> = ({ postId }) => {
  const { comments } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getComments(postId)).finally(() => setLoading(false));
  }, [loading]);

  if (!comments.length) {
    return <Text style={styles.titleBlock}>No comments...</Text>;
  }

  return (
    <View>
      <Text style={styles.titleBlock}>Comments:</Text>
      {loading ? (
        <Loader title="Loading..." />
      ) : (
        <View style={{ gap: 10 }}>
          {comments.map((comm) => (
            <CommentItem
              key={comm.id}
              id={comm.id}
              postId={comm.postId}
              text={comm.text}
            />
          ))}
        </View>
      )}
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
