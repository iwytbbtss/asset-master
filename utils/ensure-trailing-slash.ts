const ensureTrailingSlash = (path?: string) => {
  if (!path) {
    return '/';
  }
  return path.endsWith('/') ? path : `${path}/`;
};

export default ensureTrailingSlash;
