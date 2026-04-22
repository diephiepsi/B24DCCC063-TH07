import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default ({ tasks }: any) => {
  const events = tasks.map((t: any) => ({
    title: `[${t.assignee}] ${t.title}`,
    start: new Date(t.deadline),
    end: new Date(t.deadline),
    allDay: true,
    status: t.status
  }));

  return (
    <div style={{ height: 600, padding: 20, background: '#fff', borderRadius: 15 }}>
      <Calendar
        localizer={localizer}
        events={events}
        eventPropGetter={(ev: any) => ({ style: { backgroundColor: ev.status === 'Done' ? '#52c41a' : '#1890ff', borderRadius: '5px' } })}
        messages={{ next: "Sau", previous: "Trước", today: "Hôm nay", month: "Tháng", week: "Tuần", day: "Ngày" }}
      />
    </div>
  );
};