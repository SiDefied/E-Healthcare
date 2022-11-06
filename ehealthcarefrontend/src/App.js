import './App.css';
//import {BrowserRouter,Route,Routes,NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './component/Navbar';
import { Medicine } from './component/Medicine';

function App() {
  return (
    <div className='App'>
        <Navbar/>
        <Medicine/>
  
    </div>
  );
}

export default App;
