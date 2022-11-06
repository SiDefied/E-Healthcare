import React, { Component } from 'react';
import { Link, useHref } from 'react-router-dom';
import Navbar from './Navbar';
import { Variables } from './Variable';



export class Userlist extends Component{
    constructor(props){
        super(props)

        this.state={
            users:[],
            PhotoPath:Variables.PHOTO_URL,
            MedicineName:"",
            withoutfilter:[]
        }

    }

    Filter()
    {
        var MedicineName = this.state.MedicineName;
        var filtereddata = this.state.withoutfilter.filter(
            function(fl){
                return fl.med_name.toString().toLowerCase().includes(
                    MedicineName.toString().trim().toLowerCase()
                )
            }
        );
        this.setState({users:filtereddata});


    }

    changeMedicineName = (e) =>{
        this.state.MedicineName = e.target.value;
        this.Filter();
    }


    refreshlist(){
        fetch(Variables.API_URL+'User')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data,withoutfilter:data});
        });
    }

    componentDidMount(){
        this.refreshlist();
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(Variables.API_URL+'User?id='+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
            
            
        },(error)=>{
            alert('Deleted');
        })
        .then(window.location.reload())
        }
    }

    render(){
        const
        {
            users,
        }=this.state;
        return(
            <div className='App'>
                <Navbar/>
                <div>
                    <table className='table table-stripped'>
                        <thead>
                            <tr>
                                <th style={{width:'350px', fontSize:"20px"}}>
                                    <input className='form-control m-2' 
                                    onChange={this.changeMedicineName} 
                                    placeholder="Search" />
                                    Id
                                </th>
                                <th style={{fontSize:"20px"}}>
                                    Name
                                </th>
                                <th style={{fontSize:"20px"}}>
                                    Role
                                </th>
                                <th style={{fontSize:"20px"}}>
                                    Options
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user =>
                                <tr key={user.user_id}>
                                    <td style={{fontSize:"20px"}}>
                                        {user.user_id}
                                    </td>
                                    <td style={{fontSize:"20px"}}>
                                        {user.user_name}
                                    </td>
                                    <td style={{fontSize:"20px"}}>
                                        {user.user_role}
                                    </td>

                                    <td>
                                    <button type='button' className='btn btn light mr-1'
                                     onClick={()=>this.deleteClick(user.user_id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                    </button>
                                    </td>
                                    
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }    
}
