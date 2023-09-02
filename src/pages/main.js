import'bootstrap/dist/css/bootstrap.min.css'
import { Container} from 'react-bootstrap';
import '../css/Main.css';
import {useEffect, useState } from 'react';
import { Color, ToggleMenu } from '../components/context';
import Navigation from '../components/Navigation';
import TopIcons from '../components/TopIcons';
import {Outlet} from 'react-router-dom';
function Main() {
  const[bgColor,setBgColor]=useState('');
  const[toggleMenu,SetToggleMenu]=useState(false);
  useEffect(()=>{
    const data = localStorage.getItem("my_theme")
    if(data!==null){ 
     setBgColor(data);
   }
   },[])
   useEffect(()=>{
     localStorage.setItem("my_theme",bgColor)
   },[bgColor])    
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
               <div className='row' style={{minHeight:'100vh',backgroundColor:`${bgColor==='true'?"#707e8b":"#f8f9fa"}`}}>
                  <Outlet/>
               </div>
           </div>
        </div>
        </Color.Provider>
    </Container>   
  );
}

export default Main;