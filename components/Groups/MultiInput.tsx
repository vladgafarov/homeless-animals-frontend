import tw, { styled } from 'twin.macro'
import CreatableSelect from 'react-select/creatable'
import { ActionMeta } from 'react-select'
import {
   Dispatch,
   KeyboardEventHandler,
   SetStateAction,
   useEffect,
   useState,
} from 'react'

const components = {
   DropdownIndicator: null,
}

export interface Option {
   readonly label: string
   readonly value: string
}

const createOption = (label: string) => ({
   label,
   value: label,
})

interface IMultiInput {
   placeholder: string
   setExternalState: Dispatch<SetStateAction<Option[]>>
}

const MultiSelectStyles = styled(CreatableSelect)`
   .multiselect__control {
      ${tw`
         py-0.5
         border-2 border-blue-400 rounded 
         outline-none
         transition
         hover:(border-blue-500)
         focus:(ring-2 ring-offset-blue-500 border-blue-500)
      `}
   }
   input {
      ${tw`
         outline-none
         focus:(ring-0)
      `}
   }
`

const MultiInput = ({ placeholder, setExternalState }: IMultiInput) => {
   const [inputValue, setInputValue] = useState<string>('')
   const [value, setValue] = useState<Option[]>([])

   const handleChange = (value: Option[], actionMeta: ActionMeta<Option>) => {
      setValue(value)
   }
   const handleInputChange = (inputValue: string) => {
      setInputValue(inputValue)
   }
   const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
      if (!inputValue) return
      switch (event.key) {
         case 'Enter':
         case 'Tab':
            setValue(prev => [...prev, createOption(inputValue)])
            setInputValue('')
            event.preventDefault()
      }
   }

   useEffect(() => {
      setExternalState(value)
   }, [value, setExternalState])

   return (
      <MultiSelectStyles
         components={components}
         inputValue={inputValue}
         isClearable
         isMulti
         menuIsOpen={false}
         onChange={handleChange}
         onInputChange={handleInputChange}
         onKeyDown={handleKeyDown}
         placeholder={placeholder}
         value={value}
         className="multiselect-container"
         classNamePrefix="multiselect"
      />
   )
}

export default MultiInput
