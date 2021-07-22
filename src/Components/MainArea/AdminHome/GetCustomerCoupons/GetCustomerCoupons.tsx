
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import SingleCoupon from "../../../Coupons/SingleCoupon";
import CustomerData from "../../../Models/CustomerData";
import CouponData from "../../../Models/CouponData";
import notify from "../../../Services/Notify";


function GetCustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponData[]>([]);

    const {register, handleSubmit, errors} = useForm<CustomerData>();
    //for sending the browser to specific location 
    const history = useHistory();

    async function send(customer:CustomerData){
        try{
            //lecturer is in json mode, ready to send.....      
    const { data : coupons } : { data : CouponData[] } = await axios.get(`http://localhost:8080/coupons/getCouponsByCustomer2/`+customer.id);
    setCoupons(coupons);
            notify.success("");
        } catch {
            notify.error("Error")
        }
    }



    // const [coupons, setCoupons] = useState<CouponData[]>([]);
    useEffect(() => {
        fetchCoupons();
    }, [])
       const fetchCoupons = async () => {
           try {
            
           } catch(e) {
               console.log(e)
           }
       }
       
   
       useEffect(() => {
           fetchCoupons();
       }, [])
   
       return (
           <div className="GetCustomerCoupons row">
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