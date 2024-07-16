const addTrailingSlash = (path: string) => {
  return path.endsWith('/') ? path : `${path}/`;
};

export default addTrailingSlash;
