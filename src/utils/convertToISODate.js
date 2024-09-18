// Function to convert DD-MM-YYYY to ISO format YYYY-MM-DD
function convertToISODate(dateStr) {
  if (typeof dateStr !== 'string') {
      throw new Error('dateStr must be a string');
  }

  // Split the date string assuming DD-MM-YYYY format
  const [day, month, year] = dateStr.split('-').map(Number);

  // Check if the split parts are valid numbers
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error('Invalid date format');
  }

  // Create the date object
  const date = new Date(year, month - 1, day +1);

  // Check if the date object is valid
  if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
  }

  // Convert to ISO format (YYYY-MM-DD)
  const isoDateString = date.toISOString().split('T')[0];
  return isoDateString;
}

export default convertToISODate;
