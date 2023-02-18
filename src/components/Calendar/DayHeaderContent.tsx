import React from 'react';
import moment from 'moment';
import { DayHeaderContentArg } from '@fullcalendar/react';

type Props = {
  obj: DayHeaderContentArg;
};

const DayHeaderContent = ({ obj }: Props) => {
  const { date } = obj;
  const dateString = date.toString();
  const day = moment(dateString).format('ddd').toUpperCase();
  return <div className='flex flex-col'>{day}</div>;
};

export default DayHeaderContent;
