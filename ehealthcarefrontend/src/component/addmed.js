import React,{Component} from 'react';
import Navbar from './Navbar.js';
import {Variables} from './Variable.js';
import './login.css';


export class Addmed extends Component{
    constructor(props){
        super(props);

        this.state={
            medicine:[],
            modalTitle:"",
            MedId:0,
            MedName:"",
            Medprice:0,
            Medimage:"",
            Medseller:"",
            Meddeiscription:"",
            PhotoPath:Variables.PHOTO_URL,
            PhotoFileName:"anonymous.png",
        }
    }
    
    refreshList(){
        
        fetch(Variables.API_URL+'Medicine')
        .then(response=>response.json())
        .then(data=>{
            this.setState({medicine:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeMedID =(e)=>{
        this.setState({MedId:e.target.value});
    }
    
    changeMedName =(e)=>{
        this.setState({MedName:e.target.value});
    }
    changeMedprice =(e)=>{
        this.setState({Medprice:e.target.value});
    }
    changeMedseller=(e)=>{
        this.setState({Medseller:e.target.value});
    }

    changeMeddescription=(e)=>{
        this.setState({Meddeiscription:e.target.value});
    }
   
    
    changeMedImage=(e)=>{
        this.setState({Medimage:e.target.value});

        
    }

    createClick(){
        fetch(Variables.API_URL+'Medicine',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                med_id:this.state.MedId,
                med_name:this.state.MedName,
                med_price:this.state.Medprice,
                med_image:this.state.Medimage,
                med_seller:this.state.Medseller,
                med_description:this.state.Meddeiscription,
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
            MedId,
            MedName,
            Medprice,
            Medimage,
            Medseller,
            Meddeiscription,
        }=this.state;

        return(
        <div>
            <Navbar/>

    <div className='form'>
    

    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
        <h2>Enter Medicine Details</h2>
            
        <div className="input-group mb-3">
            <span className="input-group-text">Medicine ID</span>
            <input type="number" className="form-control" style={{height:'45px'}}
            value={MedId}
            onChange={this.changeMedID}/>
        </div>
    
        <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input type="text" className="form-control" style={{height:'45px'}}
            value={MedName}
            onChange={this.changeMedName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Medicine Price</span>
            <input type="number" className="form-control" style={{height:'45px'}}
            value={Medprice}
            onChange={this.changeMedprice}/>
        </div>

        <div className="input-group mb-3">
        
            <span className="input-group-text">ImageURL</span>
            <input type="text" className="form-control" style={{height:'45px'}}
            value={Medimage}
            onChange={this.changeMedImage}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Seller</span>
            <input type="text" className="form-control" style={{height:'45px'}}
            value={Medseller}
            onChange={this.changeMedseller}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Descrpition</span>
            <input type="text" className="form-control" style={{height:'45px'}}
            value={Meddeiscription}
            onChange={this.changeMeddescription}/>
        </div>


     </div>
    </div>

    <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Add Medicine</button>

</div>

</div>


        )
    }
}