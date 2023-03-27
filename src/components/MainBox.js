import { Box } from "@mui/material";
import React from "react";

const MainBox = ({data,setter,setLoader}) => {
    return(
        <Box 
        id={"mainBox"}
        onClick={()=>{
            setter(data)
            setLoader(true)
        }}
        style={{cursor:"pointer",display:"flex",flexDirection:"column",padding:"10px",textAlign:"center",justifyContent:"center",alignItems:"center",width:"30%",height:"200px",overflow:"scroll",margin:10,borderRadius:10,background:"white",border:"1px solid rgba(0,0,0,0.2)"}}>
            <p style={{fontSize:18,fontWeight:700,width:"100%"}}>{data?.title}</p>
            <p style={{fontWeight:400,fontSize:12,marginTop:-10}}>{`opened by ${data?.user?.login||"user"} created at ${new Date(data?.created_at)?.toLocaleString()}`}</p>
        </Box>
    )
}

export default MainBox