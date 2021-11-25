// @ts-nocheck
import { useEffect, useMemo } from 'react'
import tw, { styled } from 'twin.macro'
import {
   useFlexLayout,
   useGlobalFilter,
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
import GlobalFilter from './GlobalFilter'
import ButtonsCell from './ButtonsCell'

interface ITable<T> {
   data: T[]
   columns: object[]
   onDelete: (id: number) => void
   userInfo: number
}

const PostTable = ({ data, columns, onDelete, userInfo }: ITable) => {
   const tableData = useMemo(() => [...data], [data])

   const tableHooks = hooks => {
      hooks.visibleColumns.push(columns => {
         return [
            {
               width: 10,
               id: 'index',
               Header: '',
               //eslint-disable-next-line
               Cell: ({ row: { index } }) => (
                  <span tw="text-gray-400">{index + 1}</span>
               ),
            },
            ...columns,
            {
               width: 150,
               id: 'edit',
               //eslint-disable-next-line
               Cell: ({ row: { values } }) => (
                  <ButtonsCell
                     values={values}
                     onDelete={onDelete}
                     isCanStart={values.postStatus !== 'OnPublications'}
                  />
               ),
            },
         ]
      })
   }

   const tableInstance = useTable(
      {
         columns,
         data: tableData,
         initialState: { pageIndex: 0, hiddenColumns: ['postId'] },
      },
      tableHooks,
      useGlobalFilter,
      useSortBy,
      useFlexLayout,
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
      state: { pageIndex, pageSize, selectedRowIds, globalFilter },
      setGlobalFilter,
   } = tableInstance

   useEffect(() => {
      setPageSize(5)
   }, [setPageSize])

   const isOdd = (i: number) => i % 2 !== 0

   return (
      <>
         <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
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

export default PostTable
