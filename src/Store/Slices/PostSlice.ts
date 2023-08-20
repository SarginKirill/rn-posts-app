import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../../Common';

export interface IPost {
  id: number;
  title: string;
  body: string;
}

interface IState {
  posts: IPost[];
  loading: boolean;
}

const initialState: IState = {
  posts: [],
  loading: false,
};
const sliceName = 'posts';

export const getPosts = createAsyncThunk(`${sliceName}/getPosts`, async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = (await response.json()) as IPost[];
  return data;
});

export const addPost = createAsyncThunk(
  `${sliceName}/addPosts`,
  async (post: IPost) => {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    const data = (await response.json()) as IPost;
    return data;
  }
);

export const deletePost = createAsyncThunk(
  `${sliceName}/deletePosts`,
  async (postID: number) => {
    const response = await fetch(`${BASE_URL}/posts/${postID}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    return postID;
  }
);

export const changePost = createAsyncThunk(
  `${sliceName}/changePosts`,
  async (post: IPost) => {
    const { id } = post;
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(post),
    });

    const data = (await response.json()) as IPost;
    if (!!Object.keys(data).length) return data;
    return post;
  }
);

export const postSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    }),
      builder.addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      }),
      builder.addCase(deletePost.fulfilled, (state, action) => {
        const index = state.posts?.findIndex((el) => el.id === action.payload);
        state.posts.splice(index, 1);
      }),
      builder.addCase(changePost.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(changePost.fulfilled, (state, action) => {
        const { id, title, body } = action.payload;
        const index = state.posts.findIndex((post) => post.id === id);
        state.posts[index] = {
          id,
          title,
          body,
        };
        state.loading = false;
      });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
