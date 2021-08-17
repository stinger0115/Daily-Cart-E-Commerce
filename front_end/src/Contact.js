import React,{useEffect,useState} from 'react';
import './Contact.css';
import axios from 'axios';
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import LocationCityIcon from "@material-ui/icons/LocationCity";


function Contact() {
    const [userMessage, setUserMessage] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message:""
    })
    useEffect(() => {
      axios.get("/verify", {
        withCredentials:true
      })
      .then((data)=>{            
        console.log(data);
      })
      .catch((err) => {
        alert("Unauthorized!! Please Login To Continue :)");
        window.location = "/login";
      })
    }, []);

    const handleContactFormSubmit = (event) => {
        event.preventDefault();
        console.log(userMessage);
    }

    return (
      <div className="contactPage">
        <div className="contactContainer">
          <div className="contactLeftContainer">
            <div className="socialLinksContainer">
              <div className="socialLinksInnerContainer">
                <div className="firstLink">
                  <span className="iconContainer">
                    <PhoneIcon style={{ fontSize: "22px", color: "#3ace3a" }} />
                  </span>
                  <a href="#" className="">
                    +123456789
                  </a>
                </div>
                <div className="firstLink">
                  <span className="iconContainer">
                    <MailIcon style={{ fontSize: "22px", color: "#E47158" }} />
                  </span>
                  <a href="#" className="">
                    sahillohchab2797@gmail.com
                  </a>
                </div>
              </div>
              <div className="socialLinksInnerContainer">
                <div className="firstLink">
                  <span className="iconContainer">
                    <TwitterIcon
                      style={{ fontSize: "22px", color: "dodgerblue" }}
                    />
                  </span>
                  <a href="#" className="">
                    Official Daily Cart
                  </a>
                </div>
                <div className="firstLink">
                  <span className="iconContainer">
                    <LinkedInIcon style={{ fontSize: "22px", color: "blue" }} />
                  </span>
                  <a href="#" className="">
                    Daily Cart Pvt Ltd.
                  </a>
                </div>
              </div>
              <div className="socialLinksInnerContainer">
                <div className="firstLink">
                  <span className="iconContainer">
                    <FacebookIcon
                      style={{ fontSize: "22px", color: "darkblue" }}
                    />
                  </span>
                  <a href="#" className="">
                    Daily__Cart__Official
                  </a>
                </div>
                <div className="firstLink">
                  <span className="iconContainer">
                    <InstagramIcon
                      style={{ fontSize: "22px", color: "rgb(233, 89, 80)" }}
                    />
                  </span>
                  <a href="#" className="">
                    Daily__Cart__Pvt.
                  </a>
                </div>
              </div>
            </div>
            <div className="hoursContainer">
              <div className="innerHoursContainer callingContainer">
                <p className="timingHeading">Calling Timings:</p>
                <div>
                  <p className="daysHeading">Monday To Friday</p>
                  <p className="timeHeading">09:00A.M -- 17:00P.M</p>
                </div>
                <div>
                  <p className="daysHeading">Saturday</p>
                  <p className="timeHeading">09:00A.M -- 12:00P.M</p>
                </div>
              </div>
              <div className="innerHoursContainer">
                <p className="timingHeading">Office Timings:</p>
                <div>
                  <p className="daysHeading">Monday To Friday</p>
                  <p className="timeHeading">08:00A.M -- 19:00P.M</p>
                </div>
                <div>
                  <p className="daysHeading">Saturday</p>
                  <p className="timeHeading">08:30A.M -- 14:00P.M</p>
                </div>
              </div>
            </div>
            <div className="officeContainer">
              <div className="buildingLogoContainer">
                <LocationCityIcon style={{ fontSize: "120px" }} />
              </div>
              <div className="addressContainer">
                <p className="addressHeading">Office HeadQuarters</p>
                <div className="streetAddress">
                  <p>DailyCart Private Limited,</p>
                  <p>Alyssa Buildings, Inner Ring Road</p>
                  <p>Devarabeesanahalli Village,</p>
                  <p>Bengaluru 560103,</p>
                  <p>Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contactRightContainer">
            <p>Give Us A Shout</p>
            <div className="contactFormContainer">
              <form onSubmit={handleContactFormSubmit}>
                <div className="nameContainer">
                  {/* first name */}
                  <div className="innerContainer firstContainerInner">
                    <label for="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      onChange={(event) =>
                        setUserMessage((preval) => {
                          return {
                            firstName: event.target.value,
                            lastName: preval.lastName,
                            email: preval.email,
                            message: preval.message,
                          };
                        })
                      }
                    />
                  </div>
                  {/* last name */}
                  <div className="innerContainer lastContainerInner">
                    <label for="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      onChange={(event) =>
                        setUserMessage((preval) => {
                          return {
                            firstName: preval.firstName,
                            lastName: event.target.value,
                            email: preval.email,
                            message: preval.message,
                          };
                        })
                      }
                    />
                  </div>
                </div>
                <div className="innerContainer">
                  <label for="emailInput">Email</label>
                  <input
                    type="email"
                    id="emailInput"
                    placeholder="Email"
                    onChange={(event) =>
                      setUserMessage((preval) => {
                        return {
                          firstName: preval.firstName,
                          lastName: preval.lastName,
                          email: event.target.value,
                          message: preval.message,
                        };
                      })
                    }
                  />
                </div>
                <div className="innerContainer">
                  <label for="messageInput">Message</label>
                  <textarea
                    rows="5"
                    cols=""
                    id="messageInput"
                    placeholder="Enter Your Message"
                    onChange={(event) =>
                      setUserMessage((preval) => {
                        return {
                          firstName: preval.firstName,
                          lastName: preval.lastName,
                          email: preval.email,
                          message: event.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="btnContainer">
                  <button type="submit" className="submitBtn">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Contact;