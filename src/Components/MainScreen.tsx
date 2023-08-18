import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {
  RootState,
  store,
  useAppDispatch,
  useAppSelector,
} from '../Store/Store';
import { Provider, useDispatch } from 'react-redux';
import {
  addPost,
  changePost,
  deletePost,
  getPosts,
} from '../Store/Slices/PostSlice';

export default function MainScreen() {
  const [count, setCount] = useState<number>(0);

  const dispatch = useAppDispatch();
  const test = () => {
    dispatch(getPosts());
  };
  const test2 = () => {
    dispatch(addPost({ id: 5, title: 'KIRILL', body: 'Text' }));
  };

  const deltest3etePost = () => {
    dispatch(deletePost(5));
  };

  const update = () => {
    dispatch(
      changePost({
        id: 5,
        title: 'NEW KIRILL',
        body: 'Text',
      })
    );
  };

  const state = useAppSelector((store: RootState) => store.posts);

  useEffect(() => {
    console.log('STATE KIRILL', state);
  }, [state]);

  const fetchData = () => {
    fetch('https://my-json-server.typicode.com/SarginKirill/db-api/posts')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // const title = data.title;
        console.log('Title:', data);
      })
      .catch((err) => console.log('ERROR______', err));
  };

  const postData = () => {
    const test = {
      id: 123,
      title: 'My POST YES YES YES',
    };

    fetch('https://my-json-server.typicode.com/SarginKirill/db-api/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(test),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('RESULT POST', data);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TouchableHighlight style={styles.btn} onPress={fetchData}>
        <Text>Fetch</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.btn} onPress={postData}>
        <Text>Post POST</Text>
      </TouchableHighlight>
      <StatusBar style="auto" />
      <TouchableHighlight style={styles.btn} onPress={test}>
        <Text>Get data redux</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.btn} onPress={test2}>
        <Text>ADD POST redux</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.btn} onPress={deltest3etePost}>
        <Text>DELETE POST redux</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.btn} onPress={update}>
        <Text style={{ color: '#fff' }}>CHANGE POST redux</Text>
      </TouchableHighlight>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 10,
  },
});
