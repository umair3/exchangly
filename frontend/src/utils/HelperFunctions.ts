export function getIndexOfEnum<
  Type extends object,
  keyObject extends keyof Type
>(valuesEnum: Type, key: keyObject) {
  return Object.keys(valuesEnum).indexOf(key as string);
}

export function changeStatusToReadableString(value: string): string {
  const readableString = value.split("_").join(" ").toLowerCase();
  return readableString[0].toUpperCase() + readableString.substring(1);
}

export function checkActiveDate(expiryDate: string) {
  const expiry = new Date(expiryDate).getTime();
  const current = new Date().getTime();
  return expiry > current;
}

export function debounce(callback: Function, wait: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function extractDecimalPointsFromString(input: string) {
  const value = parseFloat(input).toString().split(".")[1];

  return value
    ? `.${parseFloat(input).toFixed(2).toString().split(".")[1]}`
    : "";
}
