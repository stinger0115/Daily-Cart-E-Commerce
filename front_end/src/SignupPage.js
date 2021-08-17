import React,{useState} from 'react';
import './SignupPage.css';
import axios from 'axios';



function SignupPage() {        
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
    });
    
    const handleSingupFormSubmit = (event) => {
        event.preventDefault();
        // console.log(newUser);
        //making request to backend for registering with using root by setting proxy at package.json
        axios.post("/register", {
            newUser:newUser
        }).then((data) => {
            console.log(data);
            window.location="/login"
        })
        .catch((err) => {
            // console.log(`Error While Registration ${err} AND ${err.response.data.message}`);
            alert(`${err.response.data.message} Please Try Again :)`); 
        })
    }

    return (
        <div className="LoginPage">
            <div className="loginContainer">
                {/* left container */}
                <div className="leftContainer">
                    <p className="pageHeading1">SIGNUP</p>
                    <form onSubmit={ handleSingupFormSubmit }>
                        <div className="nameContainer">
                            {/* first name */}
                            <div className="innerContainer firstContainerInner">
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" placeholder="First Name"
                                    onChange={(event) => setNewUser((preval) => {
                                        return {
                                            firstName: event.target.value,
                                            lastName:preval.lastName,
                                            email:preval.email,
                                            confirmEmail:preval.confirmEmail,
                                            password:preval.password,
                                            confirmPassword:preval.confirmPassword,
                                        }
                                    })}
                                />
                            </div>
                            {/* last name */}
                            <div className="innerContainer lastContainerInner">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" placeholder="Last Name"
                                    onChange={(event) => setNewUser((preval) => {
                                        return {
                                            firstName: preval.firstName,
                                            lastName: event.target.value,
                                            email: preval.email,
                                            confirmEmail: preval.confirmEmail,
                                            password: preval.password,
                                            confirmPassword: preval.confirmPassword,
                                        }
                                    })}
                                />
                            </div>                            
                        </div>
                        {/* email */}
                        <div className="innerContainer">
                            <label for="emailInput">Email</label>
                            <input type="email" id="emailInput" placeholder="Email"
                                onChange={(event) => setNewUser((preval) => {
                                        return {
                                            firstName: preval.firstName,
                                            lastName: preval.lastName,
                                            email: event.target.value,
                                            confirmEmail: preval.confirmEmail,
                                            password: preval.password,
                                            confirmPassword: preval.confirmPassword,
                                        }
                                    }
                                )}
                            />
                        </div>
                        {/* confirm email */}
                        <div className="innerContainer">
                            <label for="confirmEmailInput">Confirm Email</label>
                            <input type="email" id="confirmEmailInput" placeholder="Confirm Email"
                                onChange={(event) => setNewUser((preval) => {
                                        return {
                                            firstName: preval.firstName,
                                            lastName: preval.lastName,
                                            email: preval.email,
                                            confirmEmail: event.target.value,
                                            password: preval.password,
                                            confirmPassword: preval.confirmPassword,
                                        }
                                    }
                                )}
                            />
                        </div>
                        
                        <div className="passwordContainer">
                            {/* password */}
                            <div className="innerContainer firstContainerInner">
                                <label for="passwordInput">Password</label>
                                <input type="text" id="passwordInput" placeholder="Password"
                                onChange={(event) => setNewUser((preval) => {
                                        return {
                                            firstName: preval.firstName,
                                            lastName: preval.lastName,
                                            email: preval.email,
                                            confirmEmail: preval.confirmEmail,
                                            password:event.target.value,
                                            confirmPassword: preval.confirmPassword,
                                        }
                                    }
                                )}
                                />
                            </div>
                            {/* confirm password */}
                            <div className="innerContainer lastContainerInner">
                                <label for="confirmPasswordInput">Confirm Password</label>
                                <input type="text" id="confirmPasswordInput" placeholder="Confirm Password"
                                onChange={(event) => setNewUser((preval) => {
                                        return {
                                            firstName: preval.firstName,
                                            lastName: preval.lastName,
                                            email: preval.email,
                                            confirmEmail: preval.confirmEmail,
                                            password: preval.password,
                                            confirmPassword: event.target.value,
                                        }
                                    }
                                )}
                                />
                            </div>                            
                        </div>
                        <div className="btnContainer">
                            <button type="submit" className="submitBtn">Submit</button>
                        </div>
                    </form>
                </div>
                {/* right container */}
                <div className="rightContainer">
                    <div className="rightInnerContainer">
                        <p className="p1">WELCOME HOME</p>
                        <p className="p2">JOIN THE FAMILY!</p>
                        <p className="p2">10000000+ Happy Customers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;