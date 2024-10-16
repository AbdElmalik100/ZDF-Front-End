'use client'
import Slider from "./components/Slider";
import Sponsorship from './components/Sponsorship'
import LatestEvent from './components/LatestEvent'
import EventTimeline from './components/EventTimeline'
import Bundles from './components/Bundles'
import LatestWorkshops from './components/LatestWorkshops'
import TeamMembers from './components/TeamMembers'
import Testimonials from './components/Testimonials'


export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <section className="landing h-screen pt-[62px]">
        <Slider></Slider>
      </section> */}
      <Sponsorship></Sponsorship>
      <LatestEvent></LatestEvent>
      <EventTimeline></EventTimeline>
      <Bundles></Bundles>
      <LatestWorkshops></LatestWorkshops>
      <TeamMembers></TeamMembers>
      <Testimonials></Testimonials>
    </main>
  );
}
