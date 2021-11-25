// @ts-nocheck
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import tw, { styled } from 'twin.macro'
import {
   useFlexLayout,
   usePagination,
   useRowSelect,
   useSortBy,
   useTable,
} from 'react-table'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import {
   FaAngleDoubleLeft,
   FaAngleDoubleRight,
   FaAngleLeft,
   FaAngleRight,
} from 'react-icons/fa'
import { useAppDispatch } from '../redux/hooks'
import { addInterval, addSelectedGroupsId } from '../redux/postBuilder'
import DatePicker from './DatePicker'
import Select from 'react-select'
import {
   Pagination,
   TableBody,
   TableData,
   TableHead,
   TableHeader,
   TableRow,
   TableStyles,
   TableWrapper,
} from '../styles/Table'

const options = [
   { value: 'Каждую минуту', label: 'Каждую минуту' },
   { value: 'Каждый час', label: 'Каждый час' },
   { value: 'Каждый день', label: 'Каждый день' },
   { value: 'Каждые три дня', label: 'Каждые три дня' },
   { value: 'Каждую неделю', label: 'Каждую неделю' },
   { value: 'Каждые 2 недели', label: 'Каждые 2 недели' },
   { value: 'Каждый месяц', label: 'Каждый месяц' },
]

interface ITable<T> {
   data: T[]
   columns: object[]
}

//eslint-disable-next-line
const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
   const defaultRef = useRef()
   const resolvedRef = ref || defaultRef

   useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
   }, [resolvedRef, indeterminate])

   return (
      <div tw="flex items-center justify-center">
         <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
   )
})

const GroupsWithFiltersTable = ({ data, columns }: ITable) => {
   const dispatch = useAppDispatch()
   const tableData = useMemo(() => [...data], [data])

   const tableHooks = hooks => {
      hooks.visibleColumns.push(columns => {
         return [
            ...columns,
            {
               id: 'date',
               Header: 'Время начала публикации',
               //eslint-disable-next-line
               Cell: ({ row: { original: group } }) => {
                  return <DatePicker groupId={group.id} />
               },
               minWidth: 220,
               width: 220,
               maxWidth: 220,
            },
            {
               id: 'frequency',
               Header: 'Частота',
               minWidth: 160,
               width: 160,
               maxWidth: 180,
               //eslint-disable-next-line
               Cell: ({ row: { original: group } }) => (
                  <Select
                     tw="lg:w-4/5"
                     placeholder="Выберите"
                     options={options}
                     isSearchable={false}
                     isClearable={true}
                     onChange={selectedOption => {
                        if (selectedOption) {
                           dispatch(
                              addInterval({
                                 groupId: group.id,
                                 publicationInterval: selectedOption.value,
                              })
                           )
                        } else {
                           dispatch(
                              addInterval({
                                 groupId: group.id,
                                 publicationInterval: undefined,
                              })
                           )
                        }
                     }}
                  />
               ),
            },
            {
               id: 'selection',
               minWidth: 60,
               width: 90,
               maxWidth: 120,
               //eslint-disable-next-line
               Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div tw="flex items-center justify-end pr-1">
                     <Checkbox {...getToggleAllRowsSelectedProps()} />
                  </div>
               ),
               //eslint-disable-next-line
               Cell: ({ row }) => (
                  <div>
                     <Checkbox {...row.getToggleRowSelectedProps()} />
                  </div>
               ),
               width: 20,
            },
         ]
      })
   }

   const tableInstance = useTable(
      {
         columns,
         data: tableData,
         initialState: { pageIndex: 0, hiddenColumns: ['id'] },
      },
      tableHooks,
      useFlexLayout,
      useSortBy,
      usePagination,
      useRowSelect
   )

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      selectedFlatRows,
      state: { pageIndex, pageSize, selectedRowIds },
   } = tableInstance

   useEffect(() => {
      setPageSize(5)
   }, [setPageSize])

   useEffect(() => {
      dispatch(addSelectedGroupsId(selectedRowIds))
   }, [selectedRowIds, dispatch])

   const isOdd = (i: number) => i % 2 !== 0

   return (
      <>
         <TableWrapper>
            <TableStyles {...getTableProps()}>
               <TableHead>
                  {headerGroups.map((headerGroup, i) => (
                     <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
                        {headerGroup.headers.map((column, i) => (
                           <TableHeader
                              {...column.getHeaderProps(
                                 column.getSortByToggleProps()
                              )}
                              key={i}
                           >
                              {column.render('Header')}
                              {column.isSorted ? (
                                 column.isSortedDesc ? (
                                    <MdArrowDropDown />
                                 ) : (
                                    <MdArrowDropUp />
                                 )
                              ) : (
                                 ''
                              )}
                           </TableHeader>
                        ))}
                     </TableRow>
                  ))}
               </TableHead>
               <TableBody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                     prepareRow(row)

                     return (
                        <TableRow
                           {...row.getRowProps()}
                           key={i}
                           css={isOdd(i) ? tw`bg-blue-100 bg-opacity-50` : ''}
                        >
                           {row.cells.map((cell, i) => (
                              <TableData {...cell.getCellProps()} key={i}>
                                 {cell.render('Cell')}
                              </TableData>
                           ))}
                        </TableRow>
                     )
                  })}
               </TableBody>
            </TableStyles>
         </TableWrapper>
         {data.length >= pageSize && (
            <Pagination>
               <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  <FaAngleDoubleLeft />
               </button>
               <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
               >
                  <FaAngleLeft />
               </button>
               <span>
                  <span>Страница </span>
                  <strong>
                     {pageIndex + 1} из {pageOptions.length}
                  </strong>
               </span>
               <button onClick={() => nextPage()} disabled={!canNextPage}>
                  <FaAngleRight />
               </button>
               <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
               >
                  <FaAngleDoubleRight />
               </button>
            </Pagination>
         )}
      </>
   )
}

export default GroupsWithFiltersTable
