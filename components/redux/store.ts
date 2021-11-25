import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { backendApi } from './api/backend'
import { postBuilderReducer } from './postBuilder'
import { updatePostReducer } from './updatePost'

export const store = configureStore({
   reducer: {
      [backendApi.reducerPath]: backendApi.reducer,
      postBuilder: postBuilderReducer,
      updatePost: updatePostReducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(backendApi.middleware),
   devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>
