export const ValidationDate = (data: string): boolean => {
  const formatoDataRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (formatoDataRegex.test(data)) {
    return true;
  } else {
    return false;
  }
};
