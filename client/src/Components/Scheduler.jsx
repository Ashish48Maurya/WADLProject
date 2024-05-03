// import React from "react";
// import {
//   ScheduleComponent,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
//   Inject,
//   ViewsDirective,
//   ViewDirective,
// } from "@syncfusion/ej2-react-schedule";
// import { registerLicense } from "@syncfusion/ej2-base";

// registerLicense(
//   "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x0WmFZfVpgcl9EYVZQRWYuP1ZhSXxXdkFhXH9YcnVUR2VYVEc="
// );

// const data = [
//   {
//     Id: 1,
//     Subject: "Meeting - 1",
//     StartTime: new Date(2024, 1, 15, 10, 0),
//     EndTime: new Date(2024, 1, 15, 12, 30),
//     IsAllDay: false,
//   },
//   {
//     Id: 2,
//     Subject: "Meeting - 2",
//     StartTime: new Date(2024, 1, 15, 11, 0),
//     EndTime: new Date(2024, 1, 16, 14, 30),
//     IsAllDay: false,
//   },
//   {
//     Id: 3,
//     Subject: "Meeting - 3",
//     StartTime: new Date(2024, 1, 15, 12, 0),
//     EndTime: new Date(2024, 1, 16, 16, 30),
//     IsAllDay: false,
//   },
// ];

// const Scheduler = () => {
//   const eventSettings = { dataSource: data };

//   const onPopupOpen = (args) => {
//     if (args.type === 'Editor' || args.type === 'DeleteConfirmation') {
//       args.cancel = true; // Prevent the default behavior
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <ScheduleComponent
//         currentView="Month"
//         height="550px"
//         width="800px"
//         eventSettings={eventSettings}
//         popupOpen={onPopupOpen} // Bind the onPopupOpen event handler
//       >
//         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//         <ViewsDirective>
//           <ViewDirective option="Day" />
//           <ViewDirective option="Week" />
//           <ViewDirective option="WorkWeek" />
//           <ViewDirective option="Month" />
//           <ViewDirective option="Agenda" />
//         </ViewsDirective>
//       </ScheduleComponent>
//     </div>
//   );
// };

// export default Scheduler;

import React, { useEffect, useState } from "react";
import { useAuth } from "./Store/auth";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5WdkdiXXpbcXRcT2hZ"
);

const data = [
  {
    Id: 1,
    Subject: "Meeting - 1",
    StartTime: new Date(2024, 1, 15, 10, 0),
    EndTime: new Date(2024, 1, 15, 12, 30),
    IsAllDay: true,
  },
  {
    Id: 2,
    Subject: "Meeting - 2",
    StartTime: new Date(2024, 1, 15, 11, 0),
    EndTime: new Date(2024, 1, 16, 14, 30),
    IsAllDay: false,
  },
  {
    Id: 3,
    Subject: "Meeting - 3",
    StartTime: new Date(2024, 1, 15, 12, 0),
    EndTime: new Date(2024, 1, 16, 16, 30),
    IsAllDay: false,
  },
];

const Scheduler = () => {
  const [event, setEvent] = useState([]);
  const eventSettings = { dataSource: event };
  const { backend_api, token } = useAuth();
  const events = async () => {
    try {
      const res = await fetch(`${backend_api}/schedulerEvent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("DATA: ", data.data);
        setEvent(data.data);
      } else {
        console.error("Failed to fetch assignments:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    events();
  }, []);

  const onPopupOpen = (args) => {
    if (
      args.type === "DeleteAlert" ||
      args.type === "DeleteSeriesAlert" ||
      args.type === "Editor" ||
      args.type === "AddTitle"
    ) {
      args.cancel = true;
    }
    // args.cancel = true;
  };

  return (
    <div className="flex justify-center items-center min-h-[80svh] mx-2 ">
      <ScheduleComponent
        currentView="Month"
        height="550px"
        width="800px"
        eventSettings={eventSettings}
        popupOpen={onPopupOpen}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
      </ScheduleComponent>
    </div>
  );
};

export default Scheduler;
