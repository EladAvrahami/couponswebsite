import { Component } from "react";
import "./GetCustomerDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompanyData from "../../../Models/CompanyData";
import CustomerData from "../../../Models/CustomerData";

interface GetCustomerDetailsState {
    myCustomer:CustomerData;
}

class GetCustomerDetails extends Component<{}, GetCustomerDetailsState> {

    public constructor(props:{} ) {
        super(props);
        this.state = {            
            myCustomer : new CustomerData  
        };
        
    }

    public render(): JSX.Element {
        return (
            <div className="GetCustomerDetails">               
                <div className="Box GetCustomerDetails"> 
                            <h3>My details:</h3>
                   ID: {this.state.myCustomer.id} <br/>  
                   FIRST NAME: {this.state.myCustomer.firstName} <br/>
                   LAST NAME: {this.state.myCustomer.lastName} <br/>
                   EMAIL: {this.state.myCustomer.email} <br/>
                </div>
            </div>
        );
    }

    public async componentDidMount(){
        const result = await axios.get("http://localhost:8080/coupons/getOneCustomer");
        const CustomerData = result.data;
        console.log(CustomerData);
        this.setState({
            myCustomer : CustomerData
        })
    }
}

export default GetCustomerDetails;