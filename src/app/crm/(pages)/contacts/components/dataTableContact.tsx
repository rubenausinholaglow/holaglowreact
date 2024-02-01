import React from 'react';

import Badge from './badge';

interface DataTableContactProps {
  columns: any[];
  rows: any[];
  statusTypeSwitch?: (status: number) => any;
}

function DataTableContact({
  columns,
  rows,
  statusTypeSwitch,
}: DataTableContactProps) {
  return (
    <div className="container mx-auto">
      <div className="overflow-y-auto max-h-80 overflow-x-auto">
        <table className="table min-w-full border shadow">
          <thead>
            <tr>
              {columns.map(column => (
                <th className="border-b p-2 text-left" key={column.key}>
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {columns.map(column => (
                  <td
                    className={`border-b p-2 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                    }`}
                    key={column.key}
                  >
                    {column.key === 'status' && statusTypeSwitch ? (
                      <Badge
                        text={statusTypeSwitch(row[column.key]).text}
                        color={statusTypeSwitch(row[column.key]).color}
                      />
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTableContact;
