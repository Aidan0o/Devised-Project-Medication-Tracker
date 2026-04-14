import { format } from 'date-fns';



export const dateTimeBuilder = (date: Date, time: string): Date => {

     const dateString = format(date, 'yyyy-MM-dd')
     return new Date(dateString + 'T' + time);
};