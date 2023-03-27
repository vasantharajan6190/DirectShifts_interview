import { Box } from "@mui/material";
import React,{useEffect, useState} from "react";
import { useNavigate,useLocation } from "react-router-dom";



const SubHeader = () => {
    const [currentTab,setCurrentTab] = useState("pulls")
    const location = useLocation()
    useEffect(()=>{
        if(location?.pathname?.split("/")[1] === "issues") setCurrentTab("issues")
        else setCurrentTab("pulls")
    },[])
    const navigate = useNavigate();
    const BorderBottomTag = (<span style={{bottom:0,position:"absolute",width:"30%",height:"4px",background:"#FD8C73"}}></span>)
    return(
        <Box sx={{width:"100%",height:"8%",position:"relative",background:"rgba(0,0,0,0.8)",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <p 
            style={{color:"white",cursor:"pointer",display:"flex",fontWeight:500,justifyContent:"center",borderRight:"1px solid gray",width:"50%"}} onClick={()=>{
                setCurrentTab("pulls")
                navigate("/pulls")
                }}>PULL REQUESTS
            {currentTab === "pulls" && BorderBottomTag}
            </p>
            <p 
            style={{color:"white",cursor:"pointer",display:"flex",fontWeight:500,justifyContent:"center",width:"50%"}} 
            onClick={()=>{
                setCurrentTab("issues")
                navigate("/issues")
                }}>ISSUES
            {currentTab === "issues" && BorderBottomTag}
            </p>
        </Box>
    )
}

export default SubHeader