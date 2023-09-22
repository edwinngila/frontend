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
import trash from '../img/trash-can.png';
import {useState } from "react"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"
import DropdownMenu from "react-bootstrap/esm/DropdownMenu"
import {Link, useNavigate} from 'react-router-dom'
import { useContext,useEffect} from "react"
import { Color, ErrorMessage, ToggleMenu} from "./context"
import axios from "axios"
// import Main from "../pages/main"

const TopIcons=()=>{
    const[user]=useState(user1);
    const outcome=JSON.parse(localStorage.getItem("notification"));
    const Array=[outcome];
    const[notification,setNotification]=useState();
    const{bgColor,setBgColor}=useContext(Color) 
    const{toggleMenu,SetToggleMenu}=useContext(ToggleMenu)      
    const[toggle]=useState(true);
    const retrieveItems = localStorage.getItem("my_theme");
    const storedItems= JSON.parse(retrieveItems);
    const userRetrieveItems = localStorage.getItem("item");
    const userStoredItems= JSON.parse(userRetrieveItems);
    const userEmail=userStoredItems.email;
    const history=useNavigate();
    const{setMessage,showError,setShowError,setVariant}=useContext(ErrorMessage);
    const clearLogin=async()=>{
        try{
            const response=axios.delete(`http://localhost:4000/users/logout/${userEmail}`)
            const message=(await response).data.message;
            if(message==="ok"){
            localStorage.clear();
            history('/Login');
            }
            
        }
        catch(err){
            setMessage(err.message);
            setShowError(!showError);
            setVariant("danger")
        }
    }
    const getNotification=async()=>{
        try{
            const response = await axios.get("http://localhost:4000/Admin/getNotification")
            localStorage['notification']=JSON.stringify(response.data.items)
            const notified=response.data.rows
            setNotification(notified);
        }
        catch(err){
            setMessage(err.message);
            setShowError(!showError);
            setVariant("danger")            
        }
    }
    useEffect(()=>{
        getNotification();
    },[]);
    return(        
        <Container fluid className={`${storedItems==="true"?"bgColor":"bg-light"}`}>
            <useContext value={toggle}>
            <Nav className=" d-flex justify-content-between align-items-center">
               <div className="search col-7 col-md-6 col-sm-6 col-lg-6 d-flex" style={{display:"none"}}>
                    <Button className="navbar-toggler" onClick={()=>{SetToggleMenu(!toggleMenu)}} type="button"style={{backgroundColor:"transparent"}}>
                        <img src={storedItems==="true"? menu:menu2} alt="menu" className="p-2 "></img> 
                    </Button>
                </div>
                <div className="d-flex align-items-center flex-row">
                    <OverlayTrigger
                    trigger='click'
                    placement="bottom"
                    overlay={
                        <Popover className="col-12">
                            <PopoverHeader className="header">Notification</PopoverHeader>
                                <PopoverBody>
                                    {outcome?
                                      Array[0].map((items)=>{
                                        const timeDifference= new Date()-new Date(items.TimeOfNotification);
                                        const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
                                        const minutesDifference = Math.floor(timeDifference / (60 * 1000));
                                        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));                                      
                                        return(
                                        <div key={items.id}>
                                            <p>{items.NameNotification}</p>
                                            <span>
                                                {
                                                  minutesDifference > 0 && minutesDifference<60?(
                                                    <span className="text-danger">{minutesDifference} minutes ago</span>
                                                 ):hoursDifference > 0 && hoursDifference<24?(
                                                    <span className="text-danger">{hoursDifference} hours ago</span>
                                                 ): daysDifference > 0?(
                                                    <span className="text-danger">{daysDifference} days ago</span>
                                                 ):(
                                                    <span className="text-danger">today</span>
                                                 )                                                
                                                }
                                                <span className="offset-5" style={{cursor:"pointer"}} onClick={
                                              async()=>{
                                                    try{
                                                     const notificationId=items.id
                                                      const response=await axios.delete(`http://localhost:4000/Admin/removeNotification/${notificationId}`)
                                                        const message=response.data.message;
                                                        const variant=response.data.variant;
                                                        setMessage(message);
                                                        setVariant(variant);
                                                        setShowError(!showError);
                                                        window.location.reload();                      
                                                    }
                                                    catch(err){
                                                        setMessage(err.message);
                                                        setShowError(!showError);
                                                        setVariant("danger");
                                                    }
                                                }}><img src={trash} alt="trash"></img></span>
                                                <hr></hr>
                                            </span>
                                        </div>
                                        )
                                            })
                                    :<div>You have no notifications</div> }                                                               
                                </PopoverBody>
                        </Popover>
                    }                 
                    >
                        <NavLink className="d-flex"><img src={storedItems==="true"? bell2:bell} alt="notification"></img>
                        <span className="red">{notification===0? "":notification}</span></NavLink>
                    </OverlayTrigger>
                    <Dropdown className="col-1">
                        <DropdownToggle>
                            <img src={Users} alt="search"></img>
                        </DropdownToggle>
                        <DropdownMenu className="p-2" style={{width:"250px"}}>
                            <NavLink className="item" style={{color:"black"}}>
                              <Link to="UserInfo" style={{textDecoration:"none",color:"black"}}>                                
                                <img src={user} alt="user" className="img-thumbnail thumbnail" style={{borderRadius:'100px'}}></img><span className="p-1">{userStoredItems.firstName}{userStoredItems.SecondName}</span>
                              </Link>
                            </NavLink>
                            <NavLink className="item"
                               onClick={clearLogin}
                            >
                                <img src={logOut} alt="logOut"></img> Logout
                            </NavLink>
                            <NavLink className="item" onClick={()=>{
                                if(storedItems==="true"){
                                    localStorage["my_theme"]=JSON.stringify("false");
                                } else{
                                    localStorage["my_theme"]=JSON.stringify("true");
                                 }
                                 }}>
                                <img src={storedItems==="true"? sun:moon} alt="toggle"></img> {storedItems==="true"? "light":"dark"}
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