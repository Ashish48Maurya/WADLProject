import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Scheduler from "./Components/Scheduler";
import Form from "./Components/Form";
import ApplieEvent from "./Components/ApplieEvent";
import Schedule from "./Components/Schedule";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/schedule" element={<Scheduler />} />

        <Route exact path="/form" element={<Form />} />
        <Route exact path="/schedule" element={<Schedule />} />
        <Route exact path="/seeAllForms" element={<ApplieEvent />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
