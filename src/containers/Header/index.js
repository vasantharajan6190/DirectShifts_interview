import { Box } from "@mui/material";
import React from "react";

const Header = () => {
    return(
        <Box sx={{height:"8%",background:"linear-gradient(90deg, #B52E6B 0.12%, #92357B 46.2%, #783985 96.25%)",overflow:"scroll",display:"flex",padding:"20px 10px",justifyContent:"center",alignItems:"center"}}>
            <p style={{color:"white",fontWeight:500,fontSize:26}}>facebook/<span style={{fontWeight:700}}>react</span></p>
            <p style={{borderRadius:18,padding:"5px 18px",border:"1px solid white",fontSize:13,fontWeight:500,color:"white",marginLeft:8}}>Public</p>
        </Box>
    )
}

export default Header
