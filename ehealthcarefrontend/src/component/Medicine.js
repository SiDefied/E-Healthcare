import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Variables } from './Variable';
import './Medicine.css'



export class Medicine extends Component{
    constructor(props){
        super(props)

        this.state={
            medicines:[],
            //PhotoPath:Variables.PHOTO_URL,
            //PhotoPath:Variables.PHOTO_URL,
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

    render(){
        const
        {
            medicines,
            PhotoPath
        }=this.state;
        return(
            <div className='Medicine'>
                {/* <Navbar/> */}
                <div>
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
                                        <Link className='btn btn-success' to={`/medicine/${med.med_id}`}>Buy</Link>    
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
