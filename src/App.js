import logo from './logo.svg';
import './App.css';
import Input from './components/input';
import {
  BrowserRouter, Routes,
  Route, Navigate
} from "react-router-dom";
import Signup from './components/signup/Signup';
import Login from './components/login/login';
import Home from './components/home/home';
import Updateform from './components/updateform/updateform';

function App(props) {

  return (
    <Routes>
      <Route exact path="/" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/update/:id" element={<Updateform />} />
    </Routes>

  );

}

export default App;