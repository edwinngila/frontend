import { Button, Container, Nav, NavLink} from "react-bootstrap"
import img from '../img/dc143c.png'
import home from '../img/home (1).png'
import user from '../img/user.png'
import money from '../img/money.png'
import shop from '../img/shop.png'
import food from '../img/restaurant.png'
import cahier from '../img/cashier-machine (3).png'
import close from '../img/close (1).png'
import '../css/Navigation.css'
import { useContext } from "react"
import { ToggleMenu } from "./context"
import { Link } from "react-router-dom"
const Navigation=()=>{
    const{toggleMenu,SetToggleMenu}=useContext(ToggleMenu)
    return(
        // !!the navigation bar
    <Container fluid style={{position:"fixed",zIndex:"2",margin:"0px",padding:"0px"}} show={false}>   
    <div className="row ">      
      <div className="col-9 col-lg-3 col-md-5 col-sm-6 col-xs-12 col-xxs-10 bg-dark links">
            <div className="row">
                <div className="col-9 d-flex align-items-end justify-content-end"><img src={img} alt="img" className="img col-12"></img></div>
                <div className="col-3 mt-3"><Button onClick={()=>{SetToggleMenu(!toggleMenu)}}><img src={close} alt="close" className="close"></img></Button></div>
            </div>
            <div className="row">
                <Nav className="linksItems flex-column mt-1">
                    <NavLink className="mt-4">
                    <Link to="/Home" style={{textDecoration:"none",color:"white"}} onClick={()=>{SetToggleMenu(!toggleMenu)}}>                        
                        <img src={home} alt="-"></img>
                        <span> Home</span>                     
                    </Link>
                    </NavLink>
                    <NavLink className="mt-4">
                    <Link to="/users"style={{textDecoration:"none",color:"white"}} onClick={()=>{SetToggleMenu(!toggleMenu)}}>                        
                        <img src={user} alt="-"></img>
                        <span> Users</span>
                    </Link>
                    </NavLink>
                    <NavLink className="mt-4">
                    <Link to="/SellsPage" style={{textDecoration:"none",color:"white"}} onClick={()=>{SetToggleMenu(!toggleMenu)}}>
                        <img src={cahier} alt="-"></img>
                        <span> Sell</span>
                    </Link>
                    </NavLink>
                    <NavLink className="mt-4">
                    <Link to="/Daily" style={{textDecoration:"none",color:"white"}} onClick={()=>{SetToggleMenu(!toggleMenu)}}>
                        <img src={money} alt="-"></img>
                        <span> Daily</span>
                    </Link>
                    </NavLink>
                    <NavLink className="mt-4">
                    <Link to="/Inventory" style={{textDecoration:"none",color:"white"}} onClick={()=>{SetToggleMenu(!toggleMenu)}}>
                        <img src={shop} alt="-"></img>
                        <span> Inventory</span>
                    </Link>
                    </NavLink>
                    <NavLink className="mt-4">
                    <Link to="/FoodAvailable" style={{textDecoration:"none",color:"white"}} onClick={()=>{SetToggleMenu(!toggleMenu)}}>
                        <img src={food} alt="-"></img>
                        <span> Food Available</span>
                    </Link>
                    </NavLink>
                </Nav>
            </div>
      </div>
        <div className="col-4 col-lg-9 col-md-7 col-sm-8 col-xs-2 col-xxs-2 bg-dark opacity">
            
        </div>
    </div>
   </Container>
    )
}
export default Navigation;