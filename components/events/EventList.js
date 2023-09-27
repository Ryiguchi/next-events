import EventItem from "./EventItem";
import S from "./EventList.module.css";

const EventList = ({ items }) => {
  return (
    <div>
      <ul className={S.list}>
        {items.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
