import { Card, Container, Form, FormControl, FormGroup, FormLabel, Table, Button, Placeholder } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line'
import Data from "../components/data"
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useContext, useEffect, useState } from "react";
import profit from '../img/chevron-arrow-up.png'
import { ErrorMessage } from "../components/context";
import axios from 'axios';
// import loss from '../img/chevron-arrow-down.png'
const Graph=()=>{
    const{setMessage,showError,setShowError,setVariant}=useContext(ErrorMessage);
    const[inputOne,SetInputOne]=useState();
    const[inputTwo,SetInputTwo]=useState();
    const[row1,setRow1]=useState([]);
    const[row2,setRow2]=useState([]);
    const[row,setRow]=useState([]);
    const[total,setTotal]=useState(0);
    const[dailyTotal,setDailyTotal]=useState([]);
    const getData=async()=>{
        try{
            const response=await axios.get("http://localhost:4000/Admin/DailyExpensesTable");
            setRow(response.data.TBdata);
            setTotal(response.data.sum);
            const response2=await axios.get("http://localhost:4000/Admin/DailySellsItems")
            setRow1(response2.data.items1);
            setRow2(response2.data.items2);
            setDailyTotal(response2.data.total);
        }
        catch(err){
            setMessage(err.message);
            setShowError(!showError);
            setVariant("danger");
        }
    }
    useEffect(()=>{
        getData();
    },[]);
    return(
     <>
     <Container>
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-sm-12 col-lg-6">
                <Form className="row" onSubmit={async(e)=>{
                    e.preventDefault();
                    try{
                        const result= await axios.post("http://localhost:4000/Admin/DailyExpenses",{
                            Expense:inputOne,
                            Cost:inputTwo
                        })
                        const message = result.data.message;
                        const variant= result.data.variant;
                        setMessage(message);
                        setVariant(variant);
                        setShowError(!showError);
                    }
                    catch(err){
                        setMessage(err.message);
                        setShowError(!showError);
                        setVariant("danger");
                    }
                    SetInputOne("");
                    SetInputTwo("");
                    window.location.reload();  
                }}>
                  <h1>Daily Expense</h1>
                    <FormGroup className="col-6">
                        <FormLabel>Name of Expense:</FormLabel>
                        <FormControl value={inputOne} onChange={(e)=>{SetInputOne(e.target.value)}}></FormControl>
                    </FormGroup>
                    <FormGroup className="col-6">
                        <FormLabel>Cost:</FormLabel>
                        <FormControl value={inputTwo} onChange={(e)=>{SetInputTwo(e.target.value)}}></FormControl>
                    </FormGroup>  
                    <FormGroup className="row">
                        <div className="col-12 mt-3 d-flex align-items-end justify-content-end">
                          <Button className="col-3" type="submit">ADD ITEM</Button>
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
                            <th>Name of Expense</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {row.map((items)=>(
                            <tr key={items.id}>
                               <td>{items.Name_of_Expense? items.Name_of_Expense:<Placeholder xs={12} size="lg" animation="wave"/>}</td>
                               <td>{items.Cost? items.Cost:<Placeholder xs={12} size="lg" animation="wave"/>}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="row d-flex align-items-end justify-content-end">
                    <div className="col-5">
                        <FormGroup>
                            <FormLabel>Total Expense:</FormLabel>
                            <FormControl value={total} readOnly></FormControl>
                        </FormGroup>
                    </div>
                </div>
            </div>
        </div>
     </Container>
        <Container fluid>
            <div className="row mt-2">
                <div className="col-12 col-lg-6 col-md-6 col-sm-12 mt-2">
                <Card className="p-2 bg-success" style={{color:"white"}}>
                    <CardHeader><h4>Daily sells</h4></CardHeader>
                    <div>
                        <h5>
                            The highest item bought today:
                            <Table className="mt-3">
                                <thead>
                                    <th>NAME</th>
                                    <th>TIMES SOLD</th>
                                </thead>
                                <tbody>
                                    {row1.map((items)=>(
                                        <tr>
                                            <td>{items.itemName}</td>
                                            <td>{items.numbers}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </h5>
                        <h5>
                            The lest item sold today:
                            <Table className="mt-3">
                                <thead>
                                    <th>NAME</th>
                                    <th>TIMES SOLD</th>
                                </thead>
                                <tbody>
                                {row2.map((items)=>(
                                        <tr>
                                            <td>{items.itemName}</td>
                                            <td>{items.numbers}</td>
                                        </tr>
                                ))}
                                </tbody>
                            </Table>
                        </h5>
                        <h5>Daily income:<span> </span><span style={{color:"#f8e401"}}>{dailyTotal.map((item)=>(item.price))}KSH</span></h5>
                    </div>
                </Card>
                </div>
                <div className="col-12 col-lg-6 col-md-6 col-sm-12 mt-3">
                <Card className="p-2  bg-dark " style={{color:"white"}}>
                    <CardHeader><h4>Daily income</h4></CardHeader>
                    <div>
                        <h5>Total Daily Expenses:<span> </span><span style={{color:"#f8e401"}}>{total} KSH</span></h5>
                        <h5>Daily Sells:<span> </span><span style={{color:"#f8e401"}}>{dailyTotal.map((item)=>(item.price))} KSH</span></h5>
                        <h5>Daily income:<span> </span><span style={{color:"#f8e401"}}>{dailyTotal.map((item)=>(item.price-total))} KSH</span></h5>
                        <h5>
                            <span>
                                <img src={profit} alt="profit"></img>
                                <span style={{color:"#41ff00"}}>+</span>
                            </span>
                            <span style={{color:"#41ff00"}}> 400 ksh profit</span>
                            <span> </span>
                            compared to yesterday
                        </h5>
                    </div>
                </Card>
                </div>
            </div>
            <div className="row mt-2 mb-3">
                <div className="col-12 col-lg-6 col-md-6 col-sm-12 mt-2">
                <Card className="p-2 bg-warning" style={{color:"white"}}>
                    <CardHeader><h4>Monthly Income</h4></CardHeader>
                    <div>
                        <h5>
                            Monthly income:
                        </h5>
                        <h5>
                            Monthly profit:
                        </h5>
                        <h5>
                            Monthly Expenses:
                        </h5>
                    </div>
                </Card>
                </div>
                <div className="col-12 col-lg-6 col-md-6 col-sm-12 mt-2">
                <Card className="p-2 bg-info" style={{color:"white"}}>
                    <CardHeader><h4>Yearly Income</h4></CardHeader>
                    <div>
                        <h5>
                            Yearly income:
                        </h5>
                        <h5>
                            Yearly profit:
                        </h5>
                        <h5>
                            Yearly Expenses:
                        </h5>
                    </div>
                </Card>
                </div>
            </div>
        </Container>
        <Container fluid className="col-12 col-md-12" style={{minHeight:"90vh"}}>
            <ResponsiveLine
            data={Data}
            margin={{ top: 50, right: 50, bottom: 90, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'right',
                    direction: 'row',
                    justify: false,
                    translateX: 40,
                    translateY: 300,
                    itemsSpacing: 5,
                    itemDirection: 'left-to-right',
                    itemWidth: 79,
                    itemHeight: 15,
                    itemOpacity: 0.75,
                    symbolSize: 17,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            motionConfig={{
                mass: 1,
                tension: 170,
                friction: 26,
                clamp: false,
                precision: 0.01,
                velocity: 0
            }}
        />
        </Container>
     </>
    )
}
export default Graph;