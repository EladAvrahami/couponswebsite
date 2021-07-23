import { Component } from "react";
import "./GetCompanyDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompanyData from "../../../Models/CompanyData";

interface GetCompanyDetailsState {
    myCompany:CompanyData;
}

class GetCompanyDetails extends Component<{}, GetCompanyDetailsState> {

    public constructor(props:{} ) {
        super(props);
        this.state = {            
            myCompany : new CompanyData  
        };
        
    }

    public render(): JSX.Element {
        return (
            <div className="GetCompanyDetails">               
                <div className="Box GetCompanyDetails">   
                                <h3>My company details:</h3>                                
                   COMPANY NAME: {this.state.myCompany.name} <br/>
                   ID: {this.state.myCompany.id} <br/>
                   EMAIL: {this.state.myCompany.email} <br/>
                   PASSWORD: {this.state.myCompany.password} <br/>
                </div>
                <h3>* If you forgot your password, or wish to update it -<br/>
                 please contact the site admin at: admin@admin.com</h3>
            </div>
        );
    }

    public async componentDidMount(){
        const result = await axios.get("http://localhost:8080/coupons/getOneCompanyLoggedIn");
        const CompanyData = result.data;
        console.log(CompanyData);
        this.setState({
            myCompany : CompanyData
        })
    }
}

export default GetCompanyDetails;