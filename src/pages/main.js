import'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import '../css/Main.css'
import { useContext, useState } from 'react';
import { Color, ErrorMessage, ToggleMenu } from '../components/context';
import Navigation from '../components/Navigation';
import TopIcons from '../components/TopIcons';
import Home from './Home';
import Graph from './DailySells';
import Users from './Users';
import SellsPage from './Sell';
import FoodAvailable from './FoodAvailable';
import Inventory from './Inventory';
import UserInfo from '../components/UserInfo';
import { Route, Routes } from 'react-router-dom';
import Landing from './landing';
function Main() {
  const[bgColor,setBgColor]=useState(true);
  const[toggleMenu,SetToggleMenu]=useState(false)
  const{login}=useContext(ErrorMessage);
  return (
    <Container fluid>      
        <ToggleMenu.Provider value={{toggleMenu,SetToggleMenu}}>
          <div className='toggleSlider col-xs-12' style={{display: toggleMenu? "block":"none"}}>
             <Navigation/>
          </div>
        </ToggleMenu.Provider>
        <Color.Provider value={{bgColor,setBgColor}}>
        <div className='row' style={{zIndex:"1"}}>
           <div className='col-sm-12 col-lg-12 col-md-12'>
                <div className='row'>   
                <ToggleMenu.Provider value={{toggleMenu,SetToggleMenu}}>               
                   <TopIcons/>
                </ToggleMenu.Provider>                  
                </div>
               <div className='row' style={{minHeight:'100vh',backgroundColor:`${bgColor? "#f8f9fa":"#707e8b"}`}}>
                  <Routes>
                     <Route index path='/Home' element={login?<Home/>:<Landing/>}/>
                     <Route path='/Daily' element={login?<Graph/>:<Landing/>}/>
                     <Route path='/users' element={login?<Users/>:<Landing/>}/>
                     <Route path='/SellsPage' element={login?<SellsPage/>:<Landing/>}/>
                     <Route path='/FoodAvailable' element={login?<FoodAvailable/>:<Landing/>}/>
                     <Route path='/Inventory' element={login?<Inventory/>:<Landing/>}/>
                     <Route path='/UserInfo' element={login?<UserInfo/>:<Landing/>}/>                     
                  </Routes>
               </div>
           </div>
        </div>
        </Color.Provider>
    </Container>   
  );
}

export default Main;