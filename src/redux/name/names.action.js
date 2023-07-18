import { SETNAME,DELNAME } from "./names.types";
export const setusername =(evnt)=>{
    return{
        type:SETNAME,
        payload: evnt
    }
}
export const delusername =()=>{
    return{
        type:DELNAME
    }
}
