import tw, { styled } from 'twin.macro'
import { useGetFiltersQuery } from '../redux/api/group/getFilters'
import Select from 'react-select'
import { prepareFilters } from '../../lib/prepareFilters'
import ErrorMessage from '../utils/ErrorMessage'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addFilter } from '../redux/postBuilder'
import { updatePostSelector } from '../redux/updatePost'
import { useContext, useEffect } from 'react'
import { EditPostContext } from './EditPostContext'
import FilterSkeleton from '../utils/skeletons/FilterSkeleton'
import TitleSkeleton from '../utils/skeletons/TitleSkeleton'

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

   const {
      original: { region, typeAnimal },
   } = useContext(EditPostContext)

   const { isLoading, data: filters, error } = useGetFiltersQuery()

   useEffect(() => {
      dispatch(
         addFilter({
            region,
            animalType: typeAnimal,
         })
      )
   }, [dispatch, region, typeAnimal])

   return (
      <>
         {isLoading ? (
            <FilterSkeleton />
         ) : error ? (
            <ErrorMessage error={error} />
         ) : (
            <FilterStyles>
               <h1>Фильтры</h1>
               <div>
                  <p>Регион:</p>

                  <Select
                     placeholder="Выберите"
                     isClearable={true}
                     options={prepareFilters(filters)[0]}
                     defaultValue={
                        region
                           ? {
                                value: region,
                                label: region,
                             }
                           : null
                     }
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
                     defaultValue={
                        typeAnimal
                           ? {
                                value: typeAnimal,
                                label: typeAnimal,
                             }
                           : null
                     }
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
            </FilterStyles>
         )}
      </>
   )
}

export default Filters
