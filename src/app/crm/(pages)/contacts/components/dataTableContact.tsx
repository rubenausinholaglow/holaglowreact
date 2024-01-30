import React from 'react';

interface DataTableContactProps {
  columns: any[];
  rows: any[];
}

function DataTableContact({
  columns,
  rows,
}: DataTableContactProps) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTableContact;
