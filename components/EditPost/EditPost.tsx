import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { scroller } from 'react-scroll'
import tw, { styled } from 'twin.macro'
import { FaCheck, FaSave, FaAngleRight, FaPlay, FaStop } from 'react-icons/fa'
import UpdatePost from './UpdatePost'
import Gallery from '../Gallery/Gallery'
import GroupsWithFilters from './GroupsWithFilters'
import { Button, GreenButton } from '../styles/Buttons'
import { OriginalImages, EditPostContext, Text } from './EditPostContext'
import { useAppSelector } from '../redux/hooks'
import { postBuilderSelector } from '../redux/postBuilder'
import ErrorMessage from '../utils/ErrorMessage'
import { preparePublicationGroups } from '../../lib/preparePublicationGroups'
import LoadingOverlay from '../utils/LoadingOverlay'
import toast from 'react-hot-toast'
import { wait } from '../../lib/wait'
import router, { useRouter } from 'next/router'
import { AnimateSharedLayout } from 'framer-motion'
import SmoothTransition from '../Animations/SmoothTransition'
import { useGetPostQuery } from '../redux/api/post/getPost'
import { useUpdatePostMutation } from '../redux/api/post/updatePost'
import Filters from './Filters'
import { useStartPostMutation } from '../redux/api/post/startPost'
import { useStopPostMutation } from '../redux/api/post/stopPost'
import { useGetPostStatusQuery } from '../redux/api/post/getPostStatus'
import TabsSkeleton from '../utils/skeletons/TabsSkeleton'
import FormSkeleton from '../utils/skeletons/FormSkeleton'
import FilterSkeleton from '../utils/skeletons/FilterSkeleton'
import TitleSkeleton from '../utils/skeletons/TitleSkeleton'
import TableSkeleton from '../utils/skeletons/TableSkeleton'

const TabListStyles = styled(TabList)`
   ${tw`
      overflow-x-auto overflow-y-hidden
      flex items-stretch
      border-2 border-gray-300
      min-w-full
      divide-x-2
      mt-6
      rounded
   `}
`

const TabStyles = styled(Tab)`
   ${tw`
      flex-1
      relative
      text-center text-xl text-gray-400
      transition
      border-b-2 border-b-white
      py-2 px-5
      font-pb
      flex items-center justify-center
      whitespace-nowrap
   `}
   &:hover {
      ${props => !props.selected && tw`text-gray-600`}
   }
   &:nth-of-type(2) {
      ${tw`relative`}
      .gray-left, .white-left, .gray-right, .white-right {
         ${tw`absolute top-1/2 transform -translate-y-1/2`}
         width: 0;
         height: 0;
         border-style: solid;
      }
      .gray-left,
      .gray-right {
         border-width: 7.5px 0 7.5px 15px;
         border-color: transparent transparent transparent #e5e7eb;
      }
      .white-left,
      .white-right {
         border-width: 6px 0 6px 12px;
         border-color: transparent transparent transparent white;
         z-index: 39;
      }
      .gray-left,
      .white-left {
         left: -2px;
      }
      .gray-right,
      .white-right {
         left: 100%;
      }
   }
   ${props => props.selected && tw`text-blue-500`}
   ${props => props.$success && tw`text-gray-700`}
   .number {
      ${tw`
         flex items-center justify-center
         p-3 mr-3
         w-7 h-7
         text-sm text-gray-400
         border-2 border-gray-400
         rounded-full
         transition
      `}
      ${props =>
         props.selected && !props.$success && tw`text-blue-500 border-blue-500`}
      ${props =>
         props.$success &&
         tw`text-white bg-blue-500 border-blue-500 w-auto h-auto p-1`}
   }
   .smooth {
      ${tw`
         absolute inset-x-0 -bottom-0.5 h-0.5
         bg-blue-500
      `}
      z-index: 39;
   }
`
const TabPanelsStyles = styled(TabPanels)``
const TabPanelStyles = styled(TabPanel)``

const PostBuilderProvider = EditPostContext.Provider

const EditPost = ({ userInfo }) => {
   const {
      query: { postId },
   } = useRouter()

   const {
      data: original,
      error,
      isLoading,
   } = useGetPostQuery({
      postId: parseInt(postId as string),
   })

   const {
      data: status,
      isLoading: isStatusLoading,
      error: errorGetStatus,
      refetch: refetchStatus,
   } = useGetPostStatusQuery({
      postId: parseInt(postId as string),
   })

   const [index, setIndex] = useState<number>(2)
   const [isGalleryVisited, setIsGalleryVisited] = useState<boolean>(false)
   const [originalImages, setOriginalImages] = useState<OriginalImages[]>([])
   const [text, setText] = useState<Text>()
   const [isCanStart, setIsCanStart] = useState<boolean>()

   const [
      updatePost,
      {
         error: updatePostError,
         data: updatePostData,
         isLoading: isUpdatePostLoading,
      },
   ] = useUpdatePostMutation()
   const [startPost, { error: errorStartPost, isLoading: isStartPostLoading }] =
      useStartPostMutation()
   const [stopPost, { error: errorStopPost, isLoading: isStopPostLoading }] =
      useStopPostMutation()

   const {
      groups,
      selectedGroupsId,
      groupsTimeInfo,
      filters: { region, animalType },
   } = useAppSelector(postBuilderSelector)

   const updatePostFunc = async () => {
      const selectedGroups = preparePublicationGroups(
         groups,
         selectedGroupsId,
         groupsTimeInfo
      )

      let formData = new FormData()

      formData.append('UserId', userInfo)
      formData.append('PostId', postId as string)
      formData.append('Region', region)
      formData.append('TypeAnimal', animalType)
      formData.append('NamePost', text.namePost)
      formData.append('AgeAnimal', text.ageAnimal)
      selectedGroups.forEach(selectedGroup => {
         const { id, ...group } = selectedGroup
         formData.append('PostingSchedules', JSON.stringify(group))
      })
      formData.append('Description', text.description)
      originalImages?.forEach((image, i) => {
         formData.append(`pictures`, image.file)
      })
      await updatePost(formData)
         .unwrap()
         .then(async res => {
            toast.success('Пост обновлен')
            await wait(2000)
            router.reload()
         })
   }

   const value = {
      text,
      setText,
      originalImages,
      setOriginalImages,
      original,
   }

   useEffect(() => {
      if (index === 1) {
         setIsGalleryVisited(true)
      }
   }, [index])

   useEffect(() => {
      if (status) {
         setIsCanStart(status === 'Draft' || status === 'Stopped')
      }
   }, [status, isCanStart])

   return (
      <>
         {isLoading ? (
            <>
               <TabsSkeleton />
               <FilterSkeleton />
               <TitleSkeleton />
               <TableSkeleton />
            </>
         ) : error ? (
            <ErrorMessage error={error} />
         ) : (
            <PostBuilderProvider value={value}>
               <Tabs
                  index={index}
                  onChange={index => setIndex(index)}
                  id="tabs"
               >
                  <AnimateSharedLayout>
                     <TabListStyles>
                        <TabStyles selected={index === 0} $success={text}>
                           <div className="number">
                              {text ? <FaCheck /> : '1'}
                           </div>
                           <span>Описание поста</span>
                           {index === 0 && <SmoothTransition name="smooth" />}
                        </TabStyles>
                        <TabStyles
                           selected={index === 1}
                           $success={original.photoLinks.length > 0}
                        >
                           <div className="number">
                              {original.photoLinks.length > 0 ? (
                                 <FaCheck />
                              ) : (
                                 '2'
                              )}
                           </div>
                           <span>Галерея</span>
                           <span className="gray-left"></span>
                           <span className="white-left"></span>
                           <span className="gray-right"></span>
                           <span className="white-right"></span>
                           {index === 1 && <SmoothTransition name="smooth" />}
                        </TabStyles>
                        <TabStyles
                           selected={index === 2}
                           $success={Object.keys(selectedGroupsId).length > 0}
                        >
                           <div className="number">
                              {Object.keys(selectedGroupsId).length > 0 ? (
                                 <FaCheck />
                              ) : (
                                 '3'
                              )}
                           </div>
                           <span>Фильтры</span>
                           {index === 2 && <SmoothTransition name="smooth" />}
                        </TabStyles>
                     </TabListStyles>
                  </AnimateSharedLayout>

                  <TabPanelsStyles>
                     <TabPanelStyles>
                        <UpdatePost setIndex={setIndex} />
                     </TabPanelStyles>
                     <TabPanelStyles>
                        {(index === 1 || isGalleryVisited) && (
                           <Gallery
                              setOriginalImages={setOriginalImages}
                              defaultImages={original.photoLinks}
                           />
                        )}
                        <GreenButton
                           type="button"
                           onClick={() => {
                              setIndex(2)
                              scroller.scrollTo('tabs', {
                                 duration: 650,
                                 smooth: true,
                                 offset: -30,
                              })
                           }}
                           tw="flex items-center font-pm mb-6"
                        >
                           Далее <FaAngleRight tw="ml-1" size={18} />
                        </GreenButton>
                     </TabPanelStyles>
                     <TabPanelStyles>
                        <Filters />
                        <GroupsWithFilters />

                        <div tw="mt-8">
                           {!text && (
                              <p tw="font-pb pb-2 text-gray-500">
                                 Заполните описание
                              </p>
                           )}
                           {Object.keys(selectedGroupsId).length === 0 && (
                              <p tw="font-pb pb-2 text-gray-500">
                                 Выберите как минимум 1 группу
                              </p>
                           )}
                        </div>

                        {(error || updatePostError) && (
                           <ErrorMessage error={error || updatePostError} />
                        )}

                        <GreenButton
                           type="button"
                           onClick={updatePostFunc}
                           tw="flex items-center font-pm mt-6 mb-3"
                           disabled={
                              !text ||
                              Object.keys(selectedGroupsId).length === 0 ||
                              !isCanStart
                           }
                        >
                           <LoadingOverlay
                              loading={isUpdatePostLoading}
                              size="sm"
                           />
                           Сохранить пост <FaSave tw="ml-1" size={18} />
                        </GreenButton>

                        {(errorStartPost || errorStopPost) && (
                           <ErrorMessage
                              error={errorStartPost || errorStopPost}
                           />
                        )}

                        {isStatusLoading ? (
                           <p>Loading...</p>
                        ) : errorGetStatus ? (
                           <ErrorMessage error={errorGetStatus} />
                        ) : (
                           <div tw="flex flex-col space-y-3 lg:(flex-row space-x-3 space-y-0) items-start mb-12">
                              <Button
                                 type="button"
                                 tw="flex items-center"
                                 disabled={!isCanStart}
                                 onClick={async () => {
                                    await startPost({
                                       userId: parseInt(userInfo),
                                       postId: parseInt(postId as string),
                                    })
                                       .unwrap()
                                       .then(() => {
                                          toast.success(
                                             'Публикация поста началась'
                                          )
                                          refetchStatus()
                                       })
                                 }}
                              >
                                 <LoadingOverlay
                                    loading={isStartPostLoading}
                                    size="sm"
                                 />
                                 Начать публикацию
                                 <FaPlay tw="ml-2" size="14" />
                              </Button>
                              <Button
                                 type="button"
                                 tw="flex items-center"
                                 disabled={isCanStart}
                                 onClick={async () => {
                                    await stopPost({
                                       userId: parseInt(userInfo),
                                       postId: parseInt(postId as string),
                                    })
                                       .unwrap()
                                       .then(() => {
                                          toast.success(
                                             'Публикация поста остановлена'
                                          )
                                          refetchStatus()
                                       })
                                 }}
                              >
                                 <LoadingOverlay
                                    loading={isStopPostLoading}
                                    size="sm"
                                 />
                                 Остановить публикацию
                                 <FaStop tw="ml-2" size="14" />
                              </Button>
                           </div>
                        )}
                     </TabPanelStyles>
                  </TabPanelsStyles>
               </Tabs>
            </PostBuilderProvider>
         )}
      </>
   )
}

export default EditPost
