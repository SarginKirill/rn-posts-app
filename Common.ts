export const BASE_URL =
  'https://my-json-server.typicode.com/SarginKirill/db-api';

export const inputTextValidate = (value: string) => {
  return !value.split('').length ? true : false;
};
