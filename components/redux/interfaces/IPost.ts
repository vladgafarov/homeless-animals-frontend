export interface PublicationGroup {
   // id: number
   nameGroup: string
   publicationDataTime: string
   publicationInterval: string
}

export interface Post {
   userId: number
   namePost: string
   description: string
}

export interface PostSave extends Post {
   region: string
   typeAnimal: string
   ageAnimal: string
   postingSchedules: PublicationGroup[]
   pictures: FormData
}

export interface PostEdit extends Omit<PostSave, 'pictures'> {
   postId: number
   photoLinks: string[]
}

export interface PostList extends Post {
   postId: number
   postStatus: string
}
