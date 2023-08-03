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
import Parentcomponent from './components/parentcomponent';
import CategoryProducts from './components/categoryproducts/categoryproducts';
function App(props) {

  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/category/:id" element={<CategoryProducts />} />
      <Route path="/update" element={<Updateform />} />
    </Routes>

  );

}

export default App;