import { Box } from "@mui/material";
import React from "react";
import { GithubLogo } from "../../assests/svg";


const Footer = () => {
    return(
        <Box sx={{width:"100%",padding:"3px 20px",background:"rgb(230, 230, 230) !important"}}>
            <p style={{display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{marginRight:4}}>{GithubLogo}</span> 2023 Github,Inc.</p>
            <p style={{fontSize:10,textAlign:"center",marginTop:-15}}>Contact:mahaperiyavar100@gmail.com</p>
        </Box>
    )
}

export default Footer
