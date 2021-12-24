
// import { createContext } from "react";

// const Notifications=createContext({
//     notification:[],
//     totalNotification:0,
//     addapply:(application)=>{}
// });

// function Notificationscontext(props){
// const[applynotification,setapplicationnotification]=useState([])

// function addapplyhandler(application){
//     setapplicationnotification((prevuserapp)=>{
//         return prevuserapp.concat(application)
//     })

// }
// const context={
//     notification:applynotification,
//     totalNotification:setapplicationnotification.length,
//     addapply:addapplyhandler,

// };
// return (
//     <Notifications.Provider value={context}>
//         {props.children}

//     </Notifications.Provider>
// )

// }