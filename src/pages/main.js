import'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import '../css/Main.css'
import { useState } from 'react';
import { Color, ToggleMenu } from '../components/context';
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
function Main() {
  const[bgColor,setBgColor]=useState(true);
  const[toggleMenu,SetToggleMenu]=useState(false)
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
                     <Route index path='/Home' element={<Home/>}/>
                     <Route path='/Daily' element={<Graph/>}/>
                     <Route path='/users' element={<Users/>}/>
                     <Route path='/SellsPage' element={<SellsPage/>}/>
                     <Route path='/FoodAvailable' element={<FoodAvailable/>}/>
                     <Route path='/Inventory' element={<Inventory/>}/>
                     <Route path='/UserInfo' element={<UserInfo/>}/>                     
                  </Routes>
               </div>
           </div>
        </div>
        </Color.Provider>
    </Container>   
  );
}

export default Main;