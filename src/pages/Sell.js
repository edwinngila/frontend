import { Button, Container, FormControl,FormGroup,FormLabel,FormSelect,Table } from "react-bootstrap";
import logo from "../img/campany logo2.png"
import logo2 from "../img/company logo Dark.png";
import { useContext, useState } from "react";
import axios from 'axios';
import { Color, ErrorMessage } from "../components/context";
import PopUp from "./popUp";
const SellsPage=()=>{
    const dateToday=new Date()
    const{setMessage,showError,setShowError,setVariant,popUp,setPopup}=useContext(ErrorMessage);
    const[inputPrice,setInputPrice]=useState(false);
    const[amount,setAmount]=useState();
    const defaultData={
        id:1,
        Quantity:'',
        Item:'',
        Price:''
    }
    const[dataItems,setDataItems]=useState([defaultData]);
    const defaultRow={
        id:0,
        Quantity:<FormControl onChange={(e)=>{dataItems[0].Quantity=e.target.value}}></FormControl>,
        Item:<FormControl onChange={(e)=>{dataItems[0].Item=e.target.value}}></FormControl>,
        Price:<FormControl onChange={(e)=>{dataItems[0].Price=e.target.value;setInputPrice(!inputPrice)}}></FormControl>
    };   
    const[newRow,setNewRow]=useState([defaultRow]);
    
    const updateRow=(idToDelete)=>{
      const updateRow=newRow.filter(row=>row.id!==idToDelete);
      setNewRow(updateRow);
    }
    const[methodOfPay,setMethodOfPay]=useState('')
    const retrieveItems = localStorage.getItem("my_theme");
    const storedItems= JSON.parse(retrieveItems);
    const[total,setTotal]=useState(0);
    const calculate=()=>{
      let totalCost=0;
      dataItems.forEach(async(price)=>{
        totalCost+=price.Quantity*price.Price
      })
      setTotal(totalCost);
    }
    const sendTo=async()=>{
        try{
              const response=axios.post("http://localhost:4000/Admin/sell",{
                data:dataItems,
                methodOfPay:methodOfPay
              });
              const message=(await response).data.message;
              const variant=(await response).data.variant;
              setMessage(message);  
              setVariant(variant);            
              setShowError(!showError);
              if(variant==="success"){
                calculate();
                setPopup(!popUp);
                setTimeout(() => {
                    setPopup(!popUp);
                    window.location.reload();
                  }, 2700);
              }
        }
        catch(err){
            setMessage(err.message);  
            setVariant("danger");            
            setShowError(!showError);
        }
    }
    
    return(
        <>
    {popUp?
        <Container>
           <div className="row d-flex justify-content-center alight-items-center">
                <div className="col-12 col-lg-6 col-md-6 col-sm-12">
                    <div className="row d-flex justify-content-center alight-items-center">
                        <img src={storedItems==="true"? logo2:logo} alt="logo" style={{width:"30%",height:"30%"}}></img>
                    </div>
                        <Table responsive='sm' table-dark bordered style={{backgroundColor:"#707e8b"}}>
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={4}>Date: {dateToday.getDate()}/{dateToday.getMonth()}/{dateToday.getUTCFullYear()}</th>
                                </tr>
                                <tr>
                                    <th>Qty</th>
                                    <th>Item</th>
                                    <th>Price of one</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newRow.map(
                                    (row)=>(
                                    <tr key={row.id}>
                                        <td style={{width:"60px"}}>{row.Quantity}</td>
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
                                   dataItems.push(
                                        {
                                            id:dataItems.length+1,
                                            Quantity:'',
                                            Item:'',
                                            Price:''
                                        }
                                    )
                                    console.log(dataItems);
                                    setNewRow([...newRow,
                                        {
                                            id:newRow.length-1,
                                            Quantity:<FormControl onChange={(e)=>{dataItems[dataItems.length-1].Quantity=e.target.value;setInputPrice(!inputPrice)}}></FormControl>,
                                            Item:<FormControl onChange={(e)=>{dataItems[dataItems.length-1].Item=e.target.value}}></FormControl>,
                                            Price:<FormControl onChange={(e)=>{dataItems[dataItems.length-1].Price=e.target.value}}></FormControl>
                                    }]);
                                    console.log(dataItems);
                                  }}>Add New Item</Button> 
                                </div>                                
                        </div>
                        <div className="row mt-3">
                        <div className="col-12 col-md-6 col-sm-9 col-lg-6">
                                        <FormSelect onChange={
                                            (e)=>{
                                            setMethodOfPay(e.target.value);
                                            }} className="col-12 col-md-10 col-sm-10 col-md-10">
                                            <option>select method of payment</option>
                                            <option value='CASH'>cash</option>
                                            <option value='MPESA'>M-pesa</option>
                                        </FormSelect>
                                        <FormGroup className="mt-3">
                                            <FormLabel>Amount Given:</FormLabel>
                                            <FormControl onChange={(e)=>{setAmount(e.target.value)}}></FormControl>
                                        </FormGroup>
                                    </div>
                        </div>
                      <div className="row mt-3">
                         <div className="col-12 d-flex align-items-end justify-content-end">
                            <Button className="col-5 col-md-3 col-lg-3 col-sm-3" size="md" onClick={sendTo}>check out items</Button>
                         </div>
                      </div>
                </div>
           </div>
        </Container>
        :<PopUp amount={amount} methodOfPay={methodOfPay} total={total}/>}
    </>
    );
}
export default SellsPage