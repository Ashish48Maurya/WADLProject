// import React, { useRef, useState, useEffect } from 'react'
// import { useAuth } from './Store/auth';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export default function Form() {

//     const { backend_api, token } = useAuth();
//     const navigate = useNavigate();
//     const [faculty, setFaculty] = useState([]);
//     const [selectedEmails, setSelectedEmails] = useState([]);
//     const [eventType, setEventType] = useState("");
//     const [eventName, setEventName] = useState("");
//     const [teamSize, setTeamSize] = useState("");
//     const [noOfTeams, setNoOfTeams] = useState("");
//     const [outSiders, setOutSiders] = useState("");
//     const [supervisor, setSupervisor] = useState("");
//     const [file, setFile] = useState('');
//     const ref = useRef(null);
//     const open = () => {
//         ref.current.click();
//     }

//     const fetchFacultys = async () => {
//         try {
//             const res = await fetch(`${backend_api}/teachers`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer  ${token}`
//                 },
//             });
//             if (res.ok) {
//                 const data = await res.json();

//                 setFaculty(data.data);
//             } else {
//                 console.error('Failed to fetch assignments:', res.statusText);
//             }
//         } catch (error) {
//             console.error('Error fetching assignments:', error);
//         }
//     }

//     const handleCheckboxChange = (email) => {
//         setSelectedEmails((prevEmails) => {
//             if (prevEmails.includes(email)) {
//                 return prevEmails.filter((e) => e !== email);
//             } else {
//                 return [...prevEmails, email];
//             }
//         });
//     };

//     useEffect(() => {
//         fetchFacultys();
//     }, [])

//     const handleSubmit = async (e) => {
//         // e.preventDefault();
//         if (!eventType || !eventName || !teamSize || !noOfTeams || !supervisor) {
//             return toast.error("All Fields Are Required!!!");
//         }

//         const formData = new FormData();
//         formData.append("eventType", eventType);
//         formData.append("eventName", eventName);
//         formData.append("teamSize", teamSize);
//         formData.append("noOfTeams", noOfTeams);
//         formData.append("outSiders", outSiders);
//         formData.append("supervisor", supervisor);
//         formData.append("file", file);
//         formData.append("permissionFrom", selectedEmails);

//         try {
//             const response = await fetch(`${backend_api}/permission`, {
//                 method: "post",
//                 headers: {
//                     "Authorization": `Bearer  ${token}`
//                 },
//                 body: formData,
//             });

//             if (response.status === 200) {
//                 const res_data = await response.json();
//                 console.log("response from server ", res_data);
//                 navigate('/seeAllForms');
//                 toast.success("Successfully Registered!!!");
//             } else {
//                 toast.error("Registeration Failed!!!");
//             }
//         } catch (error) {
//             console.log(error);
//         }

//     };

//     return (
//         <>
//             <button ref={ref} type="button" className="btn btn-primary" style={{ "display": "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
//                 Launch demo modal
//             </button>

//             <div className='container col-12 col-sm-10 col-md-8 col-lg-8'>
//                 <div className="row mb-3">
//                     <div className="col">
//                         <input type="text" className="form-control" placeholder="Enter EventType" value={eventType} onChange={(e) => { setEventType(e.target.value) }} name="email" />
//                     </div>
//                     <div className="col">
//                         <input type="text" value={eventName} onChange={(e) => { setEventName(e.target.value) }} className="form-control" placeholder="Enter EventName" name="pswd" />
//                     </div>
//                 </div>
//                 <div className="row mb-3">

//                     <div className="col">
//                         <input type="text" value={noOfTeams} onChange={(e) => { setNoOfTeams(e.target.value) }} className="form-control" placeholder="Enter Total Number of Teams" name="pswd" />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <div className="col">
//                         <input type="file" className="form-control" accept="image/*"
//                             onChange={(event) => setFile(event.target.files[0])} />
//                     </div>
//                     <div className="col">
//                         <input type="text" className="form-control" value={supervisor} onChange={(e) => { setSupervisor(e.target.value) }} placeholder="Enter Supervisor Name" name="pswd" />
//                     </div>
//                 </div>
//                 <div className="row mb-3">
//                     <div className="col">
//                         <div className="form-group flex">
//                             <label htmlFor="department1">OutSiders:</label>
//                             <select id="department1" className="form-select" required value={outSiders} onChange={(e) => { setOutSiders(e.target.value) }}>
//                                 <option value="">Choose...</option>
//                                 <option value="Allowed">Allowed</option>
//                                 <option value="Not-Allowed">Not-Allowed</option>
//                             </select>
//                         </div>
//                     </div>
// <div className="col">
//     <div className="form-group flex">
//         <label htmlFor="department1">TeamSize:</label>
//         <select id="department1" className="form-select" required value={teamSize} onChange={(e) => { setTeamSize(e.target.value) }}>
//             <option value="">Choose...</option>
//             <option value="Quad">1-4</option>
//             <option value="Triple">1-3</option>
//             <option value="Duo">1-2</option>
//             <option value="Solo">1</option>
//         </select>
//     </div>
// </div>

//                 </div>
//                 <button type="submit" onClick={open} className="btn btn-primary">Submit</button>
//             </div>

//             <div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog modal-dialog-scrollable">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" style={{ "color": "orangered" }} id="exampleModalLabel">Send To: </h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             {faculty.map((user) => (
//                                 <div key={user._id} className="d-flex justify-content-between m-2">
//                                     <span className="avatar-text">{user.fullname.charAt(0)}</span>
//                                     <div style={{ flex: 1 }}>
//                                         <div style={{ marginBottom: "5px" }}>{user.fullname}</div>
//                                         <div>{user.department}</div>
//                                     </div>
//                                     <div className="my-auto">
//                                         <div className="my-auto form-check custom-checkbox">
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 onChange={() => handleCheckboxChange(user.email)}
//                                                 checked={selectedEmails.includes(user.email)}
//                                             />
//                                             <label className="form-check-label" htmlFor={`flexCheckChecked-${user._id}`}></label>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div className='text-center'><button className='btn btn-primary mt-2' onClick={handleSubmit}>Send</button></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <style>{`
//             .avatar-text {
//                 width: 50px;
//                 height: 50px;
//                 color:black;
//                 font-weight:bold;
//                 text-align:center;
//                 border-radius: 50%;
//                 background-color: orange;
//                 margin-right: 20px;
//                 line-height: 50px;
//               }
//              .form-check-input{
//                 border: 2px solid black;
//                 height:20px;
//                 width: 20px;
//              }
//              .select {
//                 appearance: none;
//                 -webkit-appearance: none;
//                 background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
//                 background-repeat: no-repeat;
//                 background-position: right 10px center;
//                 background-size: 18px 18px;
//                 border: 1px solid #ccc;
//                 border-radius: 4px;
//                 padding: 8px;
//                 padding-right: 36px;
//                 width: 100%;
//                 font-size: 16px;
//                 outline: none;
//               }

//               .select:focus {
//                 border-color: #4CAF50;
//                 box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
//               }

//               .select:focus::-ms-value {
//                 color: #4CAF50;
//               }

//               .select:required:invalid {
//                 color: #ccc;
//               }

//               .select:required:invalid::-ms-value {
//                 color: #ccc;
//               }
//             `}</style>
//         </>
//     )
// }

import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "./Store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const { backend_api, token } = useAuth();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [noOfTeams, setNoOfTeams] = useState("");
  const [outSiders, setOutSiders] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [file, setFile] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const ref = useRef(null);
  const open = () => {
    ref.current.click();
  };

  const fetchFacultys = async () => {
    try {
      const res = await fetch(`${backend_api}/teachers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log("DATA: ", data);
        setFaculty(data.data);
      } else {
        console.error("Failed to fetch assignments:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleCheckboxChange = (email) => {
    setSelectedEmails((prevEmails) => {
      if (prevEmails.includes(email)) {
        return prevEmails.filter((e) => e !== email);
      } else {
        return [...prevEmails, email];
      }
    });
  };

  const handleIsAllDayChange = () => {
    setIsAllDay(!isAllDay);
  };

  useEffect(() => {
    fetchFacultys();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventType || !eventName || !teamSize || !noOfTeams || !supervisor) {
      return toast.error("All Fields Are Required!!!");
    }

    const formData = new FormData();
    formData.append("eventType", eventType);
    formData.append("eventName", eventName);
    formData.append("teamSize", teamSize);
    formData.append("noOfTeams", noOfTeams);
    formData.append("outSiders", outSiders);
    formData.append("supervisor", supervisor);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("file", file);
    formData.append("permissionFrom", selectedEmails);

    try {
      const response = await fetch(`${backend_api}/permission`, {
        method: "post",
        headers: {
          Authorization: `Bearer  ${token}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        const res_data = await response.json();
        console.log("response from server ", res_data);
        navigate("/private/seeAllForms");
        toast.success("Successfully Registered!!!");
      } else {
        toast.error("Registeration Failed!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div className="flex items-center justify-center h-screen ">
        <div className="container max-w-md p-4 bg-slate-50 rounded border-2 border-black">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Event type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              name="email"
              className="peer h-10 w-full border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-rose-600 bg-slate-50"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event name"
              name="pswd"
              className="peer h-10 w-full border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-rose-600 bg-slate-50"
            />
          </div>
          <div className="flex mb-6">
            <div className="w-full md:w-1/2 mr-3">
              <input
                type="text"
                value={noOfTeams}
                onChange={(e) => setNoOfTeams(e.target.value)}
                placeholder="Total Number of Teams"
                name="pswd"
                className="peer h-10 w-full border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-rose-600 bg-slate-50"
              />
            </div>
            <div className="w-full md:w-1/2 ml-3">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files[0])}
                className="peer h-10 w-full border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-rose-600 bg-slate-50"
              />
            </div>
          </div>
          <div className="flex mb-6">
            <div className="w-full md:w-1/2 mr-3">
              <input
                type="text"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                placeholder="Supervisor Name"
                name="pswd"
                className="peer h-10 w-full border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-rose-600 bg-slate-50"
              />
            </div>
            <div className="w-full md:w-1/2 ml-3">
              <select
                id="department1"
                required
                value={outSiders}
                onChange={(e) => setOutSiders(e.target.value)}
                className=" peer placeholder-transparent h-10 w-full border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-md bg-slate-50"
              >
                <option value="" className="bg-slate-50">
                  OutSiders
                </option>
                <option value="Allowed">Allowed</option>
                <option value="Not-Allowed">Not-Allowed</option>
              </select>
            </div>
          </div>

          <div className="flex mb-6">
            <div className="w-full md:w-1/2 ml-3">
              <select className=" peer placeholder-transparent h-10 w-full border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-md bg-slate-50" id="department1"  required value={teamSize} onChange={(e) => { setTeamSize(e.target.value) }}>
                <option value="" className="bg-slate-50">
                  TeamSize
                </option>
                <option value="Quad">1-4</option>
                <option value="Triple">1-3</option>
                <option value="Duo">1-2</option>
                <option value="Solo">1</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 ml-3">
              <select className=" peer placeholder-transparent h-10 w-full border-b-2 border-blue-300 text-gray-900 focus:outline-none focus:border-rose-600 rounded-md bg-slate-50" id="department1"  required value={isAllDay} onChange={(e) => { setIsAllDay(e.target.value) }}>
                <option value="" className="bg-slate-50">
                  IsAllDay
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>





          <div className="flex mb-3">
            <span><label
              className="text-gray-900 text-sm font-medium"
            >
              Start Time
            </label>
              <input type="datetime-local" name="" id="" className="border-b-2 border-blue-300" onChange={(e) => { setStartTime(e.target.value) }} /></span>
            <span>
              <label
                className="text-gray-900 text-sm font-medium"
              >
                End Time
              </label>
              <input type="datetime-local" name="" id="" className="border-b-2 border-blue-300" onChange={(e) => { setEndTime(e.target.value) }} />
            </span>
          </div>
          <button
            type="submit"
            onClick={open}
            className="calendarJoinButton px-[1.375rem] py-[0.375rem] rounded-full border border-[#9F9F9F] text-sm font-medium text-[#6F6F6F] hover:text-white hover:border-none m-auto justify-center w-full flex "
          >
            Submit
          </button>
        </div>
      </div>

      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                style={{ color: "orangered" }}
                id="exampleModalLabel"
              >
                Send To:{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {faculty.map((user) => (
                <div
                  key={user._id}
                  className="d-flex justify-content-between m-2"
                >
                  <span className="avatar-text">{user.fullname.charAt(0)}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: "5px" }}>{user.fullname}</div>
                    <div>{user.department}</div>
                  </div>
                  <div className="my-auto">
                    <div className="my-auto form-check custom-checkbox">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        style={{ border: "2px solid black" }}
                        onChange={() => handleCheckboxChange(user.email)}
                        checked={selectedEmails.includes(user.email)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`flexCheckChecked-${user._id}`}
                      ></label>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
            .avatar-text {
                                 width: 50px;
                                 height: 50px;
                                 color:black;
                                 font-weight:bold;
                                 text-align:center;
                                 border-radius: 50%; 
                                 background-color: orange;
                                 margin-right: 20px;
                                 line-height: 50px;
                               }
                            
            `}</style>
    </>
  );
}
