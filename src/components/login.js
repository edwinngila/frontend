import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import '../css/Login.css'
import logo from '../img/dc143c.png'
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const Login=()=>{
    const[Email,setEmail]=useState('');
    const[Password,setPassword]=useState('');  
    // const[token,setToken]=useState()
    return(
        <Container fluid className="mt-5">
           <div className="row d-flex justify-content-center align-items-center">
             <div className="col-11 col-md-4 col-sm-7 col-lg-4 form">
                    <div className="row">
                       <div className="img2"></div>
                    </div>
                <Form className="p-1" onSubmit={
                    async(e)=>{
                        e.preventDefault();
                        try{
                           const Response= axios.post("http://localhost:4000/users/login",{
                               Email:Email,
                               Password:Password
                           })
                           console.log((await Response).data)
                           const userToken = (await Response).data.token;
                           localStorage.setItem('token',userToken);
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
                            <FormControl className="input" type="password" onChange={(e)=>{setPassword(e.target.value)}}></FormControl>
                        </FormGroup>
                        <FormGroup className="col-12 d-flex align-items-center justify-content-center flex-column">
                             <Button className="col-5 mt-4 btn1" type="submit">Login</Button>
                             <Link to="/SignUp">
                                <span className="mt-2"><u>SignUp instead?</u></span>
                             </Link>
                        </FormGroup>
                </Form>
             </div>
           </div>
        </Container>
    )
}
export default Login;