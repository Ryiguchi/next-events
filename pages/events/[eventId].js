import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { getEventById, getFeaturedEvents, BASE_URL } from '../../helpers/utils';
import Head from 'next/head';
import Comments from '../../components/input/comments';

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export default EventDetailPage;

export async function getStaticProps(context) {
  const id = context.params.eventId;

  const event = await getEventById(id);

  return {
    props: {
      event: event[0],
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
}
