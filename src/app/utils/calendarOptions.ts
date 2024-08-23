import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const today = new Date().toISOString().slice(0, 10);

export const CalendarDefaultOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    weekends: false,
    selectable: false,
    displayEventTime: true,
    locale: 'es',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today,dayGridMonth',
    },
  };