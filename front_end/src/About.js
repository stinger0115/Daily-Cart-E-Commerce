import React,{useEffect} from 'react';
import './About.css';
import axios from 'axios';
import GetAppIcon from "@material-ui/icons/GetApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CategoryIcon from "@material-ui/icons/Category";
import CheckBoxIcon from "@material-ui/icons/CheckBox";



function About() {
    //you cannot use async function definition inside useEffect
    useEffect(() => {
        //withCredentials keeps in mind that the cookie i.e stored on browser is sent to backend for authentication       
        axios.get("/verify", {
            withCredentials:true
        })
        .then((data) => {
            console.log(data.data.message);
        })
        .catch((err) => {
            // console.log(`Error while requesting about to backend ${err.response.data.message}`);
            alert("Unauthorized!! Please Login To Continue :)");
            window.location = "/login";
        })
    }, []);

    return (
        <div className="About">
            <div className="aboutContainer">
                <div className="aboutLeftContainer">
                    <h1>About Us</h1>
                                
                    <p className="firstPara">
                        To be Earth’s most customer-centric company, where customers can
                        find and discover anything they might want to buy online, and
                        endeavors to offer its customers the lowest possible prices.
                    </p>
                    <p className="secondPara">
                        DailyCart pioneers communities built on commerce, sustained by trust, and inspired by
                        opportunity. DailyCart brings together millions of people every
                        day on a local, national and international basis through an array
                        of websites that focus on commerce, payments and communications
                    </p>                    
                </div>
                <div className="aboutRightContainer">
                    <div className="innerTileContainer">
                        <div className="aboutusTile firstTile">
                            <div className="tileImgContainer">
                                <GetAppIcon style={{fontSize: '80px',color:'dodgerblue'}}/>
                            </div>
                            <div className="tileContentContainer">
                                <h3>300 MILLION</h3>
                                <p>Registered Consumer Base</p>
                            </div>
                        </div>
                        <div className="aboutusTile secondTile">
                            <div className="tileImgContainer">
                                <CheckBoxIcon style={{fontSize: '80px',color:'#77dd77'}}/>
                            </div>
                            <div className="tileContentContainer">
                                <h3>150 MILLION</h3>
                                <p>Listed Products</p>
                            </div>
                        </div>
                    </div>
                    <div className="innerTileContainer">
                        <div className="aboutusTile thirdTile">
                            <div className="tileImgContainer">
                                <CategoryIcon style={{fontSize: '80px',color:'#e9a654'}}/>
                            </div>
                            <div className="tileContentContainer">
                                <h3>80+</h3>
                                <p>Categories</p>
                            </div>
                        </div>
                        <div className="aboutusTile fourthTile">
                            <div className="tileImgContainer">
                                <AccountCircleIcon style={{fontSize: '80px',color:'rgb(238, 152, 154)'}}/>
                            </div>
                            <div className="tileContentContainer">
                                <h3>200,000</h3>
                                <p>Sellers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;