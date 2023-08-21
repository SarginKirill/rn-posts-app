import { useCallback, useState } from 'react';
import { useAppDispatch } from '../Store/Store';
import {
  IComment,
  changeComment,
  deleteComment,
} from '../Store/Slices/CommentsSlice';

export const useComments = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const deleteCommentToggle = useCallback((id: number) => {
    dispatch(deleteComment(id));
  }, []);

  const saveChanges = useCallback((changedComment: IComment) => {
    setLoading(true);
    const changesPost = {
      text: changedComment.text,
      id: changedComment.id,
      postId: changedComment.postId,
    };

    dispatch(changeComment(changesPost)).finally(() => setLoading(false));
  }, []);

  return {
    loading,
    deleteCommentToggle,
    saveChanges,
  };
};
