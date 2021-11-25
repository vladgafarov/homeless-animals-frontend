import { createAction } from '@reduxjs/toolkit'
import { PostEdit } from '../interfaces/IPost'

export const addOriginal = createAction<PostEdit>('addOriginal')
export const addForm = createAction<Partial<PostEdit>>('addForm')
