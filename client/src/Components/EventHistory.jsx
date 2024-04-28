import React, { useEffect, useState } from "react";
import { useAuth } from "./Store/auth";

export default function EventHistory() {
  const { token, backend_api } = useAuth();
  const [event, setEvent] = useState([]);

  const Events = async () => {
    try {
      const res = await fetch(`${backend_api}/eventList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("DATA: ", data.allEvent);
        setEvent(data.allEvent);
      } else {
        console.error("Failed to fetch assignments:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    Events();
  }, []);

  return (
    <>
      {event.length !== 0 ? (
        <>
          {event.map((ele) => {
            const permissionPermitted = ele.permissionFrom.map(
              (user) => user.permitted
            );
            const allPermitted = permissionPermitted.every(
              (value) => value === true
            );
            return (
              <div
                key={ele._id}
                className="gap-3 p-10 lectureCard grid hover:gap-[0.9375rem] grid-cols-[0_1fr] hover:grid-cols-[0.5rem_1fr] transition-[grid-template-columns]"
              >
                <div
                  className="lectureCardActiveBar rounded-full"
                  style={{
                    backgroundColor: allPermitted ? "#38f86e" : "#ff0000",
                  }}
                ></div>
                <div className="px-[0.9375rem] border border-[#7C7A7A] rounded-[0.3125rem] bg-[hsl(0,0%,95%,20%)] shadow-[0_8px_15.1px_hsl(0,1%,25%,10%)] flex justify-evenly items-center">
                  <div className="space-y-1 border-r-2 pr-3 my-auto">
                    <div className="text-sm leading-5 font-semibold">
                      <span className="text-xs leading-4 font-normal text-gray-500 mr-2">
                        {" "}
                        Start Time #
                      </span>
                      {new Date(ele.startTime).toLocaleString()}
                    </div>
                    <div className="text-sm leading-5 font-semibold">
                      <span className="text-xs leading-4 font-normal text-gray-500 pr mr-2">
                        {" "}
                        End Time #
                      </span>
                      {new Date(ele.endTime).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="ml-3 space-y-1 border-r-2 pr-3">
                      <div className="text-base leading-6 font-normal">
                        <span className="text-xs leading-4 font-normal text-gray-500 mr-4">
                          {" "}
                          Event Name
                        </span>
                        {ele.eventName}
                      </div>
                      <div className="text-sm leading-4 font-normal">
                        <span className="text-xs leading-4 font-normal text-gray-500 mr-4">
                          {" "}
                          Event Type
                        </span>
                        {ele.eventType}
                      </div>
                      <div className="text-sm leading-4 font-normal">
                        <span className="text-xs leading-4 font-normal text-gray-500 mr-4">
                          {" "}
                          Faculty
                        </span>
                        {ele.permissionFrom.map((user, index) => (
                          <span
                            key={index}
                            style={{ color: user.permitted ? "green" : "red" }}
                            className="mr-2"
                          >
                            {user.email}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mx-3 my-5 p-1 w-20">
                      <div
                        className={`text-600 text-[0.75rem] font-bold border border-secondary py-[0.3125rem] px-[0.6875rem] rounded-full w-max ${
                          allPermitted ? "bg-[#38f86e]" : "bg-red-500"
                        }`}
                      >
                        {allPermitted ? "Applied" : "Not Applied"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="text-center text-violet-900 font-extrabold text-lg">
          You Haven't Hosted Any Event Till Now
        </div>
      )}
    </>
  );
}
