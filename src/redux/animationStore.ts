import { PayloadAction, configureStore } from '@reduxjs/toolkit'

export interface AnimationState {
  cursorRatio: number
}

const initialState: AnimationState = { cursorRatio: 0 }

const SET_ANIMATION_STATE = 'setAnimationState'

export function setAnimationState(newState: AnimationState): PayloadAction<AnimationState> {
  return {
    type: SET_ANIMATION_STATE,
    payload: newState
  }
}

export const animationStore = configureStore({
  reducer: (state = initialState, action: PayloadAction<any>) => {
    if (action.type === SET_ANIMATION_STATE) {
      return action.payload as AnimationState
    }
    return state
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type AnimationState = ReturnType<typeof animationStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AnimationDispatch = typeof animationStore.dispatch