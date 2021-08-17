import React,{useState,useEffect} from 'react';
import { NavLink,Link } from 'react-router-dom';
import './Header.css';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import axios from 'axios';
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import ContactsIcon from "@material-ui/icons/Contacts";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";


function Header() {
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logOut, setLogOut] = useState(false);

    useEffect(() => {
        axios.get("/verify", {
            withCredentials:true
        })
        .then((data)=>{       
            // console.log(data.data.user);
            setUser(data.data.user.firstName);
            setIsLoggedIn(true);
        })
        .catch((err) => {
            setIsLoggedIn(false);
        })
    }, [])

    useEffect(() => {
        if (logOut === false) return;

        axios.get("/logout")
        .then((data)=>{
            setIsLoggedIn(false);
            alert('SuccessFully Logged Out');
            window.location = "/";
        })
        .catch((err)=>{
            alert('Error While Logging out Please try again :).')
        })
    }, [logOut])
    


    return (
        <div className="Header">
            <Link to="/home" className="logoContainer">
                <h3>DAILY CART</h3>
                <AddShoppingCartIcon/> 
            </Link>
            <div className="linksContainer">
                <NavLink to="/home" className="links"><HomeIcon style={{'paddingBottom':'5px'}}/> Home</NavLink>
                <NavLink to="/cart" className="links"><ShoppingCartIcon style={{'paddingBottom':'5px'}}/> Go To Cart</NavLink>
                <NavLink to="/about" className="links"><ListIcon style={{'paddingBottom':'5px'}}/> About Us</NavLink>
                <NavLink to="/contact" className="links"><ContactsIcon style={{'paddingBottom':'5px'}}/> Contact Us</NavLink>
            </div>
            <div className="accountContainer">
                {
                    isLoggedIn === false ? (
                        <div className="accountDetailContainer">
                            <NavLink to="/login" className="links"><VpnKeyIcon style={{'paddingBottom':'5px'}}/> Login</NavLink>
                            <NavLink to="/signup" className="links"><LockOpenIcon style={{'paddingBottom':'5px'}}/> Signup</NavLink>
                        </div>) :
                        (<div className="accountDetailContainer">
                            <p>Hii {user}</p>
                            <button className="links singOut" onClick={ ()=> setLogOut(true) }><ExitToAppIcon style={{'paddingBottom':'2px'}}/> SignOut</button>
                        </div>)
                }
                {/* this span in cart will only be visible when we add something in cart i.e cart length increases */}
                <NavLink to="/cart" className="cartIcon"><ShoppingCartIcon/><span className="dot"></span></NavLink>
            </div>
        </div>
    )
}

export default Header;