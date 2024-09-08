import { parseDateTime } from "@internationalized/date";

const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new parseDateTime( month, day, year);
  };

  export default parseDate;