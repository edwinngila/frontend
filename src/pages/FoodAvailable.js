import { useContext, useEffect, useState } from "react";
import { Container, Button, Form, FormControl, FormGroup, FormLabel, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import { ErrorMessage } from "../components/context";
import axios from "axios";


const FoodAvailable=()=>{
    const[inputOne,SetInputOne]=useState();
    const[inputTwo,SetInputTwo]=useState();
    const[showPopUp,setShowPopUp]=useState(false);
    const[NameItem,setNameItem]=useState();
    const[FoodAvailableId,setFoodAvailableId]=useState();
    const[Cost,setCost]=useState();
    const[row,setRow]=useState([]);
    const{setMessage,showError,setShowError,setVariant}=useContext(ErrorMessage);
    const get=async()=>{
        try{
            const Response= await axios.get('http://localhost:4000/Admin/mapFoodAvailable');
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
                const Response=await axios.post('http://localhost:4000/Admin/FoodAvailable',{
                    nameOfFood:inputOne,
                    Cost:inputTwo               
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
                  <h1>FoodAvailable</h1>
                    <FormGroup className="col-6">
                        <FormLabel>Name of Food:</FormLabel>
                        <FormControl onChange={(e)=>{SetInputOne(e.target.value)}}></FormControl>
                    </FormGroup>
                    <FormGroup className="col-6">
                        <FormLabel>Cost:</FormLabel>
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
                            <th>Name of Food</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {row.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.NameOfFood}</td>
                                <td>{item.Cost}</td>
                                <td><Button onClick={()=>{
                                    setShowPopUp(!showPopUp);
                                    setFoodAvailableId(item.id);
                                    setCost(item.Cost);
                                    setNameItem(item.NameOfFood);}}>Edit</Button>
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
                                <FormLabel><span style={{color:"red"}}>*</span>Name of Food:</FormLabel>
                                <FormControl className="col-5" value={NameItem} onChange={(e)=>{setNameItem(e.target.value)}}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel><span style={{color:"red"}}>*</span>Cost:</FormLabel>
                                <FormControl className="col-5" value={Cost} onChange={(e)=>{setCost(e.target.value)}}></FormControl>
                            </FormGroup>
                        </Form>
                    </div>
                </ModalBody>
                <ModalFooter className="ms-auto">
                     <Button onClick={async()=>{
                                    try{
                                        const id =FoodAvailableId;
                                        const Response=await axios.delete(`http://localhost:4000/Admin/removeFoodAvailableId/${id}`)
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
                            const Response = await axios.patch("http://localhost:4000/Admin/updateFoodAvailable",{
                                id:FoodAvailableId,
                                NameOfFood:NameItem,
                                Cost:Cost                                
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
export default FoodAvailable;