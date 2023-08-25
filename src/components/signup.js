import { Button,Container, Form, FormControl, FormGroup, FormLabel, InputGroup} from "react-bootstrap"
import '../css/signup.css'
import logo from '../img/dc143c.png'
import { useContext, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import { ErrorMessage } from "./context"
// import ErrorComps from "./ErrorComps"
const SignUp=()=>{ 
    // const[showError,setShowError]=useState()
    const[fistName,setFirstName]=useState('');
    const[secondName,setSecondName]=useState('');
    const[Email,setEmail]=useState('');
    const[phone,setPhone]=useState('');
    const[Password,setPassword]=useState('');
    const[eye1,setEye1]=useState(true);
    const[eye2,setEye2]=useState(true);
    // eslint-disable-next-line no-unused-vars
    const[password1,setPassword1]=useState("password");
    // eslint-disable-next-line no-unused-vars
    const[password2,setPassword2]=useState("password");
    const[error,setError]=useState();
    const[error2,setError2]=useState();
    // const[show,setShow]=useState();
    const[confirmPassword,setConfirmPassword]=useState('');
    const{setMessage,showError,setShowError,setVariant}=useContext(ErrorMessage);
    return(        
    <div>
        <Container fluid>
         {/* <ErrorComps showError={showError} setShowError={setShowError}/> */}
            <div className="row d-flex align-items-center justify-content-center" style={{zIndex:"2"}}>              
                <div className="col-1 col-md-4 col-lg-8 col-sm-5 bck d-flex align-items-center">
                  
                </div>
                <div className="col-11 col-md-8 col-lg-4 col-sm-7 p-3 forms">
                    <Form onSubmit={async(e)=>{
                        e.preventDefault()
                        try{ 
                        if(!fistName||!secondName||!Email||!phone||!Password){
                            setMessage("Their is a filed which is empty Fist Name, Second Name, Email, Phone and Password");
                            setVariant("danger");
                            setShowError(!showError);
                        }
                        else{                         
                        const Response= await axios.post("http://localhost:4000/users/register",{
                            FirstName:fistName,
                            SecondName:secondName,
                            Email:Email,
                            PhoneNumber:phone,
                            Password:Password,
                            

                        })
                        const Message= (await Response).data.message;
                        const color = (await Response).data.variant;
                        setMessage(Message);
                        setVariant(color);
                        setShowError(!showError); 
                        console.log((await Response).data.message);
                        }
                        }
                        catch(error){
                            console.log(error.response.message);
                        }                       
                    }}>
                        <div className="col-12 d-flex align-items-center justify-content-center flex-column">
                           <img src={logo} alt="logo" className="logo"></img>
                           <h3>SignUp</h3>
                        </div>
                        <FormGroup className="row mt-1">
                            <FormGroup className="col-6">
                                <FormLabel style={{color:"#c2b302"}}>First Name:</FormLabel>
                                <FormControl className="input" onChange={(e)=>{setFirstName(e.target.value)}}></FormControl>
                            </FormGroup>
                            <FormGroup className="col-6">
                                <FormLabel style={{color:"#c2b302"}}>Second Name:</FormLabel>
                                <FormControl className="input" onChange={(e)=>{setSecondName(e.target.value)}}></FormControl>
                            </FormGroup>
                        </FormGroup> 
                        <FormGroup className="mt-1">
                            <FormLabel style={{color:"#c2b302"}}>Email:</FormLabel>
                            <FormControl className="input" onChange={(e)=>{setEmail(e.target.value)}} type="email"></FormControl>
                        </FormGroup> 
                        <FormGroup className="mt-1">
                            <FormLabel style={{color:"#c2b302"}}>Phone:</FormLabel>
                            <FormControl className="input" onChange={(e)=>{setPhone(e.target.value)}}></FormControl>
                        </FormGroup> 
                    <FormGroup className="row">
                        <FormGroup className="mt-1 col-6">
                            <FormLabel style={{color:"#c2b302"}}>Password:</FormLabel>
                            <InputGroup>
                              <FormControl className="input" type={eye1? "password":"text"} onChange={
                                (e)=>{
                                    setPassword(e.target.value);
                                    const PASSWORD_REGEX=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

                                    if(!PASSWORD_REGEX.test(Password)){
                                     setError(<p style={{color:"red"}}>password is weak!</p>)
                                    }
                                    else{
                                     setError(<p style={{color:"green"}}>password is strong!</p>)
                                    }
                                    }}></FormControl>
                              <InputGroup.Text className="text" style={{cursor:"pointer"}} onClick={()=>{setEye1(!eye1); setPassword1("text")}}><FontAwesomeIcon icon={eye1? faEyeSlash:faEye}></FontAwesomeIcon></InputGroup.Text>
                              <div>{error}</div>
                            </InputGroup>                            
                        </FormGroup> 
                        <FormGroup className="mt-1 col-6">
                           <FormLabel style={{color:"#c2b302"}}>Confirm Password:</FormLabel>
                           <InputGroup>
                            <FormControl className="input" type={eye2? "password":"text"} on onChange={
                                (e)=>{
                                    setConfirmPassword(e.target.value);
                                    if(Password===confirmPassword){
                                        setError2(<p style={{color:"green"}}>passwords much!</p>)
                                    }
                                    else{                                        
                                        setError2(<p style={{color:"red"}}>passwords don't much!</p>);                                    }
                                    }}
                                    ></FormControl>
                            <InputGroup.Text className="text" style={{cursor:"pointer"}} onClick={()=>{setEye2(!eye2); setPassword2("text")}}><FontAwesomeIcon icon={eye2? faEyeSlash:faEye}></FontAwesomeIcon></InputGroup.Text>
                            <div>{error2}</div>
                          </InputGroup>                            
                        </FormGroup>
                       </FormGroup>
                        <FormGroup className="col-12 d-flex align-items-center justify-content-center flex-column">
                            <Button className=" btn col-5 mt-3" type="submit">SUBMIT</Button>
                            <Link to="/Login"><span><u>Login instead?</u></span></Link>
                        </FormGroup>                    
                    </Form>
                </div>
            </div>
        </Container>
      </div>
    )
}
export default SignUp;