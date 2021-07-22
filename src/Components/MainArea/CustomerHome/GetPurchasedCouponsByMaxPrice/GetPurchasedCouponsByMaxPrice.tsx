import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomerData from "../../../Models/CustomerData";
import notify from "../../../Services/Notify";
import "./GetPurchasedCouponsByMaxPrice.css";

function GetPurchasedCouponsByMaxPrice(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CustomerData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:CustomerData){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.get<CustomerData>("http://localhost:8080/couponsdb/GetPurchasedCouponsByMaxPrice/{/maxPrice}");
            console.log(response);
            notify.success("There is a customer with that id.");
        } catch {
            notify.error("There is NO customer with that id.")
        }
    }

    return (
        <div className="GetPurchasedCoupons Box">
			<h2>Get All Coupons Per Customer By Maximum Price</h2>
            <form onSubmit={handleSubmit(send)}>
            <input type="number" name="id" placeholder="Customer's id" ref={register({
                    required: {value:true , message:"Missing id"},
                })}/>
                <span><br/>{errors.id?.message}</span>
                <br/><br/>
                <input type="number" name="maxPrice" placeholder="Maximum price" ref={register({
                    required: {value:true , message:"Missing price"},
                })}/>
                {/*<span><br/>{errors.customerId?.message}</span>*/}
                <br/><br/>
                <button>Get</button>
            </form>
        </div>
    );
}


export default GetPurchasedCouponsByMaxPrice;