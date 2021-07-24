import "./Layout.css"
import Header from "../Header/Header"
import AsideMenu from "../Aside/Aside";
import Copyright from "../Footer/Footer"
import Home from "../../MainArea/Home/Home"

import { BrowserRouter } from "react-router-dom"
import Routing from "../../Routing/Routing"
import CompaniesTable from "../../Tables/CompaniesTable/CompaniesTable"
import CustomerTable from "../../Tables/CustomersTable/CustomersTable"
import Aside from "../Aside/Aside";

//func    name     return type
function Layout():JSX.Element{ //JSX.Element = The component UI
    return (
        <div className="Layout">
            <BrowserRouter>
                {/*<header>*/}
                <Header/>
                {/*</header>*/}
                <aside>
                    <Aside/>
                </aside>
                <main className="container">
                <Routing/>
                {/* <CompaniesTable/>
                <CustomerTable/> */}
                </main>
                <footer>
                   <Copyright/>
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default Layout;