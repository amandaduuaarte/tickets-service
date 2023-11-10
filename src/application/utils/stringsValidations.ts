export const ValidationFormatDate = (data: string): boolean => {
  const formatoDataRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (formatoDataRegex.test(data)) {
    return true;
  } else {
    return false;
  }
};

export const IsValidDate = (data: string): boolean => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return dateRegex.test(data);
};
