import Head from 'next/head';

import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/utils';

import NewsLetterRegistration from '../components/input/newsletter-registration';

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve."
        />
      </Head>
      <NewsLetterRegistration />
      {<EventList items={featuredEvents} />}
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 60 * 30,
  };
}
