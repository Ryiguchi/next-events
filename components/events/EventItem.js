import S from './EventItem.module.css';
import Button from '../ui/Button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Image from 'next/image';

const EventItem = ({ event }) => {
  const { title, image, date, location, id } = event;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');

  const exploreLink = `/events/${id}`;

  return (
    <li className={S.item}>
      <Image src={'/' + image} alt={title} width={250} height={160} />
      <div className={S.content}>
        <div className={S.summary}>
          <h2>{title}</h2>
          <div className={S.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={S.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={S.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={S.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
