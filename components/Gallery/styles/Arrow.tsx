import tw, { styled } from 'twin.macro'

export const Arrow = styled.div`
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   cursor: pointer;
   ${tw`flex justify-center items-center h-12 w-12`}
   ${(props: { disabled: boolean }) => props.disabled && tw`opacity-30`}
`
