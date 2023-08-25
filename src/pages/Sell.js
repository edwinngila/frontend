import { Button, Container, FormControl,FormGroup,FormLabel,FormSelect,Table } from "react-bootstrap";
import logo from "../img/campany logo2.png"
import logo2 from "../img/company logo Dark.png";
import { useContext, useState } from "react";
import { Color } from "../components/context";
const SellsPage=()=>{
    const{bgColor}=useContext(Color);
    const dateToday=new Date()
    const[total]=useState(1200);
    const defaultRow={
        id:1,
        Quantity:<FormControl></FormControl>,
        Item:<FormControl></FormControl>,
        Price:<FormControl></FormControl>
    };   
    const[newRow,setNewRow]=useState([defaultRow]);
    const updateRow=(idToDelete)=>{
      const updateRow=newRow.filter(row=>row.id!==idToDelete);
      setNewRow(updateRow);
    }
    return(
        <Container>
           <div className="row d-flex justify-content-center alight-items-center">
                <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                    <div className="row d-flex justify-content-center alight-items-center">
                        <img src={bgColor? logo:logo2} alt="logo" style={{width:"30%",height:"30%"}}></img>
                    </div>
                        <Table responsive='sm' table-dark bordered style={{backgroundColor:"#707e8b"}}>
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={4}>Date: {dateToday.getDate()}/{dateToday.getMonth()}/{dateToday.getUTCFullYear()}</th>
                                </tr>
                                <tr>
                                    <th>Qty</th>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newRow.map(
                                    (row)=>(
                                    <tr key={row.id}>
                                        <td style={{width:"55px"}}>{row.Quantity}</td>
                                        <td>{row.Item}</td>
                                        <td>{row.Price}</td>
                                        <td>
                                            <Button
                                            onClick={()=>updateRow(row.id)}
                                            >Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="row mt-3">
                                <div className="col-7 col-md-6 col-sm-6 col-lg-6">
                                  <Button onClick={()=>{
                                    setNewRow([...newRow,
                                        {
                                            id:newRow.length+1,
                                            Quantity:<FormControl ></FormControl>,
                                            Item:<FormControl></FormControl>,
                                            Price:<FormControl></FormControl>
                                        }])
                                  }}>Add New Item</Button> 
                                </div>                                
                        </div>
                        <div className="row mt-3">
                        <div className="col-12 col-md-6 col-sm-9 col-lg-6">
                                        <p>Total price:
                                            <span style={{color:"crimson",fontSize:"20px"}}>{total}</span>ksh
                                        </p>
                                        <FormSelect className="col-12 col-md-10 col-sm-10 col-md-10">
                                            <option>select method of payment</option>
                                            <option>cash</option>
                                            <option>Mpesa</option>
                                        </FormSelect>
                                        <FormGroup className="mt-3">
                                            <FormLabel>Amount Given:</FormLabel>
                                            <FormControl></FormControl>
                                        </FormGroup>
                                    </div>
                        </div>
                      <div className="row mt-3">
                         <div className="col-12 d-flex align-items-end justify-content-end">
                            <Button className="col-5 col-md-3 col-lg-3 col-sm-3" size="md">check out items</Button>
                         </div>
                      </div>
                </div>
           </div>
        </Container>
    );
}
export default SellsPage