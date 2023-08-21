export const BASE_URL =
  'https://my-json-server.typicode.com/SarginKirill/db-api';

export const inputTextValidate = (value: string) => {
  return !value.trim().split('').length ? true : false;
};
