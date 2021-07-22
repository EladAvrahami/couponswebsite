
import Logo from "../../LayoutArea/Logo/Logo";
import Routing from "../../Routing/Routing";
import "./Home.css"
//import Discount from "../Discount/Discount"
//import Special from "../Specials/Special"

function Home():JSX.Element{
    return(
        <div className="Home ">

            {/* Interpolation: */}
            {/*<Discount/> */}
                <h1>Welcome to the coupons "R" us website!</h1>
                <h2>Your No. 1 website for purchasing coupons!</h2>
                <Logo/>
                <Routing/>
            {/* Conditional Rendering*/}
          {/*   <Special/> */}
        
        </div>
    );
}

export default Home;