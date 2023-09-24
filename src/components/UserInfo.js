import {Button, Container, Form, FormControl, FormGroup, FormLabel, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Placeholder } from "react-bootstrap";
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
    const[showPopUp,setShowPopUp]=useState(false)
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
                <div className="col-11 col-md-7 col-lg-4 col-sm-8 bg-dark info" style={{borderRadius:"20px"}}>
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
                                        <span>{firstName}</span>
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>Second Name:</span>
                                        <span>{secondName}</span>
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>phone number:</span>
                                        <span>{phoneNo}</span>
                                </ListGroupItem>
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>Email:</span>
                                        <span>{email}</span>
                                </ListGroupItem>
                            </ListGroup>
                            <FormGroup className="row">
                                <div className="col-12  d-flex justify-content-center align-items-center">
                                    <Button onClick={()=>{setShowPopUp(!showPopUp)}} className="btns mt-2 mb-2">Edit information</Button>                                
                                </div>
                            </FormGroup>  
                     </Form>          
                   </div>
                </div>
            </div>
            <Modal
             show={showPopUp}
             backdrop="static"
             keyboard={true}
            >
                <ModalHeader>
                    <h2>USER INFORMATION</h2>
                </ModalHeader>
                <Form>
                <ModalBody>
                    <div className="row d-flex justify-content-center align-items-center">
                        <Form className="col-12">
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>User Id:</FormLabel>
                                <FormControl className="col-5" value={firstName} ></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>User Name:</FormLabel>
                                <FormControl className="col-5" value={secondName} ></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>User Phone Number:</FormLabel>
                                <FormControl className="col-5" value={phoneNo} ></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>Email:</FormLabel>
                                <FormControl className="col-5" value={email} ></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>upload profile img:</FormLabel>
                                <FormControl type="file"></FormControl>
                            </FormGroup>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter className="ms-auto">
                     <Button>Change password</Button>
                     <Button onClick={()=>{setShowPopUp(!showPopUp);window.location.reload()}}>update User</Button>
                     <Button onClick={()=>{setShowPopUp(!showPopUp)}}>clear</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </Container>
    );
}
export default UserInfo;