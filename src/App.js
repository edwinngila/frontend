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
import Main from './pages/main';
import ErrorCompass from './components/ErrorComps';
import Loading from './components/loder';
// import { ErrorMessage} from './components/context';
// import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
function App() {
  const[Message,setMessage]=useState("");
  const[variant,setVariant]=useState();
  const[showError,setShowError]=useState(false);
  const[login,setLogin]=useState(false)
  const variants={
    Message,setMessage,
    variant,setVariant,
    showError,setShowError,
    login,setLogin
  }
  return (
    <>  
    <ErrorMessage.Provider value={variants}>
          <div style={{display:showError? "block":"none"}}>
            <ErrorCompass/>
          </div>
      <Routes>
         <Route index path='/' element={<Landing/>}/>
         <Route path='/SignUp' element={<SignUp/>}/>
         <Route path='/Login' element={<Login/>}/>
         <Route path='/Main' element={<Main/>}/>
         <Route path='/Loader' element={<Loading/>}/>
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
