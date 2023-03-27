import { Box, Button, Stack } from "@mui/material";
import React from "react";
import CommentBox from "./CommentBox";
import { DetailedViewClosedLogo, DetailedViewOpenLogo } from "../assests/svg";


const DetailedView = ({
    detailedView,
    comments,
    setDetailedView,
    setComments,
    type,
}) => {
    return(
        <Box>
            <Stack>
                <Box sx={{width:"100%",display:"flex",justifyContent:"flex-start",position:"relative",marginBottom:5}}>
                  <p style={{fontWeight:800,fontSize:20,margin:"10px auto"}}>DETAILED VIEW</p>
                  <Button 
                  sx={{textTransform:"none",padding:"5px 25px",width:"fit-content",position:"absolute",right:0,bottom:-23}}
                  onClick={()=>{
                    setDetailedView("")
                    setComments("")
                  }} variant="contained">Back</Button>
                  </Box>
                  <p style={{fontSize:28,fontWeight:500}}>{detailedView?.title}:
                  <span 
                  onClick = {()=>window.open(detailedView?.html_url,"_blank")}
                  style={{color:"rgba(0,0,0,0.6)",cursor:"pointer"}}>#{detailedView?.number}</span>
                  </p>
                  <Box sx={{background:detailedView?.closed_at?"#8250DF":"#2BA44E",width:"40px",height:"35px",fontWeight:"700",
                  marginTop:-2,marginBottom:5,padding:"0px 30px",justifyContent:"center",borderRadius:10,
                  color:"white",display:"flex",alignItems:"center",fontSize:13}}>
                    <p style={{marginRight:5,paddingTop:3}}>{detailedView?.closed_at?DetailedViewClosedLogo:DetailedViewOpenLogo}</p>
                    <p>{detailedView?.closed_at? 'Closed':'Open'}</p>
                  </Box>
                  <p style={{width:"100%",height:1,background:"rgba(0,0,0,0.1)",margin:"-20px auto 25px auto"}}></p>
                  <Stack>
                {
                    comments?.data?.length === 0?
                    <p style={{width:"100%",textAlign:"center",fontWeight:700}}>No comments to display</p>
                    :
                comments?.data?.map((comment,index)=>{
                    return(
                        <CommentBox
                        content = {comment}
                        index = {index}
                        />
                    )
                })
                 }
                 </Stack>
            </Stack>
        </Box>
    )
}

export default DetailedView