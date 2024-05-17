import { Link, useNavigate } from "react-router-dom";
function Header() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const handleClick = () => {
        const token = localStorage.getItem("token")
        navigate("/")
        if(token){
            localStorage.clear("token")
        } else {
            navigate("/login")
        }
    
    }
    return(
        <header>
            <ul>
            <Link to={"/"}><li>Home</li></Link>
              <Link to={"/about-us"}><li>About</li></Link> 
            </ul>
            <button
            style={{float: "right"}}
            onClick={handleClick}
            >{token ? `Logout` : `Login`}</button>
        </header>
    )
}
export default Header;