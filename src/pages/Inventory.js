import { useContext, useEffect, useState } from "react";
import { Container, Button, Form, FormControl, FormGroup, FormLabel, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import { ErrorMessage } from "../components/context";
import axios from "axios";


const Inventory=()=>{
    const[inputOne,SetInputOne]=useState();
    const[inputTwo,SetInputTwo]=useState();
    const[showPopUp,setShowPopUp]=useState(false);
    const[InventoryId,setInventoryId]=useState();
    const[QuantityNumber,setQuantityNumber]=useState();
    const[NameOfItem,setNameOfItem]=useState();
    const[row,setRow]=useState([]);
    const{setMessage,showError,setShowError,setVariant}=useContext(ErrorMessage);
    const get=async()=>{
        try{
            const Response= await axios.get('http://localhost:4000/Admin/mapInventory');
            const outcome=Response.data.items
            setRow(outcome);
            console.log(outcome);
        }
        catch(err){
          setMessage(err.message);
          setShowError(!showError);
          setVariant("danger");
        }
    }
    useEffect(()=>{
        get();
    },[])
    const submit=async(e)=>{
        e.preventDefault();
                try{                
                const Response=await axios.post('http://localhost:4000/Admin/inventory',{
                    nameOfItem:inputOne,
                    Quantity:inputTwo               
                });
                const message = Response.data.message;
                const variant=Response.data.variant;
                setMessage(message);
                setVariant(variant);
                setShowError(!showError);
                console.log(Response.data.items);
                window.location.reload();
                SetInputOne("");
                SetInputTwo("");
            }
            catch(err){
                setMessage(err.message);
                setShowError(!showError);
                setVariant("danger");
            }
    }
    return(
        <Container>
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-sm-12 col-lg-6">
                <Form className="row">
                  <h1>Inventory</h1>
                    <FormGroup className="col-6">
                        <FormLabel>Name of Item:</FormLabel>
                        <FormControl onChange={(e)=>{SetInputOne(e.target.value)}}></FormControl>
                    </FormGroup>
                    <FormGroup className="col-6">
                        <FormLabel>Quantity:</FormLabel>
                        <FormControl onChange={(e)=>{SetInputTwo(e.target.value)}}></FormControl>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-12 d-flex align-items-end justify-content-end mt-1">
                           <Button type="submit" onClick={submit} className="col-3">ADD ITEM</Button>
                        </div>
                    </FormGroup>
                </Form>
            </div> 
        </div>
        <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-12 col-md-8 col-sm-12 col-lg-6">
                <Table striped>
                    <thead className="table-dark">
                        <tr>
                            <th>Name of Item</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {row.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.NameOfItem}</td>
                                <td>{item.Quantity}</td>
                                <td><Button onClick={()=>{setShowPopUp(!showPopUp);setInventoryId(item.id);setQuantityNumber(item.Quantity);setNameOfItem(item.NameOfItem)}}>Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
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
                                <FormLabel><span style={{color:"red"}}>*</span>Name Of Item:</FormLabel>
                                <FormControl className="col-5" value={NameOfItem} onChange={(e)=>{setNameOfItem(e.target.value)}}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>User Name:</FormLabel>
                                <FormControl className="col-5" value={QuantityNumber} onChange={(e)=>{setQuantityNumber(e.target.value)}}></FormControl>
                            </FormGroup>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter className="ms-auto">
                     <Button onClick={async()=>{
                                    try{
                                        const id =InventoryId;
                                        const Response=await axios.delete(`http://localhost:4000/Admin/removeInventory/${id}`)
                                        const message=Response.data.message;
                                        const variant=Response.data.variant;
                                        setShowPopUp(!showPopUp)
                                        setMessage(message);
                                        setVariant(variant);
                                        setShowError(!showError);
                                        window.location.reload();
                                    }
                                    catch(err){
                                        setMessage(err.message);
                                        setShowError(!showError);
                                        setVariant("danger");
                                    }
                                }}>Delete Item</Button>
                     <Button onClick={
                        async()=>{
                        try{
                            const Response = await axios.patch("http://localhost:4000/Admin/updateInventoryItem",{
                                id:InventoryId,
                                NameOfItem:NameOfItem,
                                QuantityNumber:QuantityNumber                                
                            }) 
                            const message=Response.data.message;
                            const variant=Response.data.variant;
                            setShowPopUp(!showPopUp);
                            setMessage(message);
                            setVariant(variant);
                            setShowError(!showError);
                            window.location.reload();                            
                        }
                        catch(err){
                            setMessage(err.message);
                            setShowError(!showError);
                            setVariant("danger");
                        }
                     }}>update</Button>
                     <Button onClick={()=>{setShowPopUp(!showPopUp)}}>OK</Button>
                </ModalFooter>
                </Form>
            </Modal>
     </Container>
    );
}
export default Inventory;