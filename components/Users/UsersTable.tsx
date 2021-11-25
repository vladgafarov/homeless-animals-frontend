// @ts-nocheck
import { useEffect, useMemo } from 'react'
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
   FaTrash,
} from 'react-icons/fa'
import { TableButton } from '../styles/Buttons'
import Tooltip from '../utils/Tooltip'
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
   onDelete: (id: number) => void
   columns: object[]
}

const UsersTable = ({ data, onDelete, columns }: ITable) => {
   const tableData = useMemo(() => [...data], [data])

   const tableHooks = hooks => {
      hooks.visibleColumns.push(columns => {
         return [
            {
               width: 25,
               id: 'index',
               Header: '',
               //eslint-disable-next-line
               Cell: ({ row: { index } }) => (
                  <span tw="text-gray-400">{index + 1}</span>
               ),
            },
            ...columns,
            {
               width: 70,
               id: 'edit',
               //eslint-disable-next-line
               Cell: ({ row: { values } }) => (
                  <Tooltip content="Удалить" delay="200" interactive={false}>
                     <TableButton onClick={() => onDelete(values.id)}>
                        <FaTrash />
                     </TableButton>
                  </Tooltip>
               ),
            },
         ]
      })
   }

   const tableInstance = useTable(
      {
         columns: columns,
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
                              index={i}
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
                              <TableData
                                 {...cell.getCellProps()}
                                 key={i}
                                 index={i}
                              >
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

export default UsersTable
