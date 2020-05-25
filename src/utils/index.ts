export const parseArrayAsString = (arrayAsString: string): string[] => {
  return arrayAsString.split(",").map((item: string) => item.trim());
};
