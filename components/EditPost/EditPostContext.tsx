import { createContext, Dispatch, SetStateAction } from 'react'
import { PostEdit } from '../redux/interfaces/IPost'

export interface Text {
   namePost: string
   ageAnimal: string
   description: string
}

export interface OriginalImages {
   id: number
   file: File
}

interface IEditPostContext {
   text: Text
   setText: Dispatch<SetStateAction<Text>>
   originalImages: OriginalImages[]
   setOriginalImages: Dispatch<SetStateAction<OriginalImages[]>>
   original: PostEdit
}

export const EditPostContext = createContext<IEditPostContext | null>(null)
