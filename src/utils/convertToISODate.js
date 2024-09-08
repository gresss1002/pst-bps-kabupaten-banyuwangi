function convertToISODate(dateStr) {

  // Split the date string into day, month, and year
  const [day, month, year] = dateStr.split('-').map(Number);

  // Create a new Date object with the parsed values
  const date = new Date(year, month - 1, day); // month is zero-based

  // Format the Date object to ISO 8601 string
  const isoDateString = date.toISOString().split('T')[0];

  return isoDateString;
}

export default convertToISODate;