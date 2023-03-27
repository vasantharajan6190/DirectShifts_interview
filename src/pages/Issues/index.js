import React, { useEffect, useState } from 'react';
import { fetchData } from '../../constants';
import { Box, Button, CircularProgress, Pagination, Stack } from '@mui/material';
import MainBox from '../../components/MainBox';
import DetailedView from '../../components/DetailedView';
import ListView from '../../components/Listview';
import Filter from "../../components/Filter";


const Issues = ()=>{

    const [paginationLoading,setPaginationLoading] = useState(false)
    const [loading,setLoading] = useState(true)
    const [issuesData,setIssuesData] = useState()
    const [issuesDetailedView,setIssuesDetailedView] = useState()
    const [issuesComments,setIssuesComments] = useState()
    const [viewAll,setViewAll] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    const [totalPages,setTotalPages] = useState(10)
    const [filter,setFilter] = useState()
    const [label,setLabel] = useState()
    const [popularity,setPopularity] = useState()

useEffect(()=>{
    fetchData("issues",setIssuesData,{
        url:"/repos/{owner}/{repo}/issues",
        // pulls:false,
        // state:"open",
        per_page:5,
        // labels:"Component,Flight"
    }).then(e=> setLoading(false))
},[])

useEffect(()=>{
   if(issuesDetailedView && issuesDetailedView?.comments_url)
    fetchData("issues",setIssuesComments,{
        url:issuesDetailedView?.comments_url,
        // pulls:false,
        // state:"open",
        // per_page:100,
    }).then(e=> setLoading(false))
},[issuesDetailedView])

useEffect(()=>{
    if(filter||label||popularity){
        setLoading(true)
         getFilteredData({
        state:filter,
        popularity,
        label,
    })
}
},[filter])

const ClearFilters = () => {
    setFilter("")
    setCurrentPage("")
    setLabel("")
    setTotalPages("")
}

const viewAllClicked = () => {
    setViewAll(true)
    setLoading(true)
    fetchData("issues",setIssuesData,{
        url:"/repos/{owner}/{repo}/issues",
        per_page:10,
    }).then(e=> {
        setIssuesData(prev=>{
            setTotalPages(Math.ceil(prev?.data?.length/10)+9)
            return prev
        })
        setLoading(false)
    })
}

const getFilteredData = (params) => {
    fetchData("issues",setIssuesData,{
        url:"/repos/{owner}/{repo}/issues",
        ...(params.state && params.state !== "none" && {state:params.state}),
        ...(params.label && {labels:params.label}),
        direction:"desc",
        per_page:10,
    }).then(e=> setLoading(false))
}

const getPaginatesResult = (selectedPage) => {
    fetchData("issues",setIssuesData,{
        url:"/repos/{owner}/{repo}/issues",
        ...(filter && filter !=="none" && {state:filter}),
        ...(label && label !== "" && {labels:label}),
        direction:"desc",
        per_page:10,
        page:selectedPage
    }).then(e=> {
        setPaginationLoading(false)
    })
}

// const backFromDetailedView = () => {
//     setIssuesDetailedView("")
//     setIssuesDetails("")
// }

const backFromViewAll = () => {
    setViewAll(false)
    setLoading(true)
    ClearFilters()
    fetchData("issues",setIssuesData,{
        url:"/repos/{owner}/{repo}/issues",
        per_page:5,
    }).then(e=> setLoading(false))
}

return(
    <Box sx={{padding:"10px 30px"}}>
        {
            loading? 
            <Box sx={{width:"100%",height:"70vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <CircularProgress />
            </Box> :
            <>
            {
        issuesDetailedView && issuesComments? <DetailedView
        setDetailedView = {setIssuesDetailedView}
        setComments = {setIssuesComments}
        detailedView={issuesDetailedView}
        comments={issuesComments}
        types="issues"
        />
            :
                viewAll?
                <Stack>
                  <Box sx={{width:"100%",display:"flex",justifyContent:"flex-start",position:"relative"}}>
                  <p style={{fontWeight:700,fontSize:18,margin:"10px auto"}}>ALL ISSUES</p>
                  <Button sx={{textTransform:"none",padding:"5px 25px",width:"fit-content",position:"absolute",right:0,bottom:-23}} onClick={()=>backFromViewAll()} variant="contained">Back</Button>
                  </Box>
                 <Stack sx={{marginTop:5}}>
                 <Filter types="issues"
                 setLoading = {setLoading}
                 filter={filter}
                 setFilter={setFilter}
                 label={label}
                 setLabel={setLabel}
                 getFilteredData = {getFilteredData}
                 />
                     { 
                     paginationLoading?
                     <Box sx={{width:"100%",height:"50vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                       <CircularProgress />
                     </Box>
                     :
                     issuesData?.data?.length===0?
                     <p style={{width:"100%",fontWeight:700,fontSize:18,textAlign:"center"}}>No data for the above filter</p>
                     :
                     issuesData.data.map((data,index)=>{
                         return(
                             <ListView
                             data={data}
                             index={index}
                             bottomBorder = {index === issuesData?.length-1 }
                             setPullsDetailedView = {setIssuesDetailedView}
                             type="issues"
                             />
                         )
                     })
                     }
                 </Stack>
                 <Box style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"10px 0px"}}>
                    <Pagination
                    color={"#CCDEF5"}
                    onChange={(e,value)=>{
                        if(value>=10) {
                            e.preventDefault()
                            fetchData("issues",(e)=>{
                                if(e?.data?.length){
                                setTotalPages(prev=>prev+1)
                                }
                                setPaginationLoading(true)
                                setCurrentPage(value)
                                getPaginatesResult(value)
                            },{
                                url:"/repos/{owner}/{repo}/issues",
                                ...(filter && filter !=="none" && {state:filter}),
                                ...(label &&  label !== "" && {labels:label}),
                                direction:"desc",
                                per_page:10,
                                page:value+1
                            })
                        }
                        else{
                        setPaginationLoading(true)
                        setCurrentPage(value)
                        getPaginatesResult(value)
                        }
                    }}
                    count={totalPages} variant="outlined" shape="rounded" />
                    </Box>
                </Stack>
                :
                <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",width:"100%"}}>
                    <Box sx={{width:"100%",display:"flex",justifyContent:"flex-start",flexDirection:"column",position:"relative",marginBottom:5}}>
                <p style={{fontWeight:700,fontSize:18,margin:"15px auto"}}>LATEST 5 ISSUES</p>
                <Button sx={{textTransform:"none",padding:"5px 25px",width:"fit-content",position:"absolute",right:0,bottom:-18}} onClick={()=>viewAllClicked()} variant="contained">View All</Button>
                </Box>
                {issuesData && issuesData?.data?.map((issues,index)=>{
                    return(
                        <MainBox 
                        key={`issuesData${index}`} 
                        data={issues}
                        setLoader={setLoading}
                        setter={setIssuesDetailedView}
                        />
                    )
                })
                }
                </Box>
            }
            </>
        }
    </Box>
)
}

export default Issues;