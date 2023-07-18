import { SETNAME, DELNAME } from "./names.types";

const FIRST_STATE ={
     username:"",
}

const reducer = (state=FIRST_STATE,action)=>{
    console.log(action,"actionn")
    switch(action.type){
        case SETNAME: 
        return  Object.assign({},state, {username: action.text});
            // username:state.username.username+"sbs"
        case DELNAME: 
        return {
            // username: ""
        };
        default : return state;
    }
}

export default reducer;