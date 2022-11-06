import React,{Component} from 'react';
import Navbar from './Navbar.js';
import {Variables} from './Variable.js';


export class Login extends Component{
    constructor(props){
        super(props);

        this.state={
            user:[],
            modalTitle:"",
            UserId:0,
            UserName:"",
            UserPass:"",
            UserRole:"",
        }
    }
    
    refreshList(){
        
        fetch(Variables.API_URL+'User')
        .then(response=>response.json())
        .then(data=>{
            this.setState({user:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeUserName =(e)=>{
        this.setState({UserName:e.target.value});
    }
    changeUserPass =(e)=>{
        this.setState({UserPass:e.target.value});
    }
    changeUserRole =(e)=>{
        this.setState({UserRole:e.target.value});
    }
   

    createClick(){
        fetch(Variables.API_URL+'User',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                user_name:this.state.UserName,
                user_password:this.state.UserPass,
                user_role:this.state.UserRole,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        
        }
        ,(error)=>{
            alert(error);
        }
        
        )
    }


    render(){
        const {
            user,
            modalTitle,
            UserId,
            UserName,
            UserPass,
        }=this.state;

        return(
        <div >
            <Navbar/>
    
    
        <div className='form'>
        <div className="d-flex flex-row bd-highlight mb-3">
        
        <div className="p-2 w-50 bd-highlight">
            <h2>Login Details</h2>
            <br/>
        
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input style={{height:'45px'}} type="text" className="form-control"
                value={UserName}
                onChange={this.changeUserName}/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Password</span>
                <input style={{height:'45px'}} type="password" className="form-control"
                value={UserPass}
                onChange={this.changeUserPass}/>
            </div>


        </div>
        </div>

        <button type="button" 
            className="btn btn-primary float-start"
            onClick={()=>this.createClick()}
            >Login</button>

    </div>

    </div>


        )
    }
}