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
import EventHistory from "./Components/EventHistory";
import PrivateRoute from '../src/Components/Store/protectedRoute'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/private" element={<PrivateRoute />}>
          <Route exact path="schedule" element={<Scheduler />} />
          <Route exact path="seeAllForms" element={<EventHistory />} />
          <Route exact path="form" element={<Form />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
