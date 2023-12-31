import { StyleSheet, View, TouchableHighlight, TextInput } from 'react-native';
import { IComment } from '../Store/Slices/CommentsSlice';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { inputTextValidate } from '../../Common';
import { useComments } from '../Hooks/useComments';
import { Loader } from './UI/Loader';

export const CommentItem: React.FC<IComment> = ({ id, postId, text }) => {
  const [editable, setEditable] = useState(false);
  const [newValue, setNewValue] = useState(text);

  const { loading, deleteCommentToggle, saveChanges } = useComments();

  const inputRef = useRef<TextInput>(null);

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
  }, [text]);

  const sendSave = useCallback(() => {
    if (inputTextValidate(newValue)) {
      return;
    }

    setNewValue(newValue.trim());
    const changedComment = {
      text: newValue,
      id,
      postId,
    };

    saveChanges(changedComment);
    setEditable(false);
  }, [newValue]);

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
        multiline
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
    alignItems: 'center',
  },
  btnLine: {
    flexDirection: 'row',
    gap: 15,
    position: 'absolute',
    right: 10,
  },
  input: { color: '#000', paddingRight: 70 },
});
