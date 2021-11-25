import tw, { styled } from 'twin.macro'
import { useGetFiltersQuery } from '../redux/api/group/getFilters'
import Select from 'react-select'
import { prepareFilters } from '../../lib/prepareFilters'
import ErrorMessage from '../utils/ErrorMessage'
import { useAppDispatch } from '../redux/hooks'
import { addFilter } from '../redux/postBuilder'

const FilterStyles = styled.div`
   ${tw`flex flex-col flex-wrap md:flex-row mt-4`}

   h1 {
      ${tw`font-pb text-2xl w-full`}
   }
   > div {
      ${tw`
         flex-1
      `}
      &:first-of-type {
         ${tw`md:mr-12`}
      }
      p {
         ${tw`
            text-lg font-pm
         `}
      }
   }
`

const Filters = () => {
   const dispatch = useAppDispatch()

   const { isLoading, data: filters, error } = useGetFiltersQuery()

   return (
      <FilterStyles>
         <h1>Фильтры</h1>
         {isLoading ? (
            'Загрузка...'
         ) : error ? (
            <ErrorMessage error={error} />
         ) : (
            <>
               <div>
                  <p>Регион:</p>

                  <Select
                     placeholder="Выберите"
                     isClearable={true}
                     options={prepareFilters(filters)[0]}
                     onChange={selectedOption => {
                        dispatch(
                           addFilter({
                              region: selectedOption
                                 ? selectedOption.value
                                 : '',
                           })
                        )
                     }}
                  />
               </div>

               <div>
                  <p>Тип животного:</p>

                  <Select
                     placeholder="Выберите"
                     isClearable={true}
                     options={prepareFilters(filters)[1]}
                     onChange={selectedOption => {
                        dispatch(
                           addFilter({
                              animalType: selectedOption
                                 ? selectedOption.value
                                 : '',
                           })
                        )
                     }}
                  />
               </div>
            </>
         )}
      </FilterStyles>
   )
}

export default Filters
