import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import store from "../../../../Redux/Store";
import CompanyData from "../../../Models/CompanyData";
import notify from "../../../Services/Notify";
import "./GetCompanyDetails.css";

function GetCompanyDetails(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CompanyData>();
    //for sending the browser to specific location 
    const history = useHistory();

    /*
    async function send(company:CompanyData){
            //lecturer is in json mode, ready to send.....      
            const response = await axios.get<CompanyData>("http://localhost:8080/coupons/GetCompanyDetails");
            console.log("show me the money!!!!");
            console.log(response.data);
    }
    */
    
    return (
        <div className="GetCompanyDetails Box">
			<h2>My company's details</h2>
               Name: {store.getState().authState.user.name}<br/>
               Email:  {store.getState().authState.user.email}<br/>
               UserId:  {store.getState().authState.user.userId}<br/>
        </div>
    );
}

export default GetCompanyDetails;