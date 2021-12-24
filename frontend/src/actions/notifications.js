import axios from "axios";
// import {parse, stringify} from 'flatted' ;
import Cookies from "js-cookie";



export const SendNotifications=(to_user,is_read,job,created_by)=>{
    const config={
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),

        }
    };
    let notifications_type='application'
    const post_body=JSON.stringify({to_user,is_read,job,created_by,notifications_type})
    const promise=axios.post('http://localhost:8000/notifications/api/',post_body,config)
    const dataPromise=promise.then((res)=>res.data)
    return dataPromise;

}

    