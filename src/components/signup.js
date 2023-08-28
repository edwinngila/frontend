import {Button,Container, Form, FormControl, FormGroup, FormLabel, InputGroup} from "react-bootstrap"
import '../css/signup.css'
import logo from '../img/dc143c.png'
import { useContext, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import { ErrorMessage } from "./context";
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
    const{setMessage,showError,setShowError,setVariant,login,setLogin}=useContext(ErrorMessage);
    const history=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{ 
        if(Password!==confirmPassword){
            setError2(<p className="text-danger">passwords don't much!</p>);                            
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
        if(color==="success"){
            const times=()=>setTimeout(()=>{history("/Loader")},2000);
            times();
            setLogin(!login);
            return clearTimeout(times);
        }
        }
        }
        catch(error){
            console.log(error.response.message);
        }                       
    }
    const handleChange =(e)=>{
        setPassword(e.target.value);
        const PASSWORD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

        if(!PASSWORD_REGEX.test(Password)){
         setError(<p className="text-danger">password is weak!</p>);
        }
        else{
         setError(<p className="text-success">password is strong!</p>);
        }
        }
    return(     
    <div>     
        <Container fluid style={{zIndex:"1"}}>
         {/* <ErrorComps showError={showError} setShowError={setShowError}/> */}
            <div className="row d-flex align-items-center justify-content-center mt-2" style={{zIndex:"2"}}> 
                <div className="col-11 col-md-7 col-lg-5 col-sm-10 forms">
                  <div className="row">                    
                  <div className="col-12 d-flex align-items-center justify-content-center flex-column img2">
                        <img src={logo} alt="logo" className="logo mt-2"></img>
                        <h3>SignUp</h3>
                    </div>
                    <Form onSubmit={handleSubmit} className="col-12 col-md-12 col-sm-12 col-lg-12 p-3 ">
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
                              <FormControl className="input" type={eye1? "password":"text"} onChange={handleChange}></FormControl>
                              <InputGroup.Text className="text" style={{cursor:"pointer"}} onClick={()=>{setEye1(!eye1); setPassword1("text")}}><FontAwesomeIcon icon={eye1? faEyeSlash:faEye}></FontAwesomeIcon></InputGroup.Text>
                             
                            </InputGroup>   
                          <div>{error}</div>                         
                        </FormGroup> 
                        <FormGroup className="mt-1 col-6">
                           <FormLabel style={{color:"#c2b302"}}>Confirm Password:</FormLabel>
                           <div className="row">
                            <InputGroup className="col-12">
                                <FormControl className="input" type={eye2? "password":"text"} onChange={(e)=>{setConfirmPassword(e.target.value);setError2("");}}></FormControl>
                                <InputGroup.Text className="text" style={{cursor:"pointer"}} onClick={()=>{setEye2(!eye2); setPassword2("text")}}><FontAwesomeIcon icon={eye2? faEyeSlash:faEye}></FontAwesomeIcon></InputGroup.Text>
                            </InputGroup>   
                            <div className="col-12">
                                {error2}
                            </div>  
                          </div>                       
                        </FormGroup>
                       </FormGroup>
                       <div className="passwordText">Use 8 characters or more with a mix of letters,numbers and one upper case letter</div>
                        <FormGroup className="col-12 d-flex align-items-center justify-content-center flex-column ">
                            <Button className=" btn col-5" type="submit">SUBMIT</Button>
                            <Link to="/Login"><span><u>Login instead?</u></span></Link>
                        </FormGroup>                    
                    </Form>
                 </div>
                </div>
            </div>
        </Container>
      </div>
    )
}
export default SignUp;