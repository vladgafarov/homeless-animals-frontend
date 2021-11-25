import router from 'next/router'
import toast from 'react-hot-toast'
import { FaEdit, FaPause, FaPlay, FaTrash } from 'react-icons/fa'
import tw from 'twin.macro'
import { usePrefetch } from '../redux/api/post/getPost'
import { useStartPostMutation } from '../redux/api/post/startPost'
import { useStopPostMutation } from '../redux/api/post/stopPost'
import { PostList } from '../redux/interfaces/IPost'
import { TableButton } from '../styles/Buttons'
import Tooltip from '../utils/Tooltip'

const DELAY = 450

interface IButtonsCell {
   values: PostList
   userInfo: number
   onDelete: (id: number) => void
   isCanStart: boolean
}

const ButtonsCell = ({
   values,
   userInfo,
   onDelete,
   isCanStart,
}: IButtonsCell) => {
   const prefetchPost = usePrefetch('getPost')

   const [startPost, { isLoading: isStartPostLoading }] = useStartPostMutation()
   const [stopPost, { isLoading: isStopPostLoading }] = useStopPostMutation()

   return (
      <div tw="flex flex-col items-end space-y-2 lg:(flex-row justify-end space-x-2 space-y-0) ">
         {isCanStart ? (
            <Tooltip
               content="Запустить публикацию"
               delay={DELAY}
               interactive={false}
            >
               <TableButton
                  tw="bg-blue-300 text-white hover:(bg-blue-400) focus:(bg-blue-500)"
                  onClick={() => {
                     toast.promise(
                        startPost({
                           postId: values.postId,
                           userId: userInfo,
                        }).unwrap(),
                        {
                           loading: 'Запуск публикации',
                           success: () => {
                              return 'Публикацию запущена'
                           },
                           error: 'Не удалось запустить публикацию',
                        }
                     )
                  }}
                  disabled={isStartPostLoading}
               >
                  <FaPlay />
               </TableButton>
            </Tooltip>
         ) : (
            <Tooltip
               content="Остановить публикацию"
               delay={DELAY}
               interactive={false}
            >
               <TableButton
                  onClick={() => {
                     toast.promise(
                        stopPost({
                           postId: values.postId,
                           userId: userInfo,
                        }).unwrap(),
                        {
                           loading: 'Остановка публикации',
                           success: () => {
                              return 'Публикацию остановлена'
                           },
                           error: 'Не удалось остановить публикацию',
                        }
                     )
                  }}
                  disabled={isStopPostLoading}
               >
                  <FaPause />
               </TableButton>
            </Tooltip>
         )}
         <Tooltip content="Редактировать" delay={DELAY} interactive={false}>
            <TableButton
               onClick={() => router.push(`/edit/${values.postId}`)}
               onMouseEnter={() => prefetchPost({ postId: values.postId })}
            >
               <FaEdit />
            </TableButton>
         </Tooltip>
         <Tooltip content="Удалить" delay={DELAY} interactive={false}>
            <TableButton onClick={() => onDelete(values.postId)}>
               <FaTrash />
            </TableButton>
         </Tooltip>
      </div>
   )
}

export default ButtonsCell
