// Improved formatDate function to output DD-MM-YYYY format
function formatDate(date) {
    if (!date) return '';

    let year, month, day;

    // Check if date is an object with year, month, day properties
    if (typeof date === 'object' && date.year && date.month && date.day) {
        ({ year, month, day } = date);
    } else if (typeof date === 'string') {
        // Assume the date is in ISO format or another common string format
        const parsedDate = new Date(date);
        year = parsedDate.getFullYear();
        month = parsedDate.getMonth() + 1; // getMonth is zero-based
        day = parsedDate.getDate();
    } else if (date instanceof Date) {
        // If the input is a Date object
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
    } else {
        // Handle other formats or return empty string
        return '';
    }

    // Format month and day to be two digits
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    // Return DD-MM-YYYY format
    return `${formattedDay}-${formattedMonth}-${year}`;
}

export default formatDate;
