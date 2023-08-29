import { useContext} from "react";
import "../css/ErrorComps.css";
import { ErrorMessage } from "./context";
import img from '../img/favicon-32x32.png';
const { Container,Toast, ToastBody, ToastHeader,} = require("react-bootstrap");

const ErrorCompass=()=>{
  const{Message,variant,showError,setShowError}=useContext(ErrorMessage);
  return(
    <Container fluid className="cont mt-3 d-flex align-items-end justify-content-end">   
       <Toast onClose={()=>setShowError(!showError)} show={showError} delay={5000} autohide bg={variant}>
          <ToastHeader>
            <img src={img} alt="img"></img>
            <strong className="me-auto">Jiranis Restorant</strong>             
          </ToastHeader>
          <ToastBody>{Message}</ToastBody>
      </Toast>        
    </Container>
  );
}
export default ErrorCompass;