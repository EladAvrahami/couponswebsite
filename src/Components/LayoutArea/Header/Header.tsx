import { NavLink, useHistory } from "react-router-dom";
import "./Header"

function Header():JSX.Element{
    var history = useHistory();
    var Login = ()=>{ //כפתור שיעבוד 
        history.push("/Login");
    }

    return(
        <div className="Header container">
            <div><button onClick={Login}>Login</button></div>
          header broooo <br />
         
        
        </div>
    )
}

export default Header;