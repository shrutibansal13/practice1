import React from "react";
import { connect } from "react-redux"
// import {
//   increaseCounter,
//   decreaseCounter,
// } from "../redux/Counter/counter.actions"
import {setusername,delusername} from "../redux/name/names.action"
import { useSelector, useDispatch } from 'react-redux';
const Input = (props) => {
    const dispatch = useDispatch();
    // const inputval= useSelector(state=>state.username.username)
    
    
    return (
        <div>
            {/* <div>Count: {props.count}</div>

            <button onClick={() => props.increaseCounter()}>Increase Count</button>

            <button onClick={() => props.decreaseCounter()}>Decrease Count</button>
            <br></br><br></br> */}

            <input type="text" value={props.username2} onChange={props.setusername} placeholder='username' />
            <div>Name: {props.username2}</div>
            <button onClick={() => props.delusername()}>Delete</button>


        </div>

    )
}
const mapStateToProps = state => {
    return {
      // count: state.counter.count,
      username: state.username
    }
  }
  
  const mapDispatchToProps= dispatch =>{
    return {
      // increaseCounter: () => dispatch(increaseCounter()),
  
      // decreaseCounter: () => dispatch(decreaseCounter()),
  
      setusername: (e) => {
        console.log(e.target.value);
        const action={ type:'', text:e.target.value}
        dispatch(action);
      },
  
      delusername: () => dispatch(delusername())
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Input);
  