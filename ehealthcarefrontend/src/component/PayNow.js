import Navbar from "./Navbar";

export default function PayNow(){
    return(
        <div>
            <Navbar/>
        <br/>
        <h3 align="center">
        <img src="https://img.freepik.com/premium-vector/success-payment-icon-flat-style-approved-money-vector-illustration-isolated-background-successful-pay-sign-business-concept_157943-1354.jpg?w=740" height="300px"/>
        </h3>
        <br/>
        <h3 align="center">Thank you for shopping with us !!</h3>
        <br/>
        <h5 align="center"> Your order will be delivered shortly.</h5>
        <br/>
        <br/>
        <br/>
        <h5 align="center">
        <a href="/" class="btn btn-primary btn-sm float-right"><span className="pay-btn">Back to Store</span></a>
        </h5>
    </div>
    )
}