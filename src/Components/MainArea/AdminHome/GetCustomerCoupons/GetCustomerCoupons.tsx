
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import SingleCoupon from "../../../Coupons/SingleCoupon";
import CustomerData from "../../../Models/CustomerData";
import CouponData from "../../../Models/CouponData";
import notify from "../../../Services/Notify";
import AxiosRequest from "../../../../axios/AxiosRequest";


function GetCustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponData[]>([]);

    const {register, handleSubmit, errors} = useForm<CustomerData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:CustomerData){
        try{
            //lecturer is in json mode, ready to send.....      
    const { data : coupons } : { data : CouponData[] } = await AxiosRequest.get(`coupons/getCouponsByCustomer2/`+customer.id);
    setCoupons(coupons);
            notify.success("");
        } catch {
            notify.error("Error")
        }
    }
       return (
           <div className="GetCustomerCoupons Box">
               {coupons.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
			<h2>Get customer coupons:</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" name="id" placeholder="Customer's id" ref={register({
                    required: {value:true , message:"Missing id."},
                })}/>
                <br/><br/>
                <button>Get</button>
            </form>
        </div>
       );
   }
   
   export default GetCustomerCoupons;