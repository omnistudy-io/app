export default function upcoming(
  dateStr1: string,
  dateStr2: string,
  days: number
) {
  // Create Date objects from the input strings
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  // Convert both dates to time in milliseconds
  const time1 = date1.getTime();
  const time2 = date2.getTime();

  // Ensure date1 is in the future compared to date2 and within the next days
  const differenceInTime = time1 - time2;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays > 0 && differenceInDays <= days;
}
