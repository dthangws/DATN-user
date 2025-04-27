export const handleConvertObjectToArray = (object: unknown) => {
  const arr = Object.entries(object || {});
  return arr?.map((item) => {
    return {
      key: item[0],
      value: item[1],
    };
  });
};

export const handleGetFile = (path: string) => {
  if (!path) return undefined;

  return `${process.env.REACT_APP_SEVER_URL}/${path}`;
};
