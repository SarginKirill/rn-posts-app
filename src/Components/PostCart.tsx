import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { IPost, changePost, deletePost } from '../Store/Slices/PostSlice';
import { useCallback, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/AppNavigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../Store/Store';
import { inputTextValidate } from '../../Common';

export const PostCart: React.FC<IPost> = ({ id, title, body }) => {
  console.log('Render PostCart');

  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newBody, setNewBody] = useState<string>(body);
  const [error, setError] = useState<string | null>(null);

  const bodySplit =
    body.length >= 300 ? `${body.split(' ').slice(0, 20).join(' ')}...` : body;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const dispatch = useAppDispatch();

  const deletePostToggle = useCallback(() => {
    dispatch(deletePost(id));
  }, []);

  const editPostToggle = useCallback(() => {
    setEditable(true);
  }, []);

  const cancelChangePost = useCallback(() => {
    setNewTitle(title);
    setNewBody(body);
    setEditable(false);
  }, []);

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
      title: newTitle,
      body: newBody,
      id,
    };
    setLoading(true);

    dispatch(changePost(changesPost)).finally(() => {
      setLoading(false);
      setEditable(false);
    });
  }, [newTitle, newBody]);

  {
    /* TODO: тайтл инпут выталкивает иконки */
  }

  return (
    <TouchableOpacity
      disabled={editable}
      onPress={() => navigation.navigate('Post', { id })}
      style={styles.postWraper}
    >
      <>
        {loading && <Text>Processing...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={styles.titleLine}>
          <View style={{ maxWidth: '70%' }}>
            <TextInput
              style={!editable ? styles.title : styles.activeTitle}
              multiline
              value={newTitle}
              editable={editable}
              onChangeText={(value) => setNewTitle(value)}
            />
          </View>
          <View>
            <View style={styles.btnBlock}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={!editable ? deletePostToggle : cancelChangePost}
              >
                {!editable ? (
                  <AntDesign name="delete" size={24} color="black" />
                ) : (
                  <MaterialIcons name="cancel" size={24} color="black" />
                )}
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={!editable ? editPostToggle : saveChanges}
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
          editable={editable}
          style={editable ? styles.activeBody : styles.body}
          multiline
          value={editable ? newBody : bodySplit}
          onChangeText={(value) => setNewBody(value)}
          scrollEnabled={editable}
        />
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
