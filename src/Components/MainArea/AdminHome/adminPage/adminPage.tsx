import AsideMenu from "../../../LayoutArea/Aside/Aside";
import Menu from "../../../LayoutArea/Aside/Aside";
import CompaniesTable from "../../../Tables/CompaniesTable/CompaniesTable";
import CustomersTable from "../../../Tables/CustomersTable/CustomersTable";
import "./adminPage.css";

function adminPage(): JSX.Element {
    return (
        <div className="adminPage">
			
            <main>
                <CompaniesTable/>
                <CustomersTable/>
            </main>
        </div>
    );
}

export default adminPage;
