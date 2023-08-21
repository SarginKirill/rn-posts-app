import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {
  IComment,
  changeComment,
  deleteComment,
} from '../Store/Slices/CommentsSlice';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../Store/Store';
import { inputTextValidate } from '../../Common';
import { useComments } from '../Hooks/useComments';
import { Loader } from './UI/Loader';

export const CommentItem: React.FC<IComment> = ({ id, postId, text }) => {
  console.log('Render CommentItem');
  const [editable, setEditable] = useState(false);
  const [newValue, setNewValue] = useState(text);

  const [error, setError] = useState<string | null>(null);

  const { loading, deleteCommentToggle, saveChanges } = useComments();

  const inputRef = useRef<TextInput>(null);

  // const dispatch = useAppDispatch();

  // const deleteCommentToggle = useCallback(() => {
  //   dispatch(deleteComment(id));
  // }, []);

  const editPostToggle = useCallback(() => {
    setEditable(true);
  }, [inputRef, editable]);

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const cancelChangePost = useCallback(() => {
    setNewValue(text);
    setEditable(false);
  }, []);

  const sendSave = useCallback(() => {
    setError(null);
    if (inputTextValidate(newValue)) {
      setError('Input must be filled');
      return;
    }
    const changedComment = {
      text: newValue,
      id,
      postId,
    };

    saveChanges(changedComment);
    setEditable(false);
  }, []);

  if (loading) {
    return <Loader title="Processing..." />;
  }

  return (
    <View style={styles.commentContainer}>
      <TextInput
        style={styles.input}
        ref={inputRef}
        value={newValue}
        editable={editable}
        onChangeText={(value) => setNewValue(value)}
      />
      <View style={styles.btnLine}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={!editable ? () => deleteCommentToggle(id) : cancelChangePost}
        >
          {!editable ? (
            <AntDesign name="delete" size={20} color="black" />
          ) : (
            <MaterialIcons name="cancel" size={20} color="black" />
          )}
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={!editable ? editPostToggle : sendSave}
        >
          {!editable ? (
            <AntDesign name="edit" size={20} color="black" />
          ) : (
            <AntDesign name="save" size={20} color="black" />
          )}
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnLine: {
    flexDirection: 'row',
    gap: 15,
  },
  input: { color: '#000' },
});
