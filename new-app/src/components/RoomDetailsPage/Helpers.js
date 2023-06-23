import moment from "moment";
// import React from "react";
export function checkOverlapBtwnTwoDateRanges(date1Start, date1End, date2Start, date2End) {
    // This function receives two ranges of dates, checks if either range is within the other.
    return (date2Start.getTime() <= date1Start.getTime() && date1Start.getTime() <= date2End.getTime()) ||
      (date2Start.getTime() <= date1End.getTime() && date1End.getTime() <= date2End.getTime()) ||
      (date1Start.getTime() <= date2Start.getTime() && date2Start.getTime() <= date1Start.getTime()) ||
      (date1Start.getTime() <= date2End.getTime() && date2End.getTime() <= date1End.getTime());
  }

 export const getRangeOfDates = (startDate, endDate) => {
    // Arguments: startDate, endDate.
    // Returns: A list of dates in the range.
    const dates = [];
    const currentDate = moment(startDate);
    const lastDate = moment(endDate);

    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate));
      currentDate.add(1, 'day');
    }

    return dates;
  };