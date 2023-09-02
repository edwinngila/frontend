import { Button, Container } from "react-bootstrap";


import img from '../img/company logo Dark.png';
import { Link } from "react-router-dom";

const UserDefault=()=>{
    return(
        <Container fluid>
            <div className="row d-flex justify-content-center" style={{backgroundColor:"#707e8b"}}>
                <div className="col-6 d-flex justify-content-center flex-column" style={{minHeight:"100vh"}}>
                  <div className="row">
                     <div className="col-12 d-flex justify-content-center">
                        <img src={img} alt="img" style={{height:"200px",width:"200px",borderRadius:"100px"}}></img>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-12">
                        <p style={{textAlign:"center",fontSize:"20px"}}>
                            click the button to send a notification to the Administrator so that you are given access to the system check your email so as to receive the access key from the Administrator
                        </p>
                     </div>
                  </div>
                  <div className="row mt-4">
                     <div className="col-12 d-flex justify-content-center mt-4">
                        <Link><Button className="col-5 m-3">Notify</Button></Link>
                        <Link><Button className="col-5 ml-2 m-3">Logout</Button></Link>
                     </div>
                  </div>
                </div>
            </div>            
        </Container>
    );
}
export default UserDefault;