type objType = { [key: string]: string | number | boolean };

export const serialize = (obj: objType): string => {
  const str: Array<string> = [];
  const objKeys = Object.keys(obj);
  objKeys
    .filter((o) => obj[o])
    .forEach((key) => {
      str.push(`${key}=${encodeURIComponent(obj[key])}`);
    });
  return "?" + str.join("&");
};
