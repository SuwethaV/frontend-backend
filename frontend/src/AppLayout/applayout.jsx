import React from "react";

import NavBar from "../components/navbar/navbar";
import Home from "../pages/Home";
import About from "../pages/about";
import Form from "../pages/form";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function AppLayout(){
    return(
    /*<div>
        <Loginform />
    </div>*/
    <>
    <Router>
        
        <NavBar />
        <Routes>
            <Route path="/"element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/form" element={<Form />}/>
           



        </Routes>

    </Router>
    
    </>
    )

}
export default AppLayout;
