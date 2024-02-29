import React from 'react';

interface MessageRightProps {
  clientMessage: string;
  clientHourMessage: string;
  urlFile?: string;
}

export default function MessageRight({
  clientMessage,
  clientHourMessage,
  urlFile = '',
}: MessageRightProps) {
  return (
    <div className="flex justify-end mb-2 pr-3">
      <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
        {urlFile?.length > 0 && <img src={urlFile} width={100} height={100} />}
        <p className="text-sm mt-1">{clientMessage}</p>
        <p className="text-right text-xs text-grey-dark mt-1">
          {clientHourMessage}
        </p>
      </div>
    </div>
  );
}
