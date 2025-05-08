
export const capitalizeFirstLetter = (str: string) => {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export const parseNumber = (value: string): number => {
  return parseFloat(value.replace(",", ".")) || 0;
}