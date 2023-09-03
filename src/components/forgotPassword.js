import { Button, Container, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import video from '../video/emailIcon.mp4';
import { useContext, useState} from "react";
import { ErrorMessage } from "./context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword=()=>{
    const[questionAnswer,setQuestionAnswer]=useState();
    const history = useNavigate();
    const{setMessage,showError,
        setShowError,setVariant,userEmail,
        securityQuestion
    }=useContext(ErrorMessage);
    console.log(securityQuestion);
    const resetPassword= async(e)=>{
        e.preventDefault();
        try{
            const response = axios.post(`http://localhost:4000/users/forget-password/${questionAnswer}`,{
            Email:userEmail
        });
        console.log(response);
        const message=(await response).data.message;
        const variant=(await response).data.variant;
        setMessage(message);
        setVariant(variant);
        setShowError(!showError);
        if(variant==="success"){
            history("/Login")
        }
        }
        catch(err){
            console.log(err);
        }
    }
    return(
    <Container fluid>
        <div className="row d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
            <div className="col-5 p-3" style={{backgroundColor:"#212529",borderRadius:"20px"}}>
               <Form>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <video src={video} autoPlay loop className="col-6" width="200px" height="200px" ></video>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p style={{color:"white",fontFamily:"'M PLUS Rounded 1c', sans-serif"}}>Give the answer to the security question provided during login so that we can send you a password that will be used to login to the system and reset the password, The password will be valid for 5mins and after which the password will become invalid. The Email will been sent to <span style={{color:"#dc143c"}}>{userEmail}</span></p>
                        <p style={{color:"#c2b302"}}>
                            {securityQuestion}
                        </p>
                    </div>
                </div>
                  <FormGroup>
                     <FormLabel style={{color:"white"}}>Write answer:</FormLabel>
                     <FormControl onChange={(e)=>{setQuestionAnswer(e.target.value)}}></FormControl>
                  </FormGroup>
                  <FormGroup className="row mt-4">
                      <div className="col-12 d-flex align-items-center justify-content-center">
                     <Button type="submit" onClick={resetPassword}>Confirm Answer</Button>                         
                      </div>
                  </FormGroup>
               </Form>
            </div>
        </div>
    </Container>
    )
}
export default ForgotPassword;