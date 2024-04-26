import React from "react";
import { Link } from "react-router-dom";

export default function EventHistory() {
  const events = []; // Replace [...] with your actual array of events

  return (
    // <div>
    //   {events.map((event, index) => (
    //     <Card key={index} event={event} />
    //   ))}
    // </div>
    <div class="lectureCard | grid hover:gap-[0.9375rem] grid-cols-[0_1fr] hover:grid-cols-[0.5rem_1fr] transition-[grid-template-columns]">
      <div class="lectureCardActiveBar | bg-[#38f86e] rounded-full"></div>
      <div class="p-[0.9375rem] border border-[#7C7A7A] rounded-[0.3125rem] bg-[hsl(0,0%,95%,20%)] shadow-[0_8px_15.1px_hsl(0,1%,25%,10%)] flex justify-between items-center">
        <div>
          <div class="lectureClass | text-[#F722B7] text-[0.5rem] font-bold bg-[hsl(318,93%,55%,14%)] border border-secondary py-[0.3125rem] px-[0.6875rem] rounded-full w-max mb-2">
            branch
          </div>
          <h2 class="text-xl font-medium text-black">Watch Party</h2>
          <h3 class="text-[0.9375rem] text-[#A1A1A1]">
            Venue <span> Seminar hall</span>
          </h3>
          <h3 class="text-[0.9375rem] text-[#A1A1A1]">
            desc <span>some</span>
          </h3>
          <h3 class="text-[0.9375rem] text-[#A1A1A1]">
            date <span>test</span>
          </h3>
        </div>
        <Link
          href="#"
          class="calendarJoinButton | px-[1.375rem] py-[0.375rem] rounded-full border border-[#9F9F9F] text-sm font-medium text-[#6F6F6F] hover:text-white hover:border-none"
        >
          <button class="">see</button>
        </Link>
      </div>
    </div>
  );
}

function Card({ event }) {
  return (
    <div class="lectureCard | grid hover:gap-[0.9375rem] grid-cols-[0_1fr] hover:grid-cols-[0.5rem_1fr] transition-[grid-template-columns]">
      <div class="lectureCardActiveBar | bg-[#38A2F8] rounded-full"></div>
      <div class="p-[0.9375rem] border border-[#7C7A7A] rounded-[0.3125rem] bg-[hsl(0,0%,95%,20%)] shadow-[0_8px_15.1px_hsl(0,1%,25%,10%)] flex justify-between items-center">
        <div>
          <div class="lectureClass | text-[#F722B7] text-[0.5rem] font-bold bg-[hsl(318,93%,55%,14%)] border border-secondary py-[0.3125rem] px-[0.6875rem] rounded-full w-max mb-2">
            Comp-3
          </div>
          <h2 class="text-xl font-medium text-black">Network Layer</h2>
          <h3 class="text-[0.9375rem] text-[#A1A1A1]">
            Classroom: <span>Computer Networks</span>
          </h3>
          <h3 class="text-[0.9375rem] text-[#A1A1A1]">
            Faculty: <span>Prof. Prabhu</span>
          </h3>
          <h3 class="text-[0.9375rem] text-[#A1A1A1]">
            Attendance: <span>test</span>
          </h3>
        </div>
        <Link
          href="#"
          class="calendarJoinButton | px-[1.375rem] py-[0.375rem] rounded-full border border-[#9F9F9F] text-sm font-medium text-[#6F6F6F] hover:text-white hover:border-none"
        >
          <button class="">Join</button>
        </Link>
      </div>
    </div>
  );
}
