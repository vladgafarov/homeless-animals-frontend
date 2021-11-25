import KeenSlider from 'keen-slider'
import tw, { styled } from 'twin.macro'

const DotsStyles = styled.div`
   ${tw`flex justify-center py-3`}
   .dot {
      border: none;
      width: 10px;
      height: 10px;
      background: #c5c5c5;
      border-radius: 50%;
      margin: 0 5px;
      padding: 5px;
      cursor: pointer;
   }

   .dot:focus {
      outline: none;
   }

   .dot.active {
      ${tw`bg-blue-500`}
   }
`

export interface IDots {
   slider: KeenSlider
   currentSlide: number
}

const Dots = ({ slider, currentSlide }: IDots) => {
   return (
      <DotsStyles>
         {Array.from({ length: slider.details().size }, (_, idx) => {
            return (
               <button
                  key={idx}
                  onClick={() => {
                     slider.moveToSlide(idx)
                  }}
                  className={'dot' + (currentSlide === idx ? ' active' : '')}
               />
            )
         })}
      </DotsStyles>
   )
}

export default Dots
