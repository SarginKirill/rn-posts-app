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
import { useCallback, useRef, useState } from 'react';
import { useAppDispatch } from '../Store/Store';
import { inputTextValidate } from '../../Common';

export const CommentItem: React.FC<IComment> = ({ id, postId, text }) => {
  console.log('Render CommentItem');
  const [editable, setEditable] = useState(false);
  const [newValue, setNewValue] = useState(text);

  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();

  const deleteCommentToggle = useCallback(() => {
    dispatch(deleteComment(id));
  }, []);

  const editPostToggle = useCallback(() => {
    setEditable(true);
    inputRef.current?.focus();
    console.log('TEST', inputRef.current?.isFocused());
  }, [inputRef, editable]);

  const cancelChangePost = useCallback(() => {
    setNewValue(text);
    setEditable(false);
  }, []);

  const saveChanges = useCallback(async () => {
    setError(null);
    if (inputTextValidate(newValue)) {
      setError('Input must be filled');
      return;
    }
    const changesPost = {
      text: newValue,
      id,
      postId,
    };

    await dispatch(changeComment(changesPost));
    setEditable(false);
  }, [newValue]);

  return (
    <View style={styles.commentContainer}>
      <View>
        <TextInput
          ref={inputRef}
          value={newValue}
          editable={editable}
          onChangeText={(value) => setNewValue(value)}
        />
      </View>
      <View style={styles.btnLine}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={!editable ? deleteCommentToggle : cancelChangePost}
        >
          {!editable ? (
            <AntDesign name="delete" size={20} color="black" />
          ) : (
            <MaterialIcons name="cancel" size={20} color="black" />
          )}
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={!editable ? editPostToggle : saveChanges}
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
});
