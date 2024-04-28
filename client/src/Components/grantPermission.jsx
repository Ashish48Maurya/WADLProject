import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GrantPermissionPage = () => {
  const permissionDetails = {
    eventType: "Workshop",
    eventName: "React Fundamentals",
    url: "",
    teamSize: 1,
    noOfTeams: 10,
    outSiders: "Allowed",
    startTime: new Date("2023-05-01T09:00:00"),
    endTime: new Date("2023-05-01T17:00:00"),
    isAllDay: false,
    supervisor: "Ashish nehra",
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handleGrantPermission = () => {
    // Call the logic to grant permission
    toast.success("Permission granted successfully!");
    navigate("/private/schedule", {
      replace: true,
      state: { from: location.pathname },
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl text-center font-semibold mb-4">
          Grant Permission
        </h2>
        {/* <div className="mb-6">Display permission details</div> */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">Event Type:</span>{" "}
            {permissionDetails.eventType}
          </div>
          <div>
            <span className="font-semibold">Event Name:</span>{" "}
            {permissionDetails.eventName}
          </div>
          <div>
            <span className="font-semibold">URL:</span> {permissionDetails.url}
          </div>
          <div>
            <span className="font-semibold">Team Size:</span>{" "}
            {permissionDetails.teamSize}
          </div>
          <div>
            <span className="font-semibold">No. of Teams:</span>{" "}
            {permissionDetails.noOfTeams}
          </div>
          <div>
            <span className="font-semibold">Outsiders:</span>{" "}
            {permissionDetails.outSiders}
          </div>
          <div>
            <span className="font-semibold">Start Time:</span>{" "}
            {permissionDetails.startTime.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">End Time:</span>{" "}
            {permissionDetails.endTime.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Is All Day:</span>{" "}
            {permissionDetails.isAllDay ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-semibold">Supervisor:</span>{" "}
            {permissionDetails.supervisor}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleGrantPermission}
            class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
          >
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                class="h-5 w-5 text-green-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <path d="M7 12l5 5l10 -10" /> <path d="M2 12l5 5m5 -5l5 -5" />
              </svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                class="h-5 w-5 text-green-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <path d="M7 12l5 5l10 -10" /> <path d="M2 12l5 5m5 -5l5 -5" />
              </svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              Grant Permission
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrantPermissionPage;
