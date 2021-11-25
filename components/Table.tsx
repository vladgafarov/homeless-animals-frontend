// @ts-nocheck
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import tw, { styled } from 'twin.macro'
import { usePagination, useRowSelect, useSortBy, useTable } from 'react-table'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import {
   FaAngleDoubleLeft,
   FaAngleDoubleRight,
   FaAngleLeft,
   FaAngleRight,
   FaTrash,
} from 'react-icons/fa'
import { RedButton } from './styles/Buttons'

const TableWrapper = styled.div`
   ${tw`overflow-x-auto`}
`

const TableStyles = styled.table`
   ${tw`
      text-base
      text-gray-900
      w-full
      mt-12
      rounded
   `}
   min-width: 768px;
`

const TableHead = tw.thead`
   py-2
   border-b-2
   border-blue-300
   font-pb
   bg-blue-100
   text-left
`

const TableRow = tw.tr`
   transition
   pl-3
   hover:(bg-blue-100)
`

const TableHeader = styled.th`
   ${tw`py-2 px-3`}
   &:last-of-type {
      text-align: right;
   }
   ${(props: { index: number }) =>
      props.index === 0 ? tw`border-r-2 border-blue-300` : ''}
`

const TableBody = tw.tbody`
`

const TableData = styled.td`
   ${tw`py-5 px-3
   min-w-max
   // whitespace-nowrap
   `}
   ${(props: { index: number }) =>
      props.index === 0 ? tw`border-r-2 border-blue-300` : ''}
`

const Pagination = styled.div`
   ${tw`flex items-center justify-center space-x-3 mt-4`}

   button {
      ${tw`
         bg-blue-500 text-white
         rounded
         p-1.5
         text-xl
      `}
      &:disabled {
         ${tw`bg-blue-300`}
      }
   }
`

interface ITable<T> {
   data: T[]
   onDelete?: (id: number) => void
   columns?: object[]
   deleteButton?: boolean
   selectButton?: boolean
}

const Table = ({ data, columns }: ITable) => {
   const tableData = useMemo(() => [...data], [data])

   const tableHooks = hooks => {
      hooks.visibleColumns.push(columns => {
         return [
            {
               id: 'index',
               //eslint-disable-next-line
               Cell: ({ row: { index } }) => (
                  <span tw="text-center pl-0.5 text-gray-400">{index + 1}</span>
               ),
            },
            ...columns,
            {
               id: 'edit',
               // Header: 'Действия',
               //eslint-disable-next-line
               Cell: ({ row: { values } }) => (
                  <div tw="text-right pr-3">
                     <RedButton tw="border-2 border-blue-300 bg-white text-blue-300 hover:(bg-blue-300 text-white)">
                        <FaTrash />
                     </RedButton>
                  </div>
               ),
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

   const isOdd = (i: number) => i % 2 !== 0

   return (
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
                  Страница{' '}
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
      </TableWrapper>
   )
}

export default Table
