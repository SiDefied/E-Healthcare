import React from 'react';
import { Link } from 'react-router-dom';

const Navbar =() =>{
    return(
        <div >
            <nav className='navbar navbar-expand-lg navbar-dark bg-white ' style={{border:'2px'}}>
                <img paddingLeft='10px' paddingRight='10px' className='logo' alt='LOGO' width='50px' src='https://cdn-icons-png.flaticon.com/512/2966/2966327.png' />
                    <h3 style={{color:"black",paddingRight:"10px"}}>ABC Healthcare</h3>
            
              <ul className='navbar-nav'>
                
                <div>
                <li className='nav-item m-1'>
                    <Link className='btn btn-success btn-outline-light' to='/admin'>Admin</Link>
                </li>
                </div>
                <div>
                <li className='nav-item m-1'>
                    <Link className='btn btn-primary btn-outline-light' to='/login'>Login</Link>
                </li>
                </div>
              </ul>
              <h5 align="right" style={{color:"black",textAlign:"right",paddingLeft:'47%'}}>Helpline No : 1234-1234-000</h5>
            </nav>
        </div>
    )
}
export default Navbar