'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { getStatusClassName, getStatusText } from '@utils/utils';
import { PageInfo } from 'app/GraphQL/PageInfo';
import { isValidDate } from 'app/GraphQL/utils/utilsMapping';
import { SvgSpinner } from 'app/icons/Icons';
import dayjs from 'dayjs';
import debouce from 'lodash.debounce';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Pagination from './Pagination';

interface DataTableProps {
  data: any[];
  columns: { label: string; key: string; format: string }[];
  showActionsColumn: boolean;
  executeQuery: (
    nextPage: boolean,
    stringFilter?: string,
    numberPerPage?: number,
    sortedBy?: string
  ) => void;
  pageInfo: PageInfo;
  totalCount: number;
  entity: string;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  showActionsColumn = true,
  executeQuery,
  pageInfo,
  totalCount,
  entity,
}: DataTableProps) => {
  const itemsPerPageOptions = [5, 10, 15, 20, 25, 50];
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
  const [filteredData, setFilteredData] = useState<any[]>([...data]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState<string>('');

  totalCount = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    setIsLoading(true);
    if (page > currentPage) {
      handleNextPage();
    } else handlePreviousPage();

    setCurrentPage(page);
  };

  const handleNextPage = async () => {
    setIsLoading(true);
    executeQuery(true, filterText);
  };

  const handlePreviousPage = async () => {
    setIsLoading(true);
    executeQuery(false, filterText);
  };

  const handleOnFilterChange = async (e: any) => {
    setIsLoading(true);
    setFilterText(e.target.value);
    setCurrentPage(1);
    executeQuery(true, e.target.value);
  };

  const handleSortChange = async (sortedBy: string) => {
    if (sortedBy == '') return;
    setIsLoading(true);
    executeQuery(true, '', itemsPerPage, sortedBy);
  };

  const handleSort = (columnKey: string) => {
    const order =
      sortColumn === columnKey && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortColumn(columnKey);
    setSortOrder(order);

    const sortText = columnKey + ' : ' + order;
    handleSortChange(sortText);
  };

  const handleItemsPerPageChange = (value: number) => {
    setIsLoading(true);
    executeQuery(true, '', value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setFilteredData(data);
    setIsLoading(false);
  }, [data]);

  const getNestedFieldValue = (rowData: any, key: string) => {
    const keys = key.split('.');
    let value = rowData;
    for (const k of keys) {
      if (Array.isArray(value)) {
        value = value[0];
      }
      if (value && Object.prototype.hasOwnProperty.call(value, k)) {
        value = value[k];
      } else {
        return '';
      }
    }
    return value;
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleOnFilterChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  if (filteredData)
    return (
      <>
        <div className="h-full w-full">
          <div className="gap-4 mt-4 ml-2 w-full">
            <div className="flex gap-4 mt-4 ml-2 w-full justify-between">
              <div className="flex items-center">
                <select
                  value={itemsPerPage}
                  onChange={e =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                  className="mt-2 p-1 text-sm bg-blue-gray-100 rounded-lg border border-gray-500"
                >
                  {itemsPerPageOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <p className="ml-2">registros por página</p>
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Filtrar"
                  className="mt-2 p-1 text-sm bg-blue-gray-100 rounded-lg border border-gray-500"
                  onChange={debouncedResults}
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <SvgSpinner className="w-full justify-center" />
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {columns.map(
                    column =>
                      column.key.toLocaleUpperCase() !== 'ID' && (
                        <th
                          key={column.key}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
                        >
                          <div
                            className="flex"
                            onClick={() => handleSort(column.key)}
                          >
                            <label
                              color="blue-gray"
                              className="font-normal leading-none opacity-70"
                            >
                              {column.label}
                            </label>
                            {sortColumn === column.key && (
                              <span className="ml-2">
                                {sortOrder === 'ASC' ? '↑' : '↓'}
                              </span>
                            )}
                          </div>
                        </th>
                      )
                  )}
                  {showActionsColumn && <th className="p-4">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {filteredData
                  .slice(0, itemsPerPage)
                  .map((rowData, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? '' : 'bg-gray-100'}
                    >
                      {columns
                        .filter(
                          column => column.key.toLocaleUpperCase() !== 'ID'
                        )
                        .map(column => {
                          const value = getNestedFieldValue(
                            rowData,
                            column.key
                          );
                          let className = 'font-normal';

                          const formatColumn =
                            column.format.toLocaleUpperCase();

                          if (column.key === 'status') {
                            className = getStatusClassName(value, entity);
                          } else if (formatColumn === 'DATE') {
                            className += '';
                          }

                          const formattedValue =
                            column.key === 'status'
                              ? getStatusText(value, entity)
                              : formatColumn === 'DATE' && !isValidDate(value)
                              ? ''
                              : dayjs(value).isValid()
                              ? dayjs(value).format('DD-MM-YYYY HH:mm:ss')
                              : value;

                          return (
                            <td key={column.key} className="p-4">
                              <label color="blue-gray" className={className}>
                                {formattedValue}
                              </label>
                            </td>
                          );
                        })}
                      {showActionsColumn && (
                        <td className="p-4">
                          <Link href={`${pathName}/${rowData[columns[0].key]}`}>
                            <p className="font-medium text-blue-gray">Editar</p>
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalCount}
            onPageChange={handlePageChange}
            hasNextPage={pageInfo.hasNextPage}
          />
        </div>
      </>
    );
  else return <>No results</>;
};

export default DataTable;
