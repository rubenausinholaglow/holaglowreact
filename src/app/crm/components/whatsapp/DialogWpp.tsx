import React from 'react';

interface DialogWppProps {
  isOpenDialog: boolean;
  handleDialog: any;
  handleSelect: (option: string) => void;
}

export default function DialogWpp({
  isOpenDialog,
  handleDialog,
  handleSelect,
}: DialogWppProps) {
  const handleCloseDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDialog();
    }
  };

  return (
    isOpenDialog && (
      <div
        className="absolute z-50 bottom-24"
        onClick={handleCloseDialog}
      >
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul>
            <li className="mb-4">
              <button
                className="flex items-center space-x-2"
                onClick={() => handleSelect('Imagen')}
                disabled
              >
                <span>Imagen</span>
              </button>
            </li>
            <li className="mb-4">
              <button
                className="flex items-center space-x-2"
                onClick={() => handleSelect('Video')}
                disabled
              >
                <span>Video</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center space-x-2"
                onClick={() => handleSelect('Template')}
              >
                <span>Template</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  );
}
