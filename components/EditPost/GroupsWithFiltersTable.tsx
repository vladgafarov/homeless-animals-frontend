// @ts-nocheck
import { forwardRef, useEffect, useMemo, useRef, useContext } from 'react'
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
import { addSelectedGroupsId } from '../redux/postBuilder'
import DatePicker from './DatePicker'
import { selectGroups } from '../../lib/selectGroups'
import SelectInterval from './SelectInterval'
import { EditPostContext } from './EditPostContext'
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
   const { original } = useContext(EditPostContext)
   const tableData = useMemo(() => [...data], [data])

   const tableHooks = hooks => {
      hooks.visibleColumns.push(columns => {
         return [
            ...columns,
            {
               id: 'date',
               Header: 'Время начала публикации',
               //eslint-disable-next-line
               Cell: ({ row: { original: group, index } }) => {
                  return <DatePicker group={group} index={index} />
               },
               minWidth: 220,
               width: 220,
               maxWidth: 220,
            },
            {
               id: 'frequency',
               Header: 'Частота',
               minWidth: 220,
               width: 220,
               maxWidth: 220,
               //eslint-disable-next-line
               Cell: ({ row: { original: group, index } }) => (
                  <SelectInterval group={group} index={index} />
               ),
            },
            {
               id: 'selection',
               minWidth: 65,
               width: 80,
               maxWidth: 80,
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
         initialState: {
            pageIndex: 0,
            hiddenColumns: ['id'],
            selectedRowIds: selectGroups(data, original.postingSchedules),
         },
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
