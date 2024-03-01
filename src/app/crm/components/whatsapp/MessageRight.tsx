import React from 'react';
import {
  isAllowedExtensionImage,
  isAllowedExtensionVideo,
} from 'app/crm/utils/fileUtils';

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
  const validateUrlFile = () => {
    return urlFile?.length > 0;
  };
  const isImage = () => {
    if (validateUrlFile()) return isAllowedExtensionImage(urlFile);
  };
  const isVideo = () => {
    if (validateUrlFile()) return isAllowedExtensionVideo(urlFile);
  };
  return (
    <div className="flex justify-end mb-2 pr-3">
      <div className="rounded py-2 px-3" style={{ backgroundColor: '#E2F7CB' }}>
        {isImage() && <img src={urlFile} width={100} height={100} />}
        {isVideo() && (
          <video width={500} height={600} controls>
            <source src={urlFile} type="video/webm"></source>
          </video>
        )}
        <p className="text-sm mt-1">{clientMessage}</p>
        <p className="text-right text-xs text-grey-dark mt-1">
          {clientHourMessage}
        </p>
      </div>
    </div>
  );
}
