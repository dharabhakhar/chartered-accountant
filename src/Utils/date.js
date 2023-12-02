export const formatTime = (inputTime, includeSeconds = true) => {
  try {
    const dateObj = new Date(inputTime);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    const meridian = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    const formattedHours = String(hours % 12 || 12).padStart(2, '0');

    const formattedTime = `${day}-${month}-${year} ${formattedHours}:${minutes}${includeSeconds ? ':' + seconds : ''} ${meridian}`;

    return formattedTime; // Output format: "15-07-2023 07:26:45 AM"

  } catch (err) {
    console.log("formate time function date.js file", err)
  }

};

export const getFormattedDate = (inputDate, withSlash = false) => {
  const dateObject = new Date(inputDate);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

export const getTimeIn12HourFormat = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;

  const formattedTime = `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${amPm}`;
  return formattedTime;
}

export const getFormattedDate_2 = (inputDate) => {
  let months = ["jan", "feb", "march", "april", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"]
  const dateObject = new Date(inputDate);
  const year = dateObject.getFullYear();
  const month = months[dateObject.getMonth()];
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${day} ${month}, ${year}`;
};

export const isValidTime = (timeString) => {
  const timeRegex = /^(?:(?:[01]\d|2[0-3]):[0-5]\d|(?:0?[1-9]|1[0-2]):[0-5]\d\s(?:AM|PM))$/i;
  return timeRegex.test(timeString);
};

export const isValidDate = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject instanceof Date;
};

export const createDateWithTimeString = (timeOrTimestamp) => {
  const timestamp = Date.parse(timeOrTimestamp);

  if (!isNaN(timestamp)) {
    // If it's a valid timestamp, create a Date object from the timestamp
    return new Date(timestamp);
  } else {
    // If it's a time string, follow the previous approach
    const [time, amPm] = timeOrTimestamp.split(' ');
    const [hour, minute] = time.split(':');
    const parsedHour = parseInt(hour, 10);
    const parsedMinute = parseInt(minute, 10);
    let adjustedHour = parsedHour;

    if (amPm && amPm.toLowerCase() === 'pm' && parsedHour !== 12) {
      adjustedHour += 12;
    } else if (amPm && amPm.toLowerCase() === 'am' && parsedHour === 12) {
      adjustedHour = 0;
    }

    const now = new Date();
    const newDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), adjustedHour, parsedMinute);
    return newDate;
  }
}

export const  getMaxDaysInMonth =(month, year)=> {
  // Define the maximum number of days for each month
  const maxDays = [
    31, // January
    28 + (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 1 : 0), // February (including leap year)
    31, // March
    30, // April
    31, // May
    30, // June
    31, // July
    31, // August
    30, // September
    31, // October
    30, // November
    31  // December
  ];

  // Check if the provided month is within the valid range (1 to 12)
  if (month < 1 || month > 12) {
    return -1; // Invalid month
  }

  // Return the maximum number of days for the given month
  return maxDays[month - 1];
}
export const compareDates = (d1, d2) => {
  // let date1 = new Date(d1).getTime();
  // let date2 = new Date(d2).getTime();

  return d1 === d2;
};
