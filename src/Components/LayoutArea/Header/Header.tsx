import { NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import {useState} from "react";
import store from "../../../Redux/Store";
import {UserInterface} from "../../../interfaces/UserInterface";

function Header():JSX.Element{
    var history = useHistory();
    var Login = ()=>{ //כפתור שיעבוד 
        history.push("/Login");
    }

    // const [clientType] = useState(store.getState().authState.user.clientType) //taken from Aside.tsx line 10
    // const [clientType] = useState(localStorage.getItem("user")) // maybe you can use just this instead?
    const [user, setUser] = useState<UserInterface>(JSON.parse(localStorage.getItem("user"))); //example

    return(
        <div className="Header">
            <button className="loginButton" onClick={Login}>Login</button>
            {user.clientType === 'admin' && <div>
                <NavLink className="navLink" exact to="/GetCustomerCoupons/" >Get customer coupons</NavLink>
                <NavLink className="navLink" exact to="/GetCompanyCoupons/" >Get company coupons</NavLink>
                <NavLink className="navLink" exact to="/CustomersTable" >Manage customers</NavLink>
                <NavLink className="navLink" exact to="/CompaniesTable" >Manage companies</NavLink>
            </div>}
            {user.clientType === 'company' && <div>
                <NavLink className="navLink" exact to="/GetCompanyCouponsByMaxPrice/" >Coupons by max-price</NavLink>
                <NavLink className="navLink" exact to="/GetCompanyDetails">Company details</NavLink>
                <NavLink className="navLink" exact to="/SingleCompanyTable">Coupons management</NavLink>
            </div>}
            {user.clientType === 'customer' && <div>
                <NavLink className="navLink" exact to="/CouponPurchase" >Purchase coupons</NavLink>
                <NavLink className="navLink" exact to="/MyPurchasedCouponsByMaxPrice/" >My coupons by max-price</NavLink>
                <NavLink className="navLink" exact to="/GetCustomerDetails" >My details</NavLink>
                <NavLink className="navLink" exact to="/SingleCustomerTable/" >My coupons</NavLink>
            </div>}
        </div>
    );
}

export default Header;