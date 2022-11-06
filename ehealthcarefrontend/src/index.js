import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {Medicine} from './component/Medicine';
import { Admin } from './component/Admin';
import {Login} from './component/login';
import MedDetail from './component/MedDetail';
import PayNow from './component/PayNow';
import { Addmed } from './component/addmed';
import { Userlist } from './component/userlist';
import Login1 from './component/login1';








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>   
        <Route path='/login' element={<Login/>}/>
        <Route path='/login1' element={<Login1/>}/>
        <Route path='/admin' element={<Admin/>}/> 
        <Route path='/admin/add' element={<Addmed/>}/>
        <Route path='/admin/userlist' element={<Userlist/>}/>        
        <Route path='/medicine' element={<Medicine/>}/>
        <Route path='/medicine/:id' element={<MedDetail/>}/>
        <Route path='/PayNow' element={<PayNow/>}/>
      </Routes>
    </Router>
  

  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
