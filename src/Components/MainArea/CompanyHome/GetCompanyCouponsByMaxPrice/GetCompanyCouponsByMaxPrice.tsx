import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import SingleCoupon from "../../../Coupons/SingleCoupon";
import CompanyData from "../../../Models/CompanyData";
import CouponData from "../../../Models/CouponData";
import notify from "../../../Services/Notify";
import AxiosRequest from "../../../../axios/AxiosRequest";

function GetCompanyCouponsByMaxPrice(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponData[]>([]);

    const {register, handleSubmit, errors} = useForm<CompanyData>();
    const history = useHistory();

    async function send(){
        try{
            // const { data : coupons } : { data : CouponData[] } = await axios.get(
            const { data : coupons } : { data : CouponData[] } = await AxiosRequest.get(
            // `http://localhost:8080/coupons/getCouponsByMaxPrice/`,
            `/coupons/getCouponsByMaxPrice/` //You need to change getCouponsByMaxPrice controller in spring.
            );
            setCoupons(coupons);
            notify.success("");
        } catch {
            notify.error("Error")
        }
    }

   return (
       <div className="GetCompanyCouponsByMaxPrice row">
           {coupons.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
        <h2>Coupons by max price:</h2>
        <form onSubmit={handleSubmit(send)}>
            <input type="number" name="price" placeholder="Maximum price" ref={register({
                required: {value:true , message:"Missing price."},
            })}/>
            <br/><br/>
            <button>Get</button>
        </form>
    </div>
   );
}
   
export default GetCompanyCouponsByMaxPrice;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
// import SingleCoupon from "../../../Coupons/SingleCoupon";
// import CompanyData from "../../../Models/CompanyData";
// import CouponData from "../../../Models/CouponData";
// import notify from "../../../Services/Notify";
//
// function GetCompanyCouponsByMaxPrice(): JSX.Element {
//     const [coupons, setCoupons] = useState<CouponData[]>([]);
//
//     const {register, handleSubmit, errors} = useForm<CompanyData>();
//     const history = useHistory();
//
//     async function send(){
//         try{
//             const { data : coupons } : { data : CouponData[] } = await axios.get(
//                 `http://localhost:8080/coupons/getCouponsByMaxPrice/`,
//
//             );
//
//             setCoupons(coupons);
//             notify.success("");
//         } catch {
//             notify.error("Error")
//         }
//     }
//
//     return (
//         <div className="GetCompanyCouponsByMaxPrice row">
//             {coupons.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
//             <h2>Coupons by max price:</h2>
//             <form onSubmit={handleSubmit(send)}>
//                 <input type="number" name="price" placeholder="Maximum price" ref={register({
//                     required: {value:true , message:"Missing price."},
//                 })}/>
//                 <br/><br/>
//                 <button>Get</button>
//             </form>
//         </div>
//     );
// }
//
// export default GetCompanyCouponsByMaxPrice;