import React,{useEffect,useState} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./Store/auth";

const GrantPermissionPage = () => {
  const { token, backend_api } = useAuth();
  const [data,setData] = useState({});
  const Udata = localStorage.getItem("USER");
  const userData = JSON.parse(Udata);
  const [permitted,setPermit] = useState(false);

  const permissionDetails = {
    eventType: data.eventType,
    eventName: data.eventName,
    url: data.url,
    teamSize: data.teamSize,
    noOfTeams: data.noOfTeams,
    outSiders: data.outSiders,
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
    isAllDay: data.isAllDay,
    supervisor: data.supervisor
  };
  const navigate = useNavigate();
  const {id} = useParams();

  const event = async () => {
    try {
        const res = await fetch(`${backend_api}/singleEvent/?id=${id}`, {
            method: "get",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (res.status === 200) {
            const res_data = await res.json();
            const userPermission = res_data.data.permissionFrom.find(permission => permission.email === userData.email);
            setPermit(userPermission.permitted)
            setData(res_data.data);
        }
    } catch (error) {
        console.log(error);
    }
}

  const permit = async () => {
    try {
        const res = await fetch(`${backend_api}/permissions/${id}`, {
            method: "get",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (res.status === 200) {
          toast.success("Permission granted successfully!");
          navigate('/');
        }
    } catch (error) {
      toast.error("Failed To Permit!!!");
    }
}

useEffect(() => {
  event();
}, [])


  return (
    <div className="max-w-lg mx-auto md:mt-4 px-4">
      <div
        className="bg-white shadow-md rounded-lg p-6 "
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <h2 className="text-2xl text-center font-semibold mb-2">
          Grant Permission
        </h2>
        <div className="bg-indigo-50 p-4 rounded-md mb-4">
          <div className="mb-2">
            <img
              src={`${backend_api}/${permissionDetails.url}`}
              className="w-full h-48 object-cover rounded-md"
              alt="home"
            />
          </div>
          <div className="mb-2">
            <span className="font-semibold">Event Type:</span>{" "}
            {permissionDetails.eventType}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Event Name:</span>{" "}
            {permissionDetails.eventName}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Team Size:</span>{" "}
            {permissionDetails.teamSize}
          </div>
          <div className="mb-2">
            <span className="font-semibold">No. of Teams:</span>{" "}
            {permissionDetails.noOfTeams}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Outsiders:</span>{" "}
            {permissionDetails.outSiders}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Start Time:</span>{" "}
            {permissionDetails.startTime.toLocaleString()}
          </div>
          <div className="mb-2">
            <span className="font-semibold">End Time:</span>{" "}
            {permissionDetails.endTime.toLocaleString()}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Is All Day:</span>{" "}
            {permissionDetails.isAllDay ? "Yes" : "No"}
          </div>
          <div className="">
            <span className="font-semibold">Supervisor:</span>{" "}
            {permissionDetails.supervisor}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
          >
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                className="h-5 w-5 text-green-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M7 12l5 5l10 -10" />
                <path d="M2 12l5 5m5 -5l5 -5" />
              </svg>
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                className="h-5 w-5 text-green-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M7 12l5 5l10 -10" />
                <path d="M2 12l5 5m5 -5l5 -5" />
              </svg>
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white" onClick={permit}>
              {permitted ? "AlreadyPermitted" :  "Grant Permission"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrantPermissionPage;
