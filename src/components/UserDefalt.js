import { Button, Container } from "react-bootstrap";


import img from '../img/company logo Dark.png';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ErrorMessage } from "./context";
import axios from 'axios';

const UserDefault=()=>{
   const{setMessage,showError,setShowError,setVariant}=useContext(ErrorMessage);
   const history=useNavigate();
   const sendEmail=async()=>{
      try{
      const time=new Date()
      const userItem=localStorage.getItem('item');
      const userInfo=JSON.parse(userItem);
      const response = axios.post("http://localhost:4000/users/sendEmailToAdmin",{
         Email:userInfo.email,
         FirstName:userInfo.firstName,
         SecondName:userInfo.SecondName,
      })
      axios.post("http://localhost:4000/Admin/notification",{
         message:`The user with the the email ${userInfo.email} is requesting an elevation`,
         time:time
      })
      const message = (await response).data.message;
      const variant =(await response).data.variant;
      setMessage(message);
      setVariant(variant);
      setShowError(!showError);
      history('/Login');
      localStorage.clear();
    }
    catch(err){

    }
   }
    return(
        <Container fluid>
            <div className="row d-flex justify-content-center" style={{backgroundColor:"#707e8b"}}>
                <div className="col-6 d-flex justify-content-center flex-column" style={{minHeight:"100vh"}}>
                  <div className="row">
                     <div className="col-12 d-flex justify-content-center">
                        <img src={img} alt="img" style={{height:"200px",width:"200px",borderRadius:"100px"}}></img>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-12">
                        <p style={{textAlign:"center",fontSize:"20px"}}>
                            click the button to send a notification to the Administrator so that you are given access to the system check your email so as to receive the access key from the Administrator
                        </p>
                     </div>
                  </div>
                  <div className="row mt-1 d-flex justify-content-center align-items-center">
                        <Button className="m-3 col-6" size="lg" onClick={sendEmail}>Notify</Button>
                  </div>
                  <div className="row mt-1 d-flex justify-content-center align-items-center">                     
                  <Button className="m-3 col-6" size="lg" onClick={()=>{
                           localStorage.clear();
                           history('/Login')
                        }}>Logout</Button>
                  </div>
                </div>
            </div>            
        </Container>
    );
}
export default UserDefault;