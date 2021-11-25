import tw, { styled } from 'twin.macro'

export const SliderWrapper = styled.div`
   ${tw`relative border-2 border-gray-200`}
   .slider {
      .slide {
         background: white;
         display: flex;
         align-items: center;
         justify-content: center;
         width: 100%;
         height: 400px;
         position: relative;
      }
   }
`
