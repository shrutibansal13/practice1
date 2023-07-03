import React, {Component} from 'react';
import { BrowserRouter , Routes, 
    Route, Navigate} from "react-router-dom";

    import Home from '../pages/home';
    import Login from '../pages/login';
    import Signup from '../pages/signup';
class App extends Component{
    render(){
        return (
          
            <Routes>
                <Route exact path="/" element={<Signup/>} />
                <Route path="/login" element={ <Login/>} />
                {/* <Route path="/signup" component={<Signup/>} /> */}
                <Route path="/signup" element={ <Signup/> } />
            
            </Routes>
        
        
        )
    }
}

export default App;