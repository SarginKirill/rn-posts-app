import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { IPost, changePost, deletePost } from '../Store/Slices/PostSlice';
import { useCallback, useMemo, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/AppNavigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../Store/Store';
import { inputTextValidate } from '../../Common';
import { Loader } from './UI/Loader';

export const PostCart: React.FC<IPost> = ({ id, title, body }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newBody, setNewBody] = useState<string>(body);
  const [error, setError] = useState<string | null>(null);

  const bodySplit = useMemo(
    () =>
      body.length >= 300
        ? `${body.split(' ').slice(0, 20).join(' ')}...`
        : body,
    [body]
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const deletePostToggle = useCallback(() => {
    dispatch(deletePost(id));
  }, [id]);

  const editPostToggle = useCallback(() => {
    setEditable(true);
  }, []);

  const cancelChangePost = useCallback(() => {
    setNewTitle(title);
    setNewBody(body);
    setEditable(false);
  }, [title, body]);

  const saveChanges = useCallback(() => {
    setError(null);
    if (inputTextValidate(newTitle)) {
      setError('Title must be filled');
      return;
    }
    if (inputTextValidate(newBody)) {
      setError('Body must be filled');
      return;
    }

    const changesPost = {
      title: newTitle.trim(),
      body: newBody.trim(),
      id,
    };

    setLoading(true);

    dispatch(changePost(changesPost))
      .then(({ meta: { arg } }) => {
        setNewTitle(arg.title);
        setNewBody(arg.body);
      })
      .finally(() => {
        setLoading(false);
        setEditable(false);
      });
  }, [newTitle, newBody]);

  const navigateToPost = useCallback(
    () => navigation.navigate('Post', { id }),
    [id]
  );

  const changeTitle = useCallback(
    (value: string) => setNewTitle(value),
    [newTitle]
  );
  const changeBody = useCallback(
    (value: string) => setNewBody(value),
    [newBody]
  );

  const content = useMemo(
    () => (
      <>
        <View style={styles.titleLine}>
          <View style={styles.flexOne}>
            <Text style={styles.title}>{newTitle}</Text>
          </View>
          <View>
            <View style={styles.btnBlock}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={deletePostToggle}
              >
                <AntDesign name="delete" size={24} color="black" />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={editPostToggle}
              >
                <AntDesign name="edit" size={24} color="black" />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <Text style={styles.body}>{bodySplit}</Text>
      </>
    ),
    [newTitle, newBody, editable]
  );

  const editableContent = useMemo(
    () => (
      <>
        <View style={styles.titleLine}>
          <View style={styles.flexOne}>
            <TextInput
              style={styles.activeTitle}
              multiline
              value={newTitle}
              editable={editable}
              onChangeText={changeTitle}
            />
          </View>
          <View>
            <View style={styles.btnBlock}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={cancelChangePost}
              >
                {!editable ? (
                  <AntDesign name="delete" size={24} color="black" />
                ) : (
                  <MaterialIcons name="cancel" size={24} color="black" />
                )}
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={saveChanges}
              >
                {!editable ? (
                  <AntDesign name="edit" size={24} color="black" />
                ) : (
                  <AntDesign name="save" size={24} color="black" />
                )}
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <TextInput
          style={styles.activeBody}
          multiline
          value={newBody}
          onChangeText={changeBody}
          scrollEnabled={editable}
        />
      </>
    ),
    [newTitle, newBody, editable]
  );

  return (
    <TouchableOpacity
      disabled={editable}
      onPress={navigateToPost}
      style={styles.postWraper}
    >
      {loading && <Loader title="Processing..." />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!editable ? content : editableContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  postWraper: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  btnBlock: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    minWidth: '100%',
    color: '#000',
  },
  activeTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minWidth: '100%',
    color: '#000',
  },
  body: {
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
  },
  activeBody: {
    fontSize: 14,
    lineHeight: 18,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    maxHeight: 180,

    color: '#000',
  },
  errorText: {
    color: 'red',
  },
});
