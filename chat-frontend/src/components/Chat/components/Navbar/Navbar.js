//useState - a way of adding properties to this component withought creating a JS class
/*fragment - allows us to wrap jsx code & other components inside but when it gets rendered, it will only render those componenets, without any wrapping element/node because fragments are not rendered to the DOM.
So basically we use React.Fragment where we would normally use a wrapper div. https://dev.to/tumee/react-fragments-what-why-how-2kh1*/
import React, { useState, Fragment } from "react" 
//useSelector - to access the store
//useDispatch - to call any ACTIONS
import {useSelector, useDispatch } from "react-redux"  
//to use font awesome in a react component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//Action to logout
import { logout } from "../../../../store/actions/auth"
//Action to update profile
import { updateProfile } from "../../../../store/actions/auth" 
//Modal Component
import Modal from "../../../Modal/Modal"  

import "./Navbar.scss"

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.authReducer.user)


    //we use these state properties to toggle visiblity of Component
    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false) 

    //variables to track the info in the form
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [gender, setGender] = useState(user.gender)
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState("")

    const submitForm = async (e) => {
        //we dont want to execute the default behaviour of form submission,
        //since we want to implement our own logic here
        e.preventDefault()

        const form = {firstName, lastName, email, gender, avatar}
        if(password.length > 0 ) form.password = password

        //since uploading image, use a form data object to upload
        const formData = new FormData()

        //create the key value pairs
        for(const key in form){
            formData.append(key, form[key])
        }

        //dispatch action
        await dispatch(updateProfile(formData)).then(() => {
            setShowProfileModal(false)
        })

    } 


    return (
        <div id="navbar">
            <h2>Chat.io</h2>
            {/* profile */}
            <div onClick={()=>{setShowProfileOptions(!showProfileOptions)}} id="profile-menu">
                <img width={"40"} height={"40"} src={user.avatar} alt="Avatar"/> 
                <p>{user.firstName} {user.lastName}</p>
                <FontAwesomeIcon icon={"caret-down"} className="fa-icon"/>


                {/* dropdown */}
                {   
                    /* If you're just checking for a condition
                    and don't want to render a particular piece of code that doesn't comply, 
                    you can use the && operator. */
                    showProfileOptions && 
                    <div id="profile-options">
                        <p onClick={()=>{setShowProfileModal(true)}}>Update Profile</p>
                        <p onClick={()=>{dispatch(logout())}}>Logout</p>
                    </div>
                }

                {/* Update Profile Form */}
                {
                    showProfileModal &&
                    <Modal click={()=>setShowProfileModal(false)}> {/*click func passed into <Modal> component as a prop */}
                        {/* All of these Fragments/elements are passed to the Modal component as props.children as an array*/}
                        {/* Assign a key to each fragment to differentiate between them, in the Model component */}
                        <Fragment key={"header"}>
                            <h3 className="m-0">Update profile</h3>
                        </Fragment>

                        <Fragment key={"body"}>
                            <form id="form-update-profile">
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
                                
                                <div className="input-field mb-2">
                                    <input 
                                    onChange={(e) => setAvatar(e.target.files[0])}  
                                    type="file" />
                                </div>
                            </form>
                        </Fragment>

                        <Fragment key={"footer"}>
                        <button className='btn-success' onClick={submitForm}>UPDATE</button>
                        </Fragment>

                    </Modal>
                }

            </div>
        </div>
    );
}

export default Navbar