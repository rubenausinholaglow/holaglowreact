import React from 'react';

interface MessageLeftProps {
  clientName: string;
  clientMessage: string;
  clientHourMessage: string;
}

export default function MessageLeft({
  clientName,
  clientMessage,
  clientHourMessage,
}: MessageLeftProps) {
  return (
    <div className="flex mb-2 pl-3 pt-3">
      <div className="rounded py-2 px-3" style={{ backgroundColor: '#F2F2F2' }}>
        <p className="text-sm text-teal">{clientName}</p>
        <p className="text-sm mt-1">{clientMessage}</p>
        <p className="text-right text-xs text-grey-dark mt-1">
          {clientHourMessage}
        </p>
      </div>
    </div>
  );
}
