import dayjs, { Dayjs } from 'dayjs';

/**
 * @param stringDate ''
 * @param format 'YYYY-MM-DD'
 * @returns Output: string eg: 2022-10-17 00:00:00 GMT
 */
export const convertDate = (
  stringDate: Dayjs | Date | string,
  format?: string,
) => {
  let date;
  if (format) {
    date = dayjs(stringDate).format(format);
  } else {
    date = dayjs(stringDate);
  }
  return date.toString();
};
