import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const selectPostBuilder = (state: RootState) => state.postBuilder

export const postBuilderSelector = createSelector(
   selectPostBuilder,
   state => state
)
