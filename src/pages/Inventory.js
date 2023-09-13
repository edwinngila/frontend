/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Container, Button, Form, FormControl, FormGroup, FormLabel, Table } from "react-bootstrap";
import { ErrorMessage } from "../components/context";
import axios from "axios";


const Inventory=()=>{
    const[inputOne,SetInputOne]=useState();
    const[inputTwo,SetInputTwo]=useState();
    const[row,setRow]=useState([]);
    const{setMessage,showError,setShowError,setVariant}=useContext(ErrorMessage);
    return(
        <Container>
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-sm-12 col-lg-6">
                <Form onSubmit={
                async(e)=>{
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
                setRow(Response.data.items);
                console.log(Response.data.items);
                SetInputOne("");
                SetInputTwo("");
            }
            catch(err){
                setMessage(err.message);
                setShowError(!showError);
                setVariant("danger");
            }
    }} className="row">
                  <h1>Inventory</h1>
                    <FormGroup className="col-6">
                        <FormLabel>Name of Item:</FormLabel>
                        <FormControl value={inputOne} onChange={(e)=>{SetInputOne(e.target.value)}}></FormControl>
                    </FormGroup>
                    <FormGroup className="col-6">
                        <FormLabel>Quantity:</FormLabel>
                        <FormControl value={inputTwo} onChange={(e)=>{SetInputTwo(e.target.value)}}></FormControl>
                    </FormGroup>
                    <FormGroup className="row">
                        <div className="col-12 d-flex align-items-end justify-content-end mt-1">
                         <Button type="submit" className="col-3">ADD ITEM</Button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {row.map((item)=>(
                            <tr>
                                <td>{item.NameOfItem}</td>
                                <td>{item.Quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
     </Container>
    );
}
export default Inventory;