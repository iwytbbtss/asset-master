const removeTrailingSlash = (path?: string) => {
  if (!path) {
    return '';
  }
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

export default removeTrailingSlash;
