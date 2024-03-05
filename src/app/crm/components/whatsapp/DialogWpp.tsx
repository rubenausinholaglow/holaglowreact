import React from 'react';

interface DialogWppProps {
  isOpenDialog: boolean;
  handleDialog: any;
  handleDialogOption: (option: string) => void;
  handleFileChange: (event: any) => void;
  refInputFile: React.MutableRefObject<HTMLInputElement | null>;
}

export default function DialogWpp({
  isOpenDialog,
  handleDialog,
  handleDialogOption,
  handleFileChange,
  refInputFile,
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
                id="fileImageInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={refInputFile}
                accept="image/png, image/gif, image/jpeg, image/jpg"
              />
              <label htmlFor="fileImageInput">
                <span className="cursor-pointer">Imagen</span>
              </label>
            </li>
            <li className="mb-4">
              <input
                id="fileVideoInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={refInputFile}
                accept="video/*"
              />
              <label htmlFor="fileVideoInput">
                <span className="cursor-pointer">Video</span>
              </label>
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
