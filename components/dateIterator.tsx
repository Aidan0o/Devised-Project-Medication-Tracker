//will change to fit date structure
export const dateIterator = (startDate, date): number => {
    if (date == startDate) {
        return startDate
    } else {
        date += 1;
        return date;
    }

};