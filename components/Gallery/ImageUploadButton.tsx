import { FaPlus } from 'react-icons/fa'
import tw, { styled } from 'twin.macro'

const ImageUploadButtonStyles = styled.div`
   ${tw`
      relative 
      w-full lg:w-1/5 
      bg-blue-500 
      rounded 
      py-2 px-5 
      text-white text-center
      overflow-hidden
      transition
   `}

   input[type='file'] {
      ${tw`opacity-0 absolute inset-0 w-full`}
      ${(props: { disabled: boolean }) =>
         props.disabled ? '' : tw`cursor-pointer`}
   }

   label {
      ${tw`w-full text-center mt-0`}
   }

   ${(props: { disabled: boolean }) =>
      props.disabled ? tw`opacity-40` : tw`hover:(bg-blue-400)`}
`

const ImageUploadButton = ({
   uploadImage,
   disabled,
}: {
   uploadImage: (event) => void
   disabled: boolean
}) => {
   return (
      <ImageUploadButtonStyles {...{ disabled }}>
         <input
            type="file"
            name="file"
            onChange={uploadImage}
            disabled={disabled}
            accept="image/*"
            multiple
         />
         <label htmlFor="file">Добавить фотографии</label>
      </ImageUploadButtonStyles>
   )
}

export default ImageUploadButton
