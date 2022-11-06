import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Variables } from "./Variable";
import './Meddetail.css';


export default function MedDetail(props){
    var qty = 10;
    //const path = Variables.PHOTO_URL;
    const {id} = useParams();
    let [buydata,setbuydata]=React.useState([1])
    axios.get(`https://localhost:7240/api/BuyMed?id=${id}`).then(respone => {
        setbuydata(respone.data)

    })

    return(
        <div>
            <Navbar/>
        
            {buydata.map(med=>
                <div>
                 <div class="card float-right">
                 <div class="row">
                   <div class="col-sm-5">
                     <img class="d-block w-100" src={med.med_image} alt=""/>
                   </div>
                   <div class="col-sm-7">
                    <div className="vl">
                     <div class="card-block">
                        <h2 className="name">{med.med_name}</h2>
                        <div className="border"><h4 className="sp">Descrpition:</h4> <p className="desc">{med.med_description}.</p></div>
                        <div className="border"><h4 className="sp">Seller:</h4> <p className="desc">{med.med_seller}.</p></div>
                        <div className="border"><h4 className="sp">Price:</h4> <p className="desc">Rs <span className="price" color="green">{med.med_price}/-</span></p></div>
                        <div className="border"><h4 className="sp">Quantity</h4><input type='number' value={qty} /></div>
                        <div className="border"><h4 className="sp">Total:</h4> <p className="desc">{med.med_price*qty}.</p></div>
                       <a href="/PayNow" class="btn btn-success btn-sm float-right"><span className="pay-btn">Pay Now</span></a>
                     </div>
                   </div>
                   </div>
                 </div>
               </div>
               </div>
             
            
                )}
            

         </div>
    )
}