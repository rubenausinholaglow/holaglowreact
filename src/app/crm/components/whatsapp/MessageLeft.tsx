import React from 'react';
import { getFileExtensionByName, isAllowedExtensionImage, isAllowedExtensionVideo } from 'app/crm/utils/fileUtils';
import Image from "next/image";

interface MessageLeftProps {
  clientName: string;
  clientMessage: string;
  clientHourMessage: string;
  urlFile?: string;
}

export default function MessageLeft({
  clientName,
  clientMessage,
  clientHourMessage,
  urlFile = ""
}: MessageLeftProps) {

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
    <div className="flex mb-2 pl-3 pt-3">
      <div className="rounded py-2 px-3" style={{ backgroundColor: '#F2F2F2' }}>
        <p className="text-sm text-teal">{clientName}</p>
        {isImage() && (
          <Image alt="imageAgent" src={urlFile} width={100} height={100} />
        )}
        {isVideo() && (
          <video width={300} height={300} controls>
            <source src={urlFile} type={`video/${getFileExtensionByName(urlFile)}`}></source>
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
