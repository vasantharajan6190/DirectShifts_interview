import { Box } from '@mui/material';
import React from 'react';
import "./components.css";
import { IssuesLogo, IssuesLogoOpen, PullLogo, PullLogoOpen } from '../assests/svg';


const ListView = ({data,index,setPullsDetailedView,type}) => {
    return (
        <Box 
        id={"listBox"}
        key={`list-${index}`} 
        style={{display:"flex",flexDirection:"column",
        justifyContent:"center",alignItems:"flex-start",
        padding:"10px 20px",
        margin:"2px 0px",
        }}>
            <p onClick={()=>setPullsDetailedView(data)} 
               id="listTitle" style={{fontSize:20,fontWeight:700,cursor:"pointer"}}>
            <span style={{marginRight:3}}>{type=="issues"? data?.closed_at? IssuesLogo:IssuesLogoOpen
            :
            data?.closed_at?PullLogo:PullLogoOpen}</span>
            {data?.title||"Default"}</p>
            <div style={{fontWeight:500,fontSize:12,marginTop:-20,display:"flex",}}>
                <p
                onClick={()=>window.open(data?.html_url,"_blank")}
                style={{color:"rgba(0,0,0,0.5)",cursor:"pointer",marginRight:2}}>#{data?.number}</p>
                <p>{`opened by ${data?.user?.login||"user"} created at ${data?.created_at}`}</p>
                </div>
        </Box>
    )
}

export default ListView