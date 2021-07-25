import { NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import {useState} from "react";
import store from "../../../Redux/Store";
import Aside from "../Aside/Aside";

function Header():JSX.Element{
    var history = useHistory();
    var Login = ()=>{ //כפתור שיעבוד 
        history.push("/Login");
    }

    // const [clientType] = useState(store.getState().authState.user.clientType) //taken from Aside.tsx line 10
    // const [clientType] = useState(localStorage.getItem("user")) // maybe you can use just this instead?
    const [clientType] = useState("admin") //example

    return(
        <div className="Header ">   {/*header d-flex justify-content-center py-3 shadow-sm   **** my bootstrap*/}
            {/* <div>logo</div> */}


            <button className="loginButton btn btn-primary btn-s mx-2" onClick={Login}>Login</button>
            
            <Aside/>

            {/* {clientType === 'admin' && <div>
                <NavLink className="navLink" exact to="/GetCustomerCoupons/" >Get customer coupons</NavLink>
                <NavLink className="navLink" exact to="/GetCompanyCoupons/" >Get company coupons</NavLink>
                <NavLink className="navLink" exact to="/CustomersTable" >Manage customers</NavLink>
                <NavLink className="navLink" exact to="/CompaniesTable" >Manage companies</NavLink>
            </div>}
            {clientType === 'company' && <div>
                <NavLink className="navLink" exact to="/GetCompanyCouponsByMaxPrice/" >Coupons by max-price</NavLink>
                <NavLink className="navLink" exact to="/GetCompanyDetails">Company details</NavLink>
                <NavLink className="navLink" exact to="/SingleCompanyTable">Coupons management</NavLink>
            </div>}
            {clientType === 'customer' && <div>
                <NavLink className="navLink" exact to="/CouponPurchase" >Purchase coupons</NavLink>
                <NavLink className="navLink" exact to="/MyPurchasedCouponsByMaxPrice/" >My coupons by max-price</NavLink>
                <NavLink className="navLink" exact to="/GetCustomerDetails" >My details</NavLink>
                <NavLink className="navLink" exact to="/SingleCustomerTable/" >My coupons</NavLink>
            </div>} */}
        </div>
    );
}

export default Header;