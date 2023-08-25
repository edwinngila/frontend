import {Button, Container, Form, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import prof from '../img/prof2.jpg'
import '../css/UserInfo.css'
import { useState } from "react";
const UserInfo=()=>{
    const[firstName,setFirstName]=useState('Edwin');
    const[secondName,setSecondName]=useState('Ngila');
    const[phoneNo,setPhoneNo]=useState('0704922743');
    const[email,setEmail]=useState('edwinngila54@gmail.com');
    return(
        <Container fluid style={{borderRadius:"20px"}}>
            <div className="row d-flex align-items-center justify-content-center mt-2 rounded-3">
                <div className="col-11 col-md-4 col-lg-4 col-sm-4 bg-dark info" style={{borderRadius:"20px"}}>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center flex-column">
                            <img src={prof} alt="prof" className="img mt-4 img-thumbnail"></img>
                            <h2 style={{color:'white'}}>{firstName} {secondName}</h2>
                            <h5 style={{color:'gray'}}>Admin</h5>
                        </div>
                    </div>
                   <div className="userInfo mt-2 p-1">
                      <Form>
                        <ListGroup className="items bg-dark">
                                <ListGroupItem className="bg-dark list d-flex justify-content-between">
                                        <span>User Roll:</span>
                                        <span>Admin</span>
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
                            </ListGroup>
                            <div className="row">
                                <div className="col-12  d-flex justify-content-center align-items-center">
                                    <Button className="btns mt-2 mb-2">Submit Changes</Button>                                
                                </div>
                            </div>  
                     </Form>          
                   </div>
                </div>
            </div>
        </Container>
    );
}
export default UserInfo;