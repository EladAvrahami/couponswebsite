import { Link,NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import {useEffect, useState} from "react";
import store from "../../../Redux/Store";
import {UserInterface} from "../../../interfaces/UserInterface";
import {useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import ConfigureStore from "../../../reduxToolkit/StoreConfig";

function Header():JSX.Element{
    var history = useHistory();
    var Login = ()=>{  
        history.push("/Login");
    }

    // const [clientType] = useState(store.getState().authState.user.clientType) //taken from Aside.tsx line 10
    // const [clientType] = useState(localStorage.getItem("user")) // maybe you can use just this instead?
    const { email, role } = useSelector((state) => ConfigureStore.getState().LoginSlice);

    return(
        <div className="Header shadow-sm">

            
            <Link to="/">  {/* הוספת לינק שיפנה למסך הבית בלחיצה על לוגו */}
            <h3 className="margin-top:1%  font-weight-bold text-primary mx-2">Coupon System</h3>
             </Link>
             <div>
             <button className="btn btn-primary btn-s mx-2 " onClick={Login}>Login</button>
             </div>
            

            {/* זה אמור להיות הבר של האורח  */}
            {/* {role === 'guest' && <div>
                <NavLink className="navLink" exact to="/GetCustomerCoupons/" >this</NavLink>
                <NavLink className="navLink" exact to="/GetCompanyCoupons/" >is</NavLink>
                <NavLink className="navLink" exact to="/CustomersTable" >guest</NavLink>
                <NavLink className="navLink" exact to="/CompaniesTable" >nav link</NavLink>
            </div>} */}

                {/* בר אדמין */}
            {role === 'admin' && <div className=" clientNav d-flex justify-content-right py-3 shadow-sm">
            <Link  to="/GetCustomerCoupons/">
              <button className="btn btn-primary btn-s mx-2">Get customer coupons</button>
            </Link>
            <Link  to="/GetCompanyCoupons/">
              <button className="btn btn-primary btn-s mx-2">Get company coupons</button>
            </Link>
            <Link  to="/CustomersTable">
              <button className="btn btn-primary btn-s mx-2">Manage customers</button>
            </Link>
            <Link  to="/CompaniesTable">
              <button className="btn btn-primary btn-s mx-2">Manage companies</button>
            </Link>

                {/* הבר ישן */}
                {/* <NavLink className="navLink" exact to="/GetCustomerCoupons/" >Get customer coupons</NavLink> */}
                {/* <NavLink className="navLink" exact to="/GetCompanyCoupons/" >Get company coupons</NavLink> */}
                {/* <NavLink className="navLink" exact to="/CustomersTable" >Manage customers</NavLink> */}
                {/* <NavLink className="navLink" exact to="/CompaniesTable" >Manage companies</NavLink> */}
            </div>}
            {role === 'company' && <div>
                <NavLink className="navLink" exact to="/GetCompanyDetails">Company details</NavLink>
                <NavLink className="navLink" exact to="/SingleCompanyTable">Coupons management</NavLink>
            </div>}
            {role === 'customer' && <div>
                <NavLink className="navLink" exact to="/CouponPurchase" >Purchase coupons</NavLink>
                <NavLink className="navLink" exact to="/GetCustomerDetails" >My details</NavLink>
                <NavLink className="navLink" exact to="/SingleCustomerTable/" >My coupons</NavLink>
            </div>}
        </div>
    );
}

export default Header;