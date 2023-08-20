import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../Store/Store';
import { CommentsList } from '../Components/CommentsList';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IComment, addComment } from '../Store/Slices/CommentsSlice';
import { inputTextValidate } from '../../Common';

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
  const dispatch = useAppDispatch();

  const post = posts.find((item) => item.id === postId);

  const [newCommentValue, setNewCommentValue] = useState('');

  const addNewComment = useCallback(() => {
    if (inputTextValidate(newCommentValue)) {
      return;
    }
    const newComment: IComment = {
      text: newCommentValue,
      postId,
      id: +Date.now(),
    };

    dispatch(addComment(newComment));
    setNewCommentValue('');
  }, [newCommentValue]);

  console.log('Render PostScreen');

  return (
    <SafeAreaView edges={['bottom']} style={styles.screenContainer}>
      <View style={styles.sreenWrapper}>
        <ScrollView
          nestedScrollEnabled={true}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{post?.title}</Text>
          <Text style={styles.body}>{post?.body}</Text>
          <View>
            <CommentsList postId={postId} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.inputCommentLine}>
        <Text style={styles.inputTitle}>Add new Comment:</Text>

        <View style={styles.inputLine}>
          <TextInput
            style={styles.input}
            value={newCommentValue}
            onChangeText={(value) => setNewCommentValue(value)}
            placeholder="Enter your comment"
            autoFocus
          />
          <TouchableHighlight
            style={styles.sendIcon}
            underlayColor="transparent"
            onPress={addNewComment}
          >
            <Ionicons name="send" size={20} color="black" />
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: '#fff' },
  sreenWrapper: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
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
  inputCommentLine: {
    paddingTop: 12,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 18,
    paddingBottom: 10,
    marginRight: 35,
  },
  inputTitle: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 8,
  },
  inputLine: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendIcon: {
    position: 'absolute',
    right: 0,
  },
});
