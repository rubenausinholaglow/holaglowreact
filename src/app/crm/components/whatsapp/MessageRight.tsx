import React from 'react';

export default function MessageRight() {
  return (
    <div className="flex justify-end mb-2 pr-3">
      <div className="rounded py-2 px-3" style={{backgroundColor: "#E2F7CB"}}>
        <p className="text-sm mt-1">Count me in</p>
        <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
      </div>
    </div>
  );
}
