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
    setSortColumn(columnKey);
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

    setCurrentPage(1);
    setSortedData(sortedData);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <Card className="h-full w-full">
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

      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 cursor-pointer"
              >
                <div className="flex" onClick={() => handleSort(column.key)}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {column.label}
                  </Typography>
                  {sortColumn === column.key && (
                    <span className="ml-2">
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((rowData, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? '' : 'bg-gray-100'}
            >
              {columns.map(column => (
                <td key={column.key} className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {rowData[column.key]}
                  </Typography>
                </td>
              ))}

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
      />
    </Card>
  );
};

export default DataTable;
