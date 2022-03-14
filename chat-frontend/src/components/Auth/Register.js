import React, {useState} from "react";
import registerImage from "../../assets/images/register.svg"
import {Link, useNavigate} from "react-router-dom";

import {useDispatch} from "react-redux"  //in order to dispatch action
import {register} from "../../store/actions/auth"

import "./Auth.scss"
const Register = () => {

    //variables to track the info in the form
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("male")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitForm = (e) => {
        //we dont want to execute the default behaviour of form submission,
        //since we want to implement our own logic here
        e.preventDefault()

        //dispatch login's auth.js action here
        dispatch(register({firstName, lastName, email, gender, password}, navigate))  //when user logs in, send to chat screen

    } 

    return (
        <div id="auth-container">
            <div id="auth-card">
                <div>
                    <div id="image-section">
                        <img src={registerImage} alt="register" />
                    </div>
                    <div id="form-section">
                        <h2>Create an account</h2>

                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input
                                    onChange={(e) => setFirstName(e.target.value )}  //change the "useState" variable
                                    value={firstName}  //The initial value of the control
                                    required="required"
                                    type="text"
                                    placeholder="First Name" />
                            </div>

                            <div className="input-field mb-1">
                                <input 
                                onChange={(e) => setLastName(e.target.value )}  
                                value={lastName}  
                                required="required"
                                type="text"placeholder="Last Name" />
                            </div>
                            
                            <div className="input-field mb-1">
                                <input 
                                onChange={(e) => setEmail(e.target.value )}  
                                value={email}  
                                required="required"
                                type="text"placeholder="Email" />
                            </div>

                            <div className="input-field mb-1">
                                <select
                                onChange={(e) => setGender(e.target.value )}  
                                value={gender}  
                                required="required">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="input-field mb-2">
                                <input 
                                onChange={(e) => setPassword(e.target.value )}  
                                value={password}  
                                required="required"
                                type="password"
                                placeholder="Password" />
                            </div>

                            <button>REGISTER</button>
                        </form>

                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register