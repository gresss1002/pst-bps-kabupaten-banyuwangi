function formatDate(obj) {
    const { year, month, day } = obj;

    // Format day and month to be two digits
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return `${formattedDay}-${formattedMonth}-${year}`;
}

export default formatDate;