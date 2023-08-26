import { useContext} from "react";
import "../css/ErrorComps.css";
import { ErrorMessage } from "./context";
const { Container, Alert, CloseButton } = require("react-bootstrap");

const ErrorCompass=()=>{
  const{Message,variant,showError,setShowError}=useContext(ErrorMessage);
  return(
    <Container fluid className="cont mt-3 d-flex align-items-center justify-content-center">
       <Alert variant={variant} className="col-10 d-flex justify-content-between cont2">
         {Message}
         <span onClick={()=>{setShowError(!showError);}}><CloseButton/></span>
       </Alert>             
    </Container>
  );
}
export default ErrorCompass;