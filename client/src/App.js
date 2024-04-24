import { Route, Routes } from 'react-router-dom';
// import './App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   <>
      <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/navbar' element={<Navbar/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
    </Routes>
    <ToastContainer />
   </>
  );
}

export default App;
