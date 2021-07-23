import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import notify from "../../../Services/Notify";
import CouponData from "../../../Models/CouponData";
import "./CouponPurchase.css";
import CustomerData from "../../../Models/CustomerData";
import UserModel from "../../../Models/UserModel";

function CouponPurchase(): JSX.Element {
    const {register, handleSubmit, errors} = useForm<CouponData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(coupon:CouponData){
        try{
            const response = await axios.post<CouponData>("http://localhost:8080/coupons/purchaseCoupon/"+coupon.id);
            console.log(response.data);
            notify.success("The coupon was successfully purchased!");

        } catch {
            notify.error("The coupon was NOT purchased.");
        }
    }
    
    return (
        <div className="CouponPurchase Box">
			<h2>Coupon Purchase</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="id" placeholder="Coupon's ID" ref={register({
                   required: {value:true , message:"Please enter coupon id number."},
                   min: {value:1, message:"ID number can only be positive."}
               })}/>
               <span><br/>{errors.id?.message}</span>
               <br/><br/>
                <button>Purchase</button>
            </form>
        </div>
    );
}

export default CouponPurchase;