import'bootstrap/dist/css/bootstrap.min.css'
import { Container} from 'react-bootstrap';
import '../css/Main.css';
import { useContext, useState } from 'react';
import { Color, ErrorMessage, ToggleMenu } from '../components/context';
import Navigation from '../components/Navigation';
import TopIcons from '../components/TopIcons';
import {Outlet} from 'react-router-dom';
function Main() {
  const[bgColor,setBgColor]=useState(true);
  const[toggleMenu,SetToggleMenu]=useState(false);
  saveToLocalStor
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
                  <Outlet/>
               </div>
           </div>
        </div>
        </Color.Provider>
    </Container>   
  );
}

export default Main;