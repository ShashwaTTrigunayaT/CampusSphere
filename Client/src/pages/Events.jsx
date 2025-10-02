import React from 'react'
import EventCard from '../components/EventCard'
import { useEffect } from 'react'
import { data } from 'react-router-dom'



const Events = () => {
    const [events, setEvents] = React.useState([]);
    const [type, setType] = React.useState('');
    const [eventsNotification, setEventsNotification] = React.useState('');
    useEffect(() => {
        

        async function fetchEvents() {

            setType(localStorage.getItem("activeTab"));
            const res = await fetch(`http://localhost:5000/event/${localStorage.getItem("activeTab")}`);
            const data = await res.json()
            
            setEvents(data);
            
        }

        fetchEvents();

    }, [type]);

   
    return (
        <div className='flex flex-wrap gap-4 justify-center my-5'>

            {events.map((event) => (
                <EventCard
          key={event._id}
          eventId={event._id}
          title={event.title}
          platform={event.platform}
          eventDate={event.eventDate}
          duration={event.duration}
          type={event.type}
          status={event.status}
          link={event.link}
          description={event.description}
          mode={event.mode}
          registrationDeadline={event.registrationDeadline}
          className="mx-4 my-4"
        />
            ))}
            </div>


        
    )
}

export default Events

