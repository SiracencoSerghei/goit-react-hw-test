import { EventBoard } from "./EventBoard/EventBoard";
import { PageTitle } from "./PageTitle/PageTitle";
import upcomingEvent from "../upcoming-events.json";

export const App = () => {
  return (<div>
    <PageTitle text="24th Core Worlds Coalition Conference" />
    <EventBoard events={upcomingEvent} />
  </div>);
};
