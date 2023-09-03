import { Button, Container, Image } from "react-bootstrap";
import '../css/Landing.css'
import logo from '../img/dc143c.png'
import { Link } from "react-router-dom";
const Landing=()=>{
    return(
        <Container fluid className="">
            <div className="row d-flex justify-content-around">
                <div className="col-12 col-md-12 col-sm-12 col-lg-12 welcome landing  d-flex justify-content-center align-items-center">
                    <div className="col-8 col-md-7 col-sm-6 col-lg-7 justify-content-center align-items-center mt-3 pt-5 pt-md-1 pt-sm-1 pt-lg-1">
                        <div className="flex-column page d-flex justify-content-center align-items-center">                            
                            <img src={logo} alt="logo" className="img"></img>
                            <h1 style={{color:'#d4c302'}} className="mt-4 headerTx">WELCOME TO JIRANI'S RESTAURANT MANAGEMENT SYSTEM</h1>
                            <p style={{color:"white"}} className="mt-1 bodyTx">
                                The system help in keeping track of daily sells done, items available to sell, tracks the sells done by every employee and tracks daily business expenses 
                            </p>                    
                            <div>
                                <div className="row d-flex justify-content-center align-items-center"> 
                                    <div className="offset-4">
                                        <Link to="/SignUp">
                                           <Button className="btn1 btn-lg m-1 col-6">Sign up</Button> 
                                        </Link> 
                                        <Link to="/Login">
                                           <Button className="btn1 btn-lg m-1 col-6">Log in</Button> 
                                        </Link> 
                                    </div>                         
                                </div>  
                           </div>          
                        </div>
                    </div>
                </div> 
            </div>                       
        </Container>
    )
}
export default Landing;