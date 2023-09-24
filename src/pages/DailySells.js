import { Card, Container, Form, FormControl, FormGroup, FormLabel, Table, Button, Placeholder } from "react-bootstrap";
import {ResponsiveBar} from '@nivo/bar';
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
    const[graphProps,setGraphProps]=useState([])
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
    const graphData=async()=>{
        try {
        const response = await axios.get("http://localhost:4000/Admin/graphSells")  
        setGraphProps(response.data.graphData);     
        } catch (error) {
            setMessage(error.message);
            setShowError(!showError);
            setVariant("danger");
        }
    }
    useEffect(()=>{
        getData();
        graphData();
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
                                            <td>{items.totalSell}</td>
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
                                            <td>{items.totalSell}</td>
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
        <ResponsiveBar
        data={graphProps.map((items)=>(
            {
                id:items.itemName,
                value:items.totalSell,
                foodNameColor:"hsl(106, 70%, 50%)"
            }
        ))}
        keys={graphProps.map((items)=>(
            [
              items.itemName
            ]
        ))}
        indexBy="id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        maxValue={row1.map((items)=>(
            items.totalSell+5
        ))}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'chapo&beef'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'chipo'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'number of times sold',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
       />
        </Container>
     </>
    )
}
export default Graph;