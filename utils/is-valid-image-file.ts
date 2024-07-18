const isValidImageFile = (filename: string) => {
  // 이미지 파일 확장자 목록
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];

  // 파일명에서 확장자 추출
  const extension = filename.split('.').pop()?.toLowerCase();

  if (!extension) {
    return false;
  }

  // 확장자가 유효한지 확인
  return validExtensions.includes(extension);
};

export default isValidImageFile;
