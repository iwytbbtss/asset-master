const removePrefix = (prefix: string, value: string) => {
  const regex = new RegExp(prefix, 'g');
  return value.replace(regex, '');
};

export default removePrefix;
