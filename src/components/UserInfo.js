import {Button, Container, Form, FormControl, FormGroup, ListGroup, ListGroupItem, Placeholder } from "react-bootstrap";
import prof from '../img/prof2.jpg'
import '../css/UserInfo.css'
import { useContext, useState } from "react";
import { ErrorMessage} from "./context";
import axios from "axios";
const UserInfo=()=>{
    const{setMessage,showError,setShowError,setVariant}=useContext(ErrorMessage);
    const retrieveItems = localStorage.getItem("item");
    const storedItems= JSON.parse(retrieveItems);
    const[firstName,setFirstName]=useState(storedItems.firstName);
    const[secondName,setSecondName]=useState(storedItems.SecondName);
    const[phoneNo,setPhoneNo]=useState(storedItems.phone);
    const[email,setEmail]=useState(storedItems.email);
    const[password,setPassword]=useState();
    const checkPassword=async()=>{
        try{
            const response=await axios.get("http://localhost:4000/users/userPassword",{
                password:password,
                userId:storedItems.userId
            })
            console.log(storedItems.userId);
            const message= response.data.message;
            const variant= response.data.variant;
            setMessage(message);
            setVariant(variant); 
            setShowError(!showError);
        }
        catch(error){
            setMessage(error.message);
            setShowError(!showError);
            setVariant("danger");
        }
    }
    const userInfo=async()=>{
        const updateInfo={
            ...storedItems,
            firstName:firstName,
            SecondName:secondName,
            phone:phoneNo,
            email:email,
            password:password
        }
        localStorage.setItem("item",JSON.stringify(updateInfo));
        try {
            const response=await axios.patch("http://localhost:4000/users/userInfo",{
                firstName:storedItems.firstName,
                SecondName:storedItems.SecondName,
                phone:storedItems.phone,
                email:storedItems.email,
                userId:storedItems.userId,
                password:password
            }) 
            const message= response.data.message;
            const variant= response.data.variant;
            setMessage(message);
            setVariant(variant); 
            setShowError(!showError);
                            
        } catch (error) {
            setMessage(error.message);
            setShowError(!showError);
            setVariant("danger");
        }
    }
    const PasswordFocus=()=>{
        setMessage("you need to enter your old or your password reset one time password to change your password");
        setShowError(!showError);
        setVariant("warning");
    }
    return(
        <Container fluid style={{borderRadius:"20px"}}>
            <div className="row d-flex align-items-center justify-content-center mt-2 rounded-3">
                <div className="col-11 col-md-7 col-lg-5 col-sm-8 bg-dark info" style={{borderRadius:"20px"}}>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center flex-column">
                            <img src={prof} alt={<Placeholder/>} className="img mt-4 img-thumbnail"></img>
                            <h2 style={{color:'white'}}>{firstName} {secondName}</h2>
                            <h5 style={{color:'gray'}}>{storedItems.userRole}</h5>
                        </div>
                    </div>
                   <div className="userInfo mt-2 p-1">
                      <Form>
                        <ListGroup className="items bg-dark">
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>User Role:</span>
                                        <span>{storedItems.userRole}</span>
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>First Name:</span>
                                        <span><FormControl value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} id="fname"></FormControl></span>
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>Second Name:</span>
                                        <span><FormControl value={secondName} onChange={(e)=>{setSecondName(e.target.value)}}></FormControl></span>
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>phone number:</span>
                                        <span><FormControl value={phoneNo} onChange={(e)=>{setPhoneNo(e.target.value)}}></FormControl></span>
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>Email:</span>
                                        <span><FormControl value={email} onChange={(e)=>{setEmail(e.target.value)}}></FormControl></span>
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>Password</span>
                                        <span>
                                            <FormControl onFocus={PasswordFocus} onChange={(e)=>{setPassword(e.target.value)}}></FormControl>
                                            <Button className="mt-3" onClick={checkPassword}>Check validity</Button>
                                        </span>
                                </ListGroupItem>
                            </ListGroup>
                            <FormGroup className="row">
                                <div className="col-12  d-flex justify-content-center align-items-center">
                                    <Button onClick={userInfo} className="btns mt-2 mb-2">Submit Changes</Button>                                
                                </div>
                            </FormGroup>  
                     </Form>          
                   </div>
                </div>
            </div>
        </Container>
    );
}
export default UserInfo;