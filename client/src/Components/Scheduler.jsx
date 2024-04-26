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



import React from "react";
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
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCe0x0WmFZfVpgcl9EYVZQRWYuP1ZhSXxXdkFhXH9YcnVUR2VYVEc="
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
  const eventSettings = { dataSource: data };

  const onPopupOpen = (args) => {
    if (args.type === 'DeleteAlert' || args.type === 'DeleteSeriesAlert' || args.type === 'Editor') {
      args.cancel = true;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
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