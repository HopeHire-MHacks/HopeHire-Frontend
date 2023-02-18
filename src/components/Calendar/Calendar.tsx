import React, { Dispatch, SetStateAction } from 'react';

import { v4 as uuid } from 'uuid';
import DayHeaderContent from '@components/Calendar/DayHeaderContent';
import SlotLabelContent from '@/components/Calendar/SlotLabelContent';
import { useRecoilState } from 'recoil';
import { modalAtom, ModalType } from '@/utils/atoms/modal';
import { getEventData } from '@/utils/miscellaneous';

import moment from 'moment-timezone';
import FullCalendar, { Duration, EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

export interface EventData {
  id: string;
  title: string;
  start: Date;
  end: Date;
  duration?: Duration;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  editable: boolean;
}

const templateEvent = {
  id: uuid(),
  title: 'Available',
  start: new Date(),
  end: new Date(),
  editable: true,
  backgroundColor: '#818CF8',
  borderColor: '#818CF8',
};

interface CalendarProps {
  availabilities: EventData[];
  setAvailabilities: Dispatch<SetStateAction<EventData[]>>;
}

const Calendar = ({ availabilities, setAvailabilities }: CalendarProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setModalState] = useRecoilState(modalAtom);

  const handleDateClick = (e: DateClickArg) => {
    const startTime = moment(e.dateStr).toDate();
    const endTime = moment(e.dateStr).add(30, 'm').toDate();
    const newEvent = { ...templateEvent, id: uuid(), start: startTime, end: endTime };
    setAvailabilities(prev => [...prev, newEvent]);
  };

  const handleEventClick = (e: EventClickArg) => {
    const deleteEvent = () => {
      setAvailabilities(prev => prev.filter(event => event.id !== e.event.id));
    };

    setModalState({
      isShown: true,
      type: ModalType.ERROR,
      message: 'Are you sure you want to delete this availability?',
      title: 'Delete Availability',
      onPrimaryBtnClick: () => deleteEvent(),
    });
  };

  const onSaveEvent = (data: EventData) => {
    setAvailabilities(prev => {
      const index = prev.findIndex(event => event.id === data.id);
      const oldEvent = prev[index];
      const newAvailabilities = [...prev];
      newAvailabilities[index] = { ...oldEvent, ...data };
      return newAvailabilities;
    });
  };

  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
      headerToolbar={{
        start: '',
        center: '',
        end: '',
      }}
      dayHeaderContent={obj => <DayHeaderContent obj={obj} />}
      slotLabelContent={obj => <SlotLabelContent obj={obj} />}
      allDaySlot={false}
      nowIndicator={false}
      slotMinTime='07:00:00'
      slotMaxTime='20:00:00'
      slotDuration='00:30:00'
      expandRows={true}
      slotLabelInterval={{ hours: 1 }}
      editable={true}
      eventOverlap={false}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      eventResize={e => onSaveEvent(getEventData(e))}
      eventDrop={e => onSaveEvent(getEventData(e))}
      height='730px'
      events={availabilities}
    />
  );
};

export default Calendar;
