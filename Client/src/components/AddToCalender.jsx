import React from 'react';
import { CalendarPlus } from 'lucide-react';

const formatGoogleCalendarDate = (date) => {
  return date.toISOString().replace(/-|:|\\.\\d{3}/g, '');
};

const parseDurationToMs = (duration) => {
  let durationInMs = 3600000; 

  if (typeof duration === 'number') {
    
    durationInMs = duration * 1000; 
  
  } else if (typeof duration === 'string') {
    
    const parts = duration.match(/(\d+)h\s*(\d+)m/);
    if (parts) {
      
      const hours = parseInt(parts[1], 10) || 0;
      const minutes = parseInt(parts[2], 10) || 0;
      durationInMs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    } else if (!isNaN(Number(duration))) {
      
      durationInMs = Number(duration) * 1000;
    }
  }

  return durationInMs === 0 ? 3600000 : durationInMs; 
};

const AddToCalender = ({
  title,
  eventType,
  eventDateTime,
  eventDuration,
  description,
}) => {
  
  const handleAddToCalendar = () => {
    
    let startTimeString = eventDateTime;
    
    
    
    if (startTimeString && !startTimeString.endsWith('Z')) {
      startTimeString += 'Z';
    }
    

    const startDate = new Date(startTimeString);

    
    if (isNaN(startDate.getTime())) {
      
      
      alert("Error: Could not parse this event's date.");
      return; 
    }

    
    const durationInMs = parseDurationToMs(eventDuration); 
    const endDate = new Date(startDate.getTime() + durationInMs);

    
    const formattedStartDate = formatGoogleCalendarDate(startDate);
    const formattedEndDate = formatGoogleCalendarDate(endDate);

    
    const eventDescription = `
      Event Type: ${eventType}
      ---
      ${description || 'Please Check CampusSphere for more details!'}
    `;
    
    
    const googleCalendarUrl = `https:
      title
    )}&dates=${formattedStartDate}/${formattedEndDate}&details=${encodeURIComponent(
      eventDescription
    )}`;

    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <button
      onClick={handleAddToCalendar}
      className="p-2 rounded-full transition text-gray-600 hover:text-green-600"
      title="Add to Google Calendar"
    >
      <CalendarPlus size={20} />
    </button>
  );
};

export default AddToCalender;