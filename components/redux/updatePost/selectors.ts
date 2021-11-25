import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const selectUpdatePost = (state: RootState) => state.updatePost

export const updatePostSelector = createSelector(
   selectUpdatePost,
   state => state
)
