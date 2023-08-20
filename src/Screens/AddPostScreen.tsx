import { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../Components/UI/Input';
import { Button } from '../Components/UI/Button';
import { useAppDispatch } from '../Store/Store';
import { IPost, addPost } from '../Store/Slices/PostSlice';
import { RootStackParamList } from '../Navigation/AppNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import { inputTextValidate } from '../../Common';

export const AddPostScreen: React.FC<
  StackScreenProps<RootStackParamList, 'AddPost'>
> = ({ navigation }) => {
  console.log('Render AddPostScreen');

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [validate, setValidate] = useState<string | null>(null);

  const addNewPost = useCallback(() => {
    setValidate(null);

    if (inputTextValidate(title)) {
      setValidate('Input Title must be field');
      return;
    }
    if (inputTextValidate(body)) {
      setValidate('Input Body must be field');
      return;
    }

    const newPost: IPost = {
      title,
      body,
      id: +Date.now(),
    };
    dispatch(addPost(newPost));
    navigation.goBack();
  }, [title, body, validate]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.screenWrapper}>
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Title:</Text>
          <Input
            value={title}
            placeholder="Enter title"
            onTextChange={(text) => setTitle(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>Body:</Text>
          <Input
            value={body}
            placeholder="Enter text"
            onTextChange={(text) => setBody(text)}
            style={{ ...styles.input, ...styles.bodyInput }}
            multiline
          />
        </View>
      </View>
      <View>
        {validate && <Text style={styles.errorText}>{validate}</Text>}
        <Button style={styles.btn} title="Add new post" onPress={addNewPost} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    paddingHorizontal: 16,
    paddingTop: 24,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flexDirection: 'column',
    gap: 30,
  },
  inputWrapper: {},
  inputTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    lineHeight: 24,
  },
  bodyInput: {
    height: 300,
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#FF7F50',
    marginBottom: 16,
    marginTop: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});
