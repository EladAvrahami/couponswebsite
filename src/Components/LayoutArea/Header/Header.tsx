import { Link,NavLink, useHistory } from "react-router-dom";
import "./Header.css";
import {useEffect, useState} from "react";
import store from "../../../Redux/Store";
import {UserInterface} from "../../../interfaces/UserInterface";
import {useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import ConfigureStore from "../../../reduxToolkit/StoreConfig";
import Logout from "./Logout/Logout";

function Header():JSX.Element{
    var history = useHistory();
    useSelector(store.getState);
//  const result:any = useSelector(()=> store.getState().authState.isLogged)
    const isLogged = () =>{ if(store.getState().authState.isLogged){
     
      return <NavLink exact to="/Logout">Logout</NavLink>;
    
    } else{
      return <NavLink exact to="/Login">Login</NavLink>
    }
  }
    var Login = ()=>{  
        history.push("/Login");
    }

     var Log_out = ()=>{  
        history.push('');
    }

    // const [clientType] = useState(store.getState().authState.user.clientType) //taken from Aside.tsx line 10
    // const [clientType] = useState(localStorage.getItem("user")) // maybe you can use just this instead?
    const { email, role } = useSelector((state) => ConfigureStore.getState().LoginSlice);

    return(
        <div className="Header py-3 shadow-sm">
            <Link to="/">  {/* הוספת לינק שיפנה למסך הבית בלחיצה על לוגו */}
            <h3 className="font-weight-bold text-primary mx-1">Coupon System</h3>
             </Link>
           

        <div className="InHeader d-flex justify-content-center  shadow-sm">
          
             {role === undefined && <div className="inHeader ml-auto d-flex mr-3">
             <div>
             <button className="btn btn-primary btn-s mx-1 " onClick={Login}>Login</button>
             </div>
            </div>}

                {/* בר אדמין */}
            {role === 'admin' && <div className="inHeader ml-auto d-flex mr-3">
            <Link  to="/GetCustomerCoupons/">
              <button className="btn btn-primary btn-xs mx-2">Customer coupons</button>
            </Link>
            <Link  to="/GetCompanyCoupons/">
              <button className="btn btn-primary btn-xs ms-2">Company coupons</button>
            </Link>
            <Link  to="/CustomersTable">
              <button className="btn btn-primary btn-xs ms-2 ">Manage customers</button>
            </Link>
            <Link  to="/CompaniesTable">
              <button className="btn btn-primary btn-xs ms-2 ">Manage companies</button>
              </Link>
              <Link  to="/CouponStore">
            <button className="btn btn-primary btn-s mx-1 " onClick={Logout}>Logout</button>
            </Link>
              <div>
             {/* <button className="btn btn-primary btn-s mx-1 " onClick={Logout}>Logout</button> */}
             
             </div>
            </div>}

            {role === 'company' && <div className="inHeader ml-auto d-flex mr-3">
            <Link  to="/GetCompanyDetails">
              <button className="btn btn-primary btn-xs mx-5">Company details</button>
            </Link>
            <Link  to="/SingleCompanyTable">
              <button className="btn btn-primary btn-xs mx-5">Coupons management</button>
            </Link>
            <div>
             {/* <button className="btn btn-primary btn-s mx-1 " onClick={Logout}>Logout</button> */}
              {/* <NavLink exact to="/Logout">Logout</NavLink> */}
              {isLogged()}
             </div>
            </div>}

            {role === 'customer' && <div className="inHeader ml-auto d-flex mr-3">
                <NavLink className="navLink" exact to="/CouponPurchase" >Purchase coupons</NavLink>
                <NavLink className="navLink" exact to="/GetCustomerDetails" >My details</NavLink>
                <NavLink className="navLink" exact to="/SingleCustomerTable/" >My coupons</NavLink>
                <div>
             {/* <button className="btn btn-primary btn-s mx-1 " onClick={Logout}>Logout</button> */}
             </div>
            </div>}
        </div>
        </div>
    );
}

export default Header;