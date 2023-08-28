import { Button, Container, Form, FormControl, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import '../css/Login.css'
import logo from '../img/dc143c.png'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage } from "./context";
import Loading from "./loder";
const Login=()=>{
    const[Email,setEmail]=useState('');
    const[Password,setPassword]=useState(''); 
    const[eye,setEye]=useState(true);
    const{setMessage,showError,setShowError,setVariant,login,setLogin}=useContext(ErrorMessage);
    const[reset,setReset]=useState();
    const[rollId,setRollId]=useState();
    const[Loader,setLoader]=useState(false);
    const[show,setShow]=useState(true);
 // const[token,setToken]=useState()
    const history= useNavigate();
    const resetPassword= async()=>{
        try{
            const response = axios.post("http://localhost:4000/users/forget-password",{
            Email:Email
        });
        const message=(await response).data.message;
        const variant=(await response).data.variant;
        setMessage(message);
        setVariant(variant);
        setShowError(!showError);
        }
        catch(err){
            console.log(err);
        }
    }
    // const homePage=()=>{
    //     if(rollId===3){
    //         history("/Main")
    //     }
    // }
    useEffect(()=>{
        if(Loader){
            const timeOut=setTimeout(()=>{history("/Loader");},2000);
            return ()=>{
                clearTimeout(timeOut);
            }            
        }
    },[Loader, history]);
    return(
        <>
        { show?
        <Container fluid className="mt-3">
           <div className="row d-flex justify-content-center align-items-center">
             <div className="col-11 col-md-4 col-sm-7 col-lg-4 form">
                    <div className="row">
                       <div className="img2"></div>
                    </div>
                <Form className="p-3" onSubmit={
                    async(e)=>{
                        e.preventDefault();
                        try{
                           const Response= axios.post("http://localhost:4000/users/login",{
                               Email:Email,
                               Password:Password
                           })
                        //    console.log((await Response).data)
                           const message = (await Response).data.message;
                           const variant = (await Response).data.variant;
                           const forgotPassword =(await Response).data.forgotPassword;
                           const userToken = (await Response).data.token;
                           const userRollId=(await Response).data.rollId;
                           localStorage.setItem('token',userToken);
                           setRollId(userRollId);
                           setMessage(message);
                           setVariant(variant);
                           setReset(forgotPassword);
                           setShowError(!showError);
                           if(variant==="success"){
                            setLogin(!login);
                            setLoader(!Loader);
                           }
                        }
                        catch(err){
                           console.log(err.response.message);
                        }
                       }
                    }>                
                        <div className="row">
                            <div className="col-12 mt-3  d-flex justify-content-center align-items-center flex-column">
                                <img src={logo} alt="logo" className="img"></img>
                                <h3>Login</h3>
                            </div>
                        </div>       
                        <FormGroup>
                            <FormLabel className="label mt-1" style={{color:'crimson'}}>Email:</FormLabel>
                            <FormControl className="input"  onChange={(e)=>{setEmail(e.target.value)}}></FormControl>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel className="label mt-3" style={{color:'crimson'}}>Password:</FormLabel>
                            <InputGroup>
                               <FormControl className="input" type={eye? "password":"text"} onChange={(e)=>{setPassword(e.target.value)}}></FormControl>
                               <InputGroup.Text style={{cursor:"pointer"}} className="text" onClick={()=>{setEye(!eye)}}><FontAwesomeIcon icon={eye? faEyeSlash:faEye}></FontAwesomeIcon></InputGroup.Text>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="col-12 d-flex align-items-center justify-content-center flex-column">
                            <Link to="#">
                                <span className="mt-2" style={{display: reset? "block":"none"}}><u onClick={resetPassword}>Forgot password?</u></span>
                             </Link>
                             <Button className="col-5 mt-4 btn1" type="submit">Login</Button>
                             
                             <Link to="/SignUp">
                                <span className="mt-2"><u>SignUp instead?</u></span>
                             </Link>
                        </FormGroup>
                </Form>
             </div>
           </div>
        </Container>
         : <Loading/>}
        </>
    )
}
export default Login;