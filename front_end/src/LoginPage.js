import React,{useState} from 'react';
import './LoginPage.css';
import axios from 'axios';


function LoginPage() {
    const [currUser, setCurrUser] = useState({
        email: "",
        password: ""
    });

    const handleLoginFormSubmit = (event) => {
        event.preventDefault();
        console.log(currUser);
        //GET request is not used because we have to use queryString as in get request we can't pass data in body
        //so for reading as well we have used post request not get request which is against rest principles
        axios.post("/loggingin", {
            "email": currUser.email,
            "password":currUser.password
        }).then((data) => {
            alert("Logged In Successfully. Enjoy Shopping :)")
            window.location = "/";
        }).catch((err) => {
            console.log(`Error while logging in ${err}`);
            alert('Error while Logging in');
        })
    }

    return (
        <div className="LoginPage">
            <div className="loginContainer">
                {/* left container */}
                <div className="containerLeft">
                    <div className="contentContainer">
                        <p className="p1">WELCOME BACK!</p>
                        <p className="p2">To Keep Connected With Us Please Login With Your Personal Info.</p>
                    </div>
                </div>
                {/* right container */}
                <div className="containerRight">
                    <p className="pageHeading">LOGIN</p>
                    {/* login form */}
                    <form onSubmit={ handleLoginFormSubmit } id="loginForm">
                        {/* email input */}
                        <label for="emailInput" className="inputLabels">Email</label>
                        <input id="emailInput" type="text" placeholder="Enter Email"
                            onChange={(event) => setCurrUser((preval) => {
                                return {
                                    email: event.target.value,
                                    password:preval.password
                                }
                            })}
                        />
                        {/* password input */}
                        <label for="passwordInput" className="inputLabels">Password</label>
                        <input id="passwordInput" type="text" placeholder="Enter Password"
                            onChange={(event) => setCurrUser((preval) => {
                                return {
                                    email: preval.email,
                                    password: event.target.value
                                }
                            })}
                        />
                        {/* submit button */}
                        <div className="btnContainer">
                            <button type="Submit" for="loginForm" className="submitBtn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;