import React from 'react';

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
      <div className="overflow-x-auto">
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
                      <span className={`inline-flex items-center rounded-md bg-${statusTypeSwitch(row[column.key]).color}-50 px-2 py-1 text-xs font-medium text-${statusTypeSwitch(row[column.key]).color}-600 ring-1 ring-inset ring-${statusTypeSwitch(row[column.key]).color}-500/10`}>
                        {statusTypeSwitch(row[column.key]).text}
                      </span>
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
