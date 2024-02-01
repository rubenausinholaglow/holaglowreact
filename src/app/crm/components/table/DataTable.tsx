'use client';

import React, { useEffect, useState } from 'react';
import { getStatus } from '@utils/utils';
import { PageInfo } from 'app/GraphQL/PageInfo';
import dayjs from 'dayjs';
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
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  showActionsColumn = true,
  executeQuery,
  pageInfo,
  totalCount,
}: DataTableProps) => {
  const itemsPerPageOptions = [5, 10, 15, 20, 25, 50];
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [filters, setFilters] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
  const [filteredData, setFilteredData] = useState<any[]>([...data]);

  totalCount = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    if (page > currentPage) {
      handleNextPage();
    } else handlePreviousPage();

    setCurrentPage(page);
  };

  const handleNextPage = async () => {
    executeQuery(true);
  };

  const handlePreviousPage = async () => {
    executeQuery(false);
  };

  const handleOnFilterChange = async (stringFilter: string) => {
    if (stringFilter == '') return;
    executeQuery(true, stringFilter);
  };

  const handleSortChange = async (sortedBy: string) => {
    if (sortedBy == '') return;
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
    executeQuery(true, '', value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  useEffect(() => {
    handleOnFilterChange(filters);
  }, [filters]);

  useEffect(() => {
    setFilteredData(data);
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

  if (filteredData)
    return (
      <div className="h-full w-full">
        <div className="gap-4 mt-4 ml-2 w-full">
          <div className="flex gap-4 mt-4 ml-2 w-full justify-between">
            <div className="flex items-center">
              <select
                value={itemsPerPage}
                onChange={e => handleItemsPerPageChange(Number(e.target.value))}
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
                onChange={e => setFilters(e.target.value)}
              />
            </div>
          </div>
        </div>

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
            {filteredData.slice(0, itemsPerPage).map((rowData, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? '' : 'bg-gray-100'}
              >
                {columns
                  .filter(column => column.key.toLocaleUpperCase() !== 'ID')
                  .map(column => {
                    const value = getNestedFieldValue(rowData, column.key);
                    const formatColumn = column.format.toLocaleUpperCase();

                    const formattedValue =
                      column.key === 'status'
                        ? getStatus(value)
                        : formatColumn === 'DATE'
                        ? dayjs(value).format('DD-MM-YYYY HH:mm:ss')
                        : value;

                    return (
                      <td key={column.key} className="p-4">
                        <label color="blue-gray" className="font-normal">
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalCount}
          onPageChange={handlePageChange}
          hasNextPage={pageInfo.hasNextPage}
        />
      </div>
    );
  else return <>No results</>;
};

export default DataTable;
