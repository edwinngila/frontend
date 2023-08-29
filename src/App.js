import'bootstrap/dist/css/bootstrap.min.css'
// import Loder from './components/loder';
// import Login from './components/login';
// import SignUp from './components/signup';
// import Main from './pages/main';
import Landing from './pages/landing';
// import ErrorComps from './components/ErrorComps';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorMessage } from './components/context';
import SignUp from './components/signup';
import Login from './components/login';
import ErrorCompass from './components/ErrorComps';
import Main from './pages/main';
import Home from './pages/Home';
import Users from './pages/Users';
import SellsPage from './pages/Sell';
import Graph from './pages/DailySells';
import Inventory from './pages/Inventory';
import FoodAvailable from './pages/FoodAvailable';
// import { ErrorMessage} from './components/context';
// import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
function App() {
  const[Message,setMessage]=useState("");
  const[variant,setVariant]=useState();
  const[showError,setShowError]=useState(false);
  const[login,setLogin]=useState(false);
 
  const variants={
    Message,setMessage,
    variant,setVariant,
    showError,setShowError,
    login,setLogin,
  }
  
  return (
    <>  
    <ErrorMessage.Provider value={variants}>
          <div>
            <ErrorCompass/>
          </div>
      <Routes>
         <Route index path='/' element={<Landing/>}/>
         <Route path='/SignUp' element={<SignUp/>}/>
         <Route path='/Login' element={<Login/>}/> 
         <Route path='/Main' element={<Main/>}>
            <Route index path='Home' element={<Home/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='SellsPage' element={<SellsPage/>}/>
            <Route path='Daily' element={<Graph/>}/>
            <Route path='Inventory' element={<Inventory/>}/>
            <Route path='FoodAvailable' element={<FoodAvailable/>}/>
         </Route>
      </Routes>
    </ErrorMessage.Provider>
        {/* <Main/>
        {/* <Loder/> */}
        {/* <Landing/> */}
        {/* <Main/> */}
     </>
  );
}

export default App;
