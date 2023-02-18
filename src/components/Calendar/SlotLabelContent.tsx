import React from 'react';
import moment from 'moment-timezone';

import { SlotLabelContentArg } from '@fullcalendar/react';

type Props = {
  obj: SlotLabelContentArg;
};

const SlotLabelContent = ({ obj }: Props) => {
  const { date } = obj;
  const dateString = date.toString();
  const time = moment(dateString).format('HH:mm').toUpperCase();

  return <h1>{time}</h1>;
};

export default SlotLabelContent;
