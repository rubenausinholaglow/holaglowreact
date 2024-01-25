'use client';

import React, { useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Pagination from './Pagination';

interface DataTableProps {
  data: any[];
  columns: { label: string; key: string }[];
  itemsPerPageOptions?: number[];
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  itemsPerPageOptions = [5, 10, 15, 20, 25, 50],
}) => {
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState([...data]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    setCurrentPage(page);
  };

  const handleSort = (columnKey: string) => {
    const order =
      sortColumn === columnKey && sortOrder === 'asc' ? 'desc' : 'asc';

    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
      const valueA = a[columnKey];
      const valueB = b[columnKey];

      if (order === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueB > valueA ? 1 : valueB < valueA ? -1 : 0;
      }
    });
    setSortColumn(columnKey);
    setSortedData(sortedData);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div>
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
                placeholder="filtro"
                className="mt-2 p-1 text-sm bg-blue-gray-100 rounded-lg border border-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DataTable;
