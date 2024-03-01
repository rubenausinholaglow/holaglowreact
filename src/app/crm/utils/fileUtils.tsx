export const allowedExtensionsImage: string[] = [
  'jpeg',
  'jpg',
  'png',
  'gif',
  'bmp',
  'webp',
];

export const allowedExtensionsVideos: string[] = [
  'mp4',
  'mkv',
  'avi',
  '3gp',
  'webm',
];

export const getFileType = (fileType: string) => {
  return fileType.split('/')[0];
};

export const getFileExtensionByName = (fileName: string) => {
  const splitFileName = fileName.split('.');
  const fileExtension = splitFileName[splitFileName.length - 1].toLowerCase();
  return fileExtension;
};

export const isAllowedExtensionImage = (fileName: string) => {
  if (allowedExtensionsImage.includes(getFileExtensionByName(fileName))) {
    return true;
  }
  return false;
};

export const isAllowedExtensionVideo = (fileName: string) => {
  if (allowedExtensionsVideos.includes(getFileExtensionByName(fileName))) {
    return true;
  }
  return false;
};

export const validateFileSize = (fileSize: number) => {
  const maxSize: number = 16 * 1024 * 1024;
  if (fileSize > maxSize) {
    return false;
  }
  return true;
};
