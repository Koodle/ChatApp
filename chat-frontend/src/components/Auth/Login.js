//useState - a way of adding properties to this component withought creating a JS class
import React, {useState} from "react";
//styles
import "./Auth.scss"
import loginImage from "../../assets/images/login.svg"
//Link - is like HTML anchor tag <a>
//useNavigate - to navigate to another route
import {Link, useNavigate} from "react-router-dom"; //to navigate to another screen
//useDispatch - to call any ACTIONS
import {useDispatch} from "react-redux"
//Action to login
import {login} from "../../store/actions/auth" 


const Login = () => {

    //variables to track the info in the form
    const [email, setEmail] = useState("john.doe@gmail.com")  //https://stackoverflow.com/questions/53165945/what-is-usestate-in-react#answer-53166194
    const [password, setPassword] = useState("secret")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitForm = (e) => {
        //we dont want to execute the default behaviour of form submission,
        //since we want to implement our own logic here
        e.preventDefault()

        //dispatch login's auth.js action here
        dispatch(login({email, password}, navigate))  //when user logs in, send to chat screen

    }

    return (
        <div id="auth-container">
            <div id="auth-card">
                <div>
                    <div id="image-section">
                        <img src={loginImage} alt="login" />
                    </div>
                    <div id="form-section">
                        <h2>Welcome Back</h2>

                        <form onSubmit={submitForm}>  
                            <div className="input-field mb-1">
                                <input 
                                    onChange={e => setEmail(e.target.value )}   //https://stackoverflow.com/questions/67014481/what-is-event-target-value-in-react-exactly
                                    value={email}
                                    required="required"
                                    type="text"
                                    placeholder="Email" />
                            </div>

                            <div className="input-field mb-2">
                                <input 
                                    onChange={e => setPassword(e.target.value )}
                                    value={password}
                                    required="required"
                                    type="text"                                   
                                    placeholder="Password" />
                            </div>

                            <button>LOGIN</button>
                        </form>

                        <p>Don't have an account? <Link to="/Register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login