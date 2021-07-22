import React from "react";
import AsideMenu from "../../../LayoutArea/Aside/Aside";
import "./customerPage.css";
import SingleCustomerTable from "../../../Tables/SingleCustomerTable/SingleCustomerTable";

function customerPage(): JSX.Element {
    return (
        <div className="customerPage">
			
            <main>
                <SingleCustomerTable/>
            </main>
        </div>
    );
}

export default customerPage;
