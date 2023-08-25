/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Container, Form, FormControl, FormGroup, FormLabel, Button, Table} from "react-bootstrap";

const FoodAvailable=()=>{
    // eslint-disable-next-line no-unused-vars
    const[inputOne,SetInputOne]=useState();
    const[inputTwo,SetInputTwo]=useState();
    return(
        <Container>
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-sm-12 col-lg-6">
                <Form className="row">
                  <h1>Food Available</h1>
                    <FormGroup className="col-6">
                        <FormLabel>Name of Food:</FormLabel>
                        <FormControl onChange={(e)=>{SetInputOne(e.target.value)}}></FormControl>
                    </FormGroup>
                    <FormGroup className="col-6">
                        <FormLabel>Cost:</FormLabel>
                        <FormControl onChange={(e)=>{SetInputTwo(e.target.value)}}></FormControl>
                    </FormGroup>
                </Form>
                <div className="row d-flex align-items-end justify-content-end">
                   <div className="col-5 mt-3 d-flex align-items-end justify-content-end">
                      <Button>ADD ITEM</Button>
                   </div>
                </div>
            </div> 
        </div>
        <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-12 col-md-8 col-sm-12 col-lg-6">
                <Table striped>
                    <thead className="table-dark">
                        <tr>
                            <th>Name of Food</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>water</td>
                            <td>200ksh</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
     </Container>
    );
}
export default FoodAvailable;