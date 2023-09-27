import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/error-alert';
import { BASE_URL, getFilteredEvents } from '../../helpers/utils';
import useSWR from 'swr';
import { useState } from 'react';
import Head from 'next/head';

const FilteredEventsPage = ({
  filteredEvents,
  numYear,
  numMonth,
  hasError,
}) => {
  const [events, setEvents] = useState(filteredEvents);
  const router = useRouter();

  const filterData = router.query.slug;

  const fetcher = url =>
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const eventsArray = [];

        for (const key in data) {
          eventsArray.push({
            id: key,
            ...data[key],
          });
        }
        setEvents(eventsArray);
        return eventsArray;
      });

  const { data, error, isLoading } = useSWR(BASE_URL, fetcher);

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );

  if (!filterData) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  // !!!!!!!!!!!!!!!!!!!!!!! NOT COMPLETE FOR CLIENT SIDE FETCHING!!!!!!!!!!!!!!!!!!!!!!
  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (hasError) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>There was an error!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const filterData = context.params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      // option to redirect to an error page, use an error prop to do something in the component or use the 404 page
      // notFound: true,
      // redirect: {destination: '/error'}
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents,
      numYear,
      numMonth,
    },
  };
}
