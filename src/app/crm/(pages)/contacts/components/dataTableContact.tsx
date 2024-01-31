import React from 'react';

interface DataTableContactProps {
  columns: any[];
  rows: any[];
}

function DataTableContact({ columns, rows }: DataTableContactProps) {
  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="table min-w-full border shadow">
          <thead>
            <tr>
              {columns.map(column => (
                <th className="border p-2" key={column.key}>
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {columns.map(column => (
                  <td className="border p-2" key={column.key}>
                    {row[column.key]}
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
