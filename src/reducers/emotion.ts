import { getEmotionList, voteEmotion } from '@/services/emotion';
import { RootState } from '@/utils/store';
import { Action, createSlice, ThunkDispatch } from '@reduxjs/toolkit';

const emotionSlice = createSlice({
  name: 'emotion',
  initialState: {} as { emotion: string; list: Emotion[] },
  reducers: {
    set(_state, action) {
      return action.payload;
    },
    like(_state, action) {
      return {
        ..._state,
        list: _state.list.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, likes: item.likes + 1 };
          }
          return item;
        }),
      };
    },
  },
});

const actions = emotionSlice.actions;

export const syncEmotionList = (emotion: string, count: number) => async (dispatch: ThunkDispatch<RootState, void, Action>) => {
  const emotionList = await getEmotionList(emotion, count);
  dispatch(actions.set({
    emotion,
    list: emotionList,
  }));
};

export const voteForEmotion = (emotion: Emotion) => async (dispatch: ThunkDispatch<RootState, void, Action>) => {
  await voteEmotion(emotion.id);
  dispatch(actions.like(emotion));
};

export default emotionSlice.reducer;
