import { Box, Stack } from '@mui/material';
import React, { useEffect } from 'react';


const CommentBox = ({content,index}) => {
    useEffect(()=>{
        let dom = document.getElementById(`Commentbox-${index}`)
        if(dom){
            dom.innerHTML = content?.body
        }
    },[content])
    return(
        <Stack key={`CommentParent-${index}`} sx={{border:"1px solid rgba(0,0,0,0.5)",margin:"15px 0px 25px 0px",borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
            <Box sx={{background:"#F5F8FA",width:"inherit",padding:"0px 10px",borderBottom:"1px solid black",display:"flex",alignItems:"center"}}>
            <img width={20} height={20} src={content?.user?.avatar_url} style={{borderRadius:"50%",marginRight:5}}/>
                <p>
                    <span style={{fontWeight:700}}>{content?.user?.login||"user"}</span> Commented at <span>{new Date(content?.updated_at)?.toLocaleString()}</span></p>
            </Box>
            <Box sx={{padding:"15px 20px"}} id={`Commentbox-${index}`}/>
        </Stack>
    )
}

export default CommentBox;