'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Pagination from './Pagination';

interface DataTableProps {
  data: any[];
  columns: { label: string; key: string }[];
  itemsPerPageOptions?: number[];
  hasNextPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onItemsPerPageChange: (value: number) => void;
  onFilterChange: (filter: string) => void;
  onSortedChange: (sortedText: string) => void;
  totalPages: number;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  itemsPerPageOptions = [5, 10, 15, 20, 25, 50],
  hasNextPage,
  onNextPage,
  onPreviousPage,
  onItemsPerPageChange,
  onFilterChange,
  onSortedChange,
  totalPages = 1,
}) => {
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [filters, setFilters] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);
  const [filteredData, setFilteredData] = useState<any[]>([...data]);

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    setCurrentPage(page);
  };

  const handleSort = (columnKey: string) => {
    const order =
      sortColumn === columnKey && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortColumn(columnKey);
    setSortOrder(order);

    const sortText = columnKey + ' : ' + order;
    onSortedChange(sortText);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleItemsPerPageChange = (value: number) => {
    onItemsPerPageChange(value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };
  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);
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
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(0, itemsPerPage).map((rowData, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? '' : 'bg-gray-100'}
              >
                {columns.map(
                  column =>
                    column.key.toLocaleUpperCase() !== 'ID' && (
                      <td key={column.key} className="p-4">
                        <label color="blue-gray" className="font-normal">
                          {rowData[column.key]}
                        </label>
                      </td>
                    )
                )}

                <td className="p-4">
                  <Link href={`${pathName}/${rowData[columns[0].key]}`}>
                    <p className="font-medium text-blue-gray">Editar</p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasNextPage={hasNextPage}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    );
  else return <>No results</>;
};

export default DataTable;
