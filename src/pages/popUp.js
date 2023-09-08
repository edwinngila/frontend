import { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { ErrorMessage } from "../components/context";
import img from '../img/company logo Dark.png'

const PopUp=({amount,methodOfPay,total})=>{
    return(
        <Container>
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-5 p-4">
                     <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-12 d-flex align-items-center justify-content-center flex-column">
                             <img src={img} alt="img" style={{width:"200px",height:"200px",borderRadius:"100px"}}></img>
                             <h3>SALE</h3>
                        </div>
                     </div>
                    <div>
                        <h4 style={{color:'#f8e401'}} className="mt-3 d-flex justify-content-between">
                            <span>Amount Given:</span><span style={{color:'#dc143c'}}>{amount} KSH</span>
                        </h4>
                        <h4 style={{color:'#f8e401'}} className="mt-3 d-flex justify-content-between">
                            <span>Total:</span><span style={{color:'#dc143c'}}>{total} KSH</span>
                        </h4>
                        <h4 style={{color:'#f8e401'}} className="mt-3 d-flex justify-content-between">
                            <span>Change:</span><span style={{color:'#dc143c'}}>{amount-total} KSH</span>
                        </h4>
                        <h4 style={{color:'#f8e401'}} className="mt-3 d-flex justify-content-between">
                            <span>Payment Method:</span><span style={{color:'#dc143c'}}>{methodOfPay}</span>
                        </h4>
                    </div>
            </div>
        </div>
        </Container>
    )
}
export default PopUp;