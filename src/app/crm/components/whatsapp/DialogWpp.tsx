import React from 'react';

interface DialogWppProps {
  isOpenDialog: boolean;
  handleDialog: any;
  handleDialogOption: (option: string) => void;
  handleFileChange: (event: any) => void;
}

export default function DialogWpp({
  isOpenDialog,
  handleDialog,
  handleDialogOption,
  handleFileChange,
}: DialogWppProps) {
  const handleCloseDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDialog();
    }
  };

  return (
    isOpenDialog && (
      <div className="absolute z-50 bottom-24" onClick={handleCloseDialog}>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul>
            <li className="mb-4">
              <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              <label htmlFor="fileInput">
                <span>Imagen</span>
              </label>
            </li>
            <li className="mb-4">
              <button
                className="flex items-center space-x-2"
                onClick={() => handleDialogOption('Video')}
                disabled
              >
                <span>Video</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center space-x-2"
                onClick={() => handleDialogOption('Template')}
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
