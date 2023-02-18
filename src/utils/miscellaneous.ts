import { EventData } from '@components/Calendar';
import { EventResizeDoneArg } from '@fullcalendar/interaction';
import { EventDropArg } from '@fullcalendar/react';
import { b64toBlob } from './blob';

import moment from 'moment';
export function getLocalStorageValue(key: string): string | null {
  const res = localStorage.getItem(key);
  return res ? JSON.parse(res) : null;
}

export function setLocalStorageValue(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalStorageValue(key: string) {
  localStorage.removeItem(key);
}

export const getEventData = (e: EventDropArg | EventResizeDoneArg): EventData => {
  return {
    id: e.event.id,
    title: e.event.title,
    start: moment(e.event.start).toDate(),
    end: moment(e.event.end).toDate(),
    editable: e.event.startEditable,
  };
};

export const convertToBlob = (base64String: string): Blob | null => {
  // Split the base64 string in data and contentType
  const block = base64String.split(';');
  // Get the content type of the image
  const contentType = block[0].split(':')[1]; // In this case "image/gif"
  // get the real base64 content of the file
  const realData = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

  // Convert it to a blob to upload
  const blob = b64toBlob(realData, contentType);
  return blob;
};
