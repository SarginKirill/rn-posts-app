import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../../Common';
import { getPosts } from './PostSlice';

export interface IComment {
  id: number;
  postId: number;
  text: string;
}

interface IState {
  comments: IComment[];
}

const initialState: IState = {
  comments: [],
};
const sliceName = 'comments';

export const getComments = createAsyncThunk(
  `${sliceName}/getComments`,
  async (postId: number) => {
    const response = await fetch(`${BASE_URL}/comments/?postId=${postId}`);
    const data = (await response.json()) as IComment[];
    return data;
  }
);

export const addComment = createAsyncThunk(
  `${sliceName}/addComment`,
  async (comment: IComment) => {
    const response = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    const data = (await response.json()) as IComment;
    return data;
  }
);

export const deleteComment = createAsyncThunk(
  `${sliceName}/deleteComment`,
  async (commentID: number) => {
    const response = await fetch(`${BASE_URL}/comments/${commentID}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    return commentID;
  }
);

export const changeComment = createAsyncThunk(
  `${sliceName}/changeComment`,
  async (comment: IComment) => {
    const { id } = comment;
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(comment),
    });

    const data = (await response.json()) as IComment;
    if (!!Object.keys(data).length) return data;
    return comment;
  }
);

export const commentsSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    }),
      builder.addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      }),
      builder.addCase(deleteComment.fulfilled, (state, action) => {
        const index = state.comments?.findIndex(
          (el) => el.id === action.payload
        );
        state.comments.splice(index, 1);
      }),
      builder.addCase(changeComment.fulfilled, (state, action) => {
        const { id, postId, text } = action.payload;
        const index = state.comments.findIndex((comment) => comment.id === id);
        state.comments[index] = {
          id,
          text,
          postId,
        };
      });
  },
});

export const {} = commentsSlice.actions;

export default commentsSlice.reducer;
