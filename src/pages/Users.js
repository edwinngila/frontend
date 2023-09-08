import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "react-bootstrap"
import axios from 'axios';

const Users=()=>{
    const[dbOutCome,setDbOutCome]=useState([]);
    const[showPopUp,setShowPopUp]=useState(true);
    const[userName,setUserName]=useState();
    const[Email,setEmail]=useState();
    const[phone,setPhone]=useState();
    const[role,setRole]=useState();
    const[id,setId]=useState();
    const[visibility,setVisibility]=useState(true);
    const get=async()=>{
        const results= await axios.get('http://localhost:4000/Admin/usersFromDB');
        const outcome=results.data.from
        setDbOutCome(outcome);
        // outcome.from.forEach(element => {
        // const FirstName=element.FirstName;
        // const SecondName=element.SecondName;
        // const Email=element.Email;
        // const PhoneNumber=element.PhoneNumber;
        
        // });
    }
    useEffect(()=>{
        get();
    },[])
    const popups=(userId)=>{
        const id=userId-1;
        const user=dbOutCome[id];
        setId(userId);
         setUserName(user.FirstName+user.SecondName);
         setEmail(user.Email);
         setPhone(user.PhoneNumber);
         if(user.roleId===1){
            setRole("worker");
            setShowPopUp(!showPopUp);
         }
         else if(user.roleId===2){
            setRole("Administrator");
            setShowPopUp(!showPopUp);
         }
         else if(user.roleId===3){
            setRole("NormalUser");
            setShowPopUp(!showPopUp);
         }
         else{
            setRole("Super Admin");
         }
    }
    return(
        <Container className="mt-3">
            <div className="row">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roll</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dbOutCome.map(
                        (items)=>(
                        <tr key={items.id}>
                            <td>{items.id}</td>
                            <td>{items.FirstName}{items.SecondName}</td>
                            <td>{items.Email}</td>
                            <td>{
                                items.roleId===1 ?(<span>Administrator</span>):
                                items.roleId===2 ?(<span>worker</span>):
                                items.roleId===3 ?(<span>NormalUser</span>):
                                (<span>SuperAdmin</span>)
                            }</td>
                            <td><Button onClick={()=>{popups(items.id)}} className="m-1">View</Button></td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
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
                          <p className="text-warning"><span className="text-warning">*</span>The text should be one word only answer</p>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>User Id:</FormLabel>
                                <FormControl className="col-5" value={id} readOnly></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>User Name:</FormLabel>
                                <FormControl className="col-5" value={userName} readOnly></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>User Phone Number:</FormLabel>
                                <FormControl className="col-5" value={phone} readOnly></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>Email:</FormLabel>
                                <FormControl className="col-5" value={Email} readOnly></FormControl>
                            </FormGroup>
                            <FormGroup style={{display:visibility? "none":"block"}}>
                                <FormLabel><span style={{color:"red"}}>*</span>	Roll:</FormLabel>
                                <FormSelect>
                                    <option selected>{role}</option>
                                    <option value={1}>worker</option>
                                    <option value={2}>Administrator</option>
                                    <option value={3}>NormalUser</option>
                                </FormSelect>
                            </FormGroup>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter className="ms-auto">
                     <Button>Delete User</Button>
                     <Button onClick={()=>{setShowPopUp(!showPopUp)}}>OK</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </Container>
    )
}
export default Users;