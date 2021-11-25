import { createContext, Dispatch, SetStateAction } from 'react'

export interface Text {
   namePost: string
   ageAnimal: string
   description: string
}

export interface OriginalImages {
   id: number
   file: File
}

interface IPostBuilderContext {
   text: Text
   setText: Dispatch<SetStateAction<Text>>
   originalImages: OriginalImages[]
   setOriginalImages: Dispatch<SetStateAction<OriginalImages[]>>
}

export const PostBuilderContext = createContext<IPostBuilderContext | null>(
   null
)
