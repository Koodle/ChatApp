/*
-contains the whole app, of all the combined componenets into an "App" componenent
-create separate .js files for each component & import them into this file where we can stack them together
*/
import React from "react";

//components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Chat from './components/Chat/Chat';
import Error from './components/Error';
import ProtectedRoute from "./components/Router/ProtectedRoute";

//BrowserRouter is aliased as Router
//BrowserRouter - used for doing client side routing with URL segments
//Routes - 
//Route - Route is the conditionally shown component that renders some UI when its path matches the current URL
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";  //https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import

//styles
import './App.scss';
//font awesome library
import { library } from '@fortawesome/fontawesome-svg-core';
//select icons
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons';
import { faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell } from '@fortawesome/free-solid-svg-icons';
//store icons in library
library.add(faSmile, faImage, faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell);


function App() {
  return (
    <Router>
      <div className='App'>
      <Routes>
        
        <Route element={<ProtectedRoute/>}> 
          <Route path="/" element={<Chat />}/> 
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="*" element={<Error />} />
      </Routes>
      </div>
    </Router>    
  );
}

export default App;