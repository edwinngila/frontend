import'bootstrap/dist/css/bootstrap.min.css'
import { Container} from 'react-bootstrap';
import '../css/Main.css';
import {useState } from 'react';
import { Color, ToggleMenu } from '../components/context';
import Navigation from '../components/Navigation';
import TopIcons from '../components/TopIcons';
import {Outlet} from 'react-router-dom';
function Main() {
  const[bgColor,setBgColor]=useState('false');
  const[toggleMenu,SetToggleMenu]=useState(false); 
  const retrieveItems = localStorage.getItem("my_theme");
  const storedItems= JSON.parse(retrieveItems);
  return (
    <Container fluid>      
          <div className='toggleSlider col-xs-12' style={{display: toggleMenu? "block":"none"}}>
          <ToggleMenu.Provider value={{toggleMenu,SetToggleMenu}}>
             <Navigation/>
          </ToggleMenu.Provider>
          </div>
        <Color.Provider value={{bgColor,setBgColor}}>
        <div className='row' style={{zIndex:"1"}}>
           <div className='col-sm-12 col-lg-12 col-md-12'>
                <div className='row'>   
                  <ToggleMenu.Provider value={{toggleMenu,SetToggleMenu}}>               
                     <TopIcons/>
                  </ToggleMenu.Provider>                  
                </div>
               <div className='row' style={{minHeight:'100vh',backgroundColor:`${storedItems==="true"?"#707e8b":"#f8f9fa"}`}}>
                  <Outlet/>
               </div>
           </div>
        </div>
        </Color.Provider>
    </Container>   
  );
}

export default Main;