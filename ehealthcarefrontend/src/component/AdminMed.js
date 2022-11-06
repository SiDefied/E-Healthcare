import React, { Component } from 'react';
import { Variables } from './Variable';

export class AdminMed extends Component{
    constructor(props){
        super(props)
        this.state={
            medicines:[],
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
        this.setState({medicines:filtereddata});
    }

    changeMedicineName = (e) =>{
        this.state.MedicineName = e.target.value;
        this.Filter();
    }

    refreshlist(){
        fetch(Variables.API_URL+'Medicine')
        .then(response=>response.json())
        .then(data=>{
            this.setState({medicines:data,withoutfilter:data});
        });
    }

    componentDidMount(){
        this.refreshlist();
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(Variables.API_URL+'Medicine?id='+id,{
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
            medicines
        }=this.state;
        return(
            <div className='Admin Med'>
                <input className='form-control m-2' onChange={this.changeMedicineName} placeholder="Search"/>
                    <table className='table table-stripped'>
                        <thead className='hrow'>
                            <tr>
                                <th>
                                    
                                    Name
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                   Image
                                </th>
                                <th>
                                    Seller
                                </th>
                                <th>
                                    Descrpition
                                </th>
                                <th>
                                    Option
                                </th>
                            </tr>
                        </thead>
                        <tbody className='mrow'>
                            {medicines.map(med =>
                                <tr key={med.med_id}>
                                    <td>
                                        {med.med_name}
                                    </td>
                                    <td>
                                        {med.med_price}
                                    </td>
                                    <td>
                                        <img height='150px' src={med.med_image}/>
                                    </td>
                                    <td>
                                        {med.med_seller}
                                    </td>
                                    <td className='meddes'>
                                        {med.med_description}
                                    </td>
                                    <td>
                                    <button type='button' className='btn btn light mr-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                    </svg>
                                    </button>
                                    <button type='button' className='btn btn light mr-1'
                                     onClick={()=>this.deleteClick(med.med_id)}>
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
        )

    }
}