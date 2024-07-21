const getFileExtension = (filename: string) => {
  return filename.split('.').pop()?.toLowerCase();
};

export default getFileExtension;
