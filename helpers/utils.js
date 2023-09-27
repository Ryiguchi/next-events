export const BASE_URL =
  'https://nextjs-course-8fb88-default-rtdb.europe-west1.firebasedatabase.app/events.json';

export const createEventsArray = async url => {
  const response = await fetch(url);
  const data = await response.json();

  const eventsArray = [];

  for (const key in data) {
    eventsArray.push({
      id: key,
      ...data[key],
    });
  }

  return eventsArray;
};

export const getFeaturedEvents = async () => {
  const FEATURED_EVENTS_URL = `${BASE_URL}?orderBy="isFeatured"&equalTo=true&print=pretty`;

  return await createEventsArray(FEATURED_EVENTS_URL);
};

export const getAllEvents = async () => {
  return await createEventsArray(BASE_URL);
};

export const getEventById = async id => {
  const EVENT_BY_ID_URL = `${BASE_URL}?orderBy="$key"&equalTo="${id}"&print=pretty`;
  return await createEventsArray(EVENT_BY_ID_URL);
};

export const getFilteredEvents = async dateFilter => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
