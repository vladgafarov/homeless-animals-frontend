import { createReducer } from '@reduxjs/toolkit'
import { addForm, addOriginal, addSelectedGroupsId } from '.'
import { PostEdit } from '../interfaces/IPost'

interface UpdatePostState {
   original: PostEdit
   form: Partial<PostEdit>
}

interface AddFormAction {
   payload: Partial<PostEdit>
   type
}

const initialState: UpdatePostState = {
   original: null,
   form: {},
}

export const updatePostReducer = createReducer(initialState, builder => {
   builder.addCase(addOriginal, (state, action) => {
      state.original = { ...action.payload }
   })
   builder.addCase(addForm, (state, action: AddFormAction) => {
      state.form = { ...action.payload }
   })
})
