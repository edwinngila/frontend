import {Button, Container,Dropdown,Nav, NavLink, OverlayTrigger, Popover, PopoverBody, PopoverHeader } from "react-bootstrap"
import '../css/TopIcons.css'
// import userDefault from '../img/user (2).png'
import user1 from '../img/prof2.jpg'
import bell from '../img/bell.png'
import bell2 from '../img/bell (2).png'
import sun from '../img/sun.png'
import moon from '../img/moon (2).png'
import menu from '../img/menu (1).png'
import menu2 from '../img/menu (2).png'
import Users from '../img/user.png'
import logOut from '../img/logout (1).png'
import {useState } from "react"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"
import DropdownMenu from "react-bootstrap/esm/DropdownMenu"
import {Link} from 'react-router-dom'
import { useContext,useEffect} from "react"
import { Color, ToggleMenu} from "./context";
// import Main from "../pages/main"

const TopIcons=()=>{
    const[user]=useState(user1);
    const[notification]=useState(2);
    const{bgColor,setBgColor}=useContext(Color) 
    const{toggleMenu,SetToggleMenu}=useContext(ToggleMenu)      
    const[toggle]=useState(true);
    return(
        
        <Container fluid className={`${bgColor==='true'?"bgColor":"bg-light"}`}>
            <useContext value={toggle}>
            <Nav className=" d-flex justify-content-between align-items-center">
               <div className="search col-7 col-md-6 col-sm-6 col-lg-6 d-flex" style={{display:"none"}}>
                    <Button className="navbar-toggler" onClick={()=>{SetToggleMenu(!toggleMenu)}} type="button"style={{backgroundColor:"transparent"}}>
                        <img src={bgColor==='true'? menu:menu2} alt="menu" className="p-2 "></img> 
                    </Button>
                </div>
                {/* <div className="collapsex">
                    <Main
                    toggle={toggle}
                    setToggle={setToggle}
                    />
                </div> */}
                <div className="d-flex align-items-center flex-row">
                    <OverlayTrigger
                    trigger='click'
                    placement="bottom"
                    overlay={
                        <Popover className="col-5">
                            <PopoverHeader className="header">Notification</PopoverHeader>
                                <PopoverBody>
                                    <div>You have no notifications</div>                                                                
                                </PopoverBody>
                        </Popover>
                    }                 
                    >
                        <NavLink className="d-flex"><img src={bgColor==='true'? bell2:bell} alt="notification"></img>
                        <span className="red">{notification}</span></NavLink>
                    </OverlayTrigger>
                    <Dropdown className="col-1">
                        <DropdownToggle>
                            <img src={Users} alt="search"></img>
                        </DropdownToggle>
                        <DropdownMenu className="p-2" style={{width:"250px"}}>
                            <NavLink className="item" style={{color:"black"}}>
                              <Link to="/UserInfo" style={{textDecoration:"none",color:"black"}}>                                
                                <img src={user} alt="user" className="img-thumbnail thumbnail" style={{borderRadius:'100px'}}></img> Edwin Ngila
                              </Link>
                            </NavLink>
                            <NavLink className="item">
                                <img src={logOut} alt="logOut"></img> Logout
                            </NavLink>
                            <NavLink className="item" onClick={()=>{if(bgColor==='true'){setBgColor("false")}else{setBgColor("true")}}}>
                                <img src={bgColor==='true'? sun:moon} alt="toggle"></img> {bgColor==='true'? "light":"dark"}
                            </NavLink>                                                      
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Nav>
            </useContext>
        </Container>
    )
}
export default TopIcons;