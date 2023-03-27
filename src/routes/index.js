import React, { Fragment, lazy, } from "react";
import { Route, Routes } from "react-router-dom";
import SubHeader from "../containers/SubHeader";

const Issues = lazy(()=>import("../pages/Issues"));
const Pulls = lazy(()=>import("../pages/Pulls"));


const AppRouter = ()=>{
    return(
        <Fragment>
            <SubHeader/>
        <Routes>
            <Route path="/pulls" element={<Pulls/>}/>
            <Route path="/issues" element={<Issues/>}/>
            <Route path="/" element={<Pulls/>}/>
        </Routes>
        </Fragment>
    )
}

export default AppRouter