import { Container} from "react-bootstrap";
import '../css/loder.css';
import video from '../video/loding page2.mp4'
const Loading=()=>{
    return(
        <Container fluid className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
            <video src={video} autoPlay loop className="size"></video>  
        </Container>
    );
}
export default Loading;