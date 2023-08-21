import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../Store/Store';
import { CommentsList } from '../Components/CommentsList';
import { useCallback, useMemo, useState } from 'react';
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

  const insets = useSafeAreaInsets();

  const post = useMemo(
    () => posts.find((item) => item.id === postId),
    [postId]
  );

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

  const changeCommentText = useCallback(
    (value: string) => setNewCommentValue(value),
    []
  );

  console.log('Render PostScreen');

  return (
    <SafeAreaView edges={['bottom']} style={styles.screenContainer}>
      <KeyboardAvoidingView
        style={styles.flexOne}
        keyboardVerticalOffset={50 + insets.top} // 50px (nav header) + insets
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback
          style={styles.flexOne}
          onPress={Keyboard.dismiss}
        >
          <>
            <ScrollView
              style={styles.screenWrapper}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.title}>{post?.title}</Text>
              <Text style={styles.body}>{post?.body}</Text>
              <View>
                <CommentsList postId={postId} />
              </View>
            </ScrollView>
            <View style={styles.inputCommentLine}>
              <Text style={styles.inputTitle}>Add new Comment:</Text>
              <View style={styles.inputLine}>
                <TextInput
                  style={styles.input}
                  value={newCommentValue}
                  onChangeText={changeCommentText}
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
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  screenContainer: { flex: 1, backgroundColor: '#fff' },
  screenWrapper: {
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
  inputCommentLine: {
    paddingTop: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 18,
    paddingBottom: 10,
    marginRight: 35,
    width: '100%',
    borderBottomWidth: 1,
    color: '#000',
    paddingRight: 50,
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

    alignItems: 'center',
  },
  sendIcon: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});
