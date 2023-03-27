import React, { useEffect, useState } from 'react';
import { fetchData } from '../../constants';
import { Box, Button, CircularProgress, Pagination, Stack } from '@mui/material';
import MainBox from '../../components/MainBox';
import ListView from '../../components/Listview';
import DetailedView from '../../components/DetailedView';
import Filter from "../../components/Filter";


const Pulls = ()=>{

const [loading,setLoading] = useState(true)
const [paginationLoading,setPaginationLoading] = useState(false)
const [pullsData,setPullsData] = useState()
const [pullsDetailedView,setPullsDetailedView] = useState()
const [pullsComments,setPullsComments] = useState()
const [viewAll,setViewAll] = useState(false)
const [currentPage,setCurrentPage] = useState(1)
const [totalPages,setTotalPages] = useState(10)
const [filter,setFilter] = useState()
const [label,setLabel] = useState()
const [popularity,setPopularity] = useState()

useEffect(()=>{
    fetchData("pulls",setPullsData,{
        url:"/repos/{owner}/{repo}/pulls",
        per_page:5,
    }).then(e=> setLoading(false))
},[])

useEffect(()=>{
    //To fetch comments of the pull request
    if(pullsDetailedView && pullsDetailedView?.comments_url)
        fetchData("pulls",setPullsComments,{
        url:pullsDetailedView?.comments_url
    }).then(e=>setLoading(false))

},[pullsDetailedView])

useEffect(()=>{
    if(filter||label||popularity){ 
        setLoading(true)
        getFilteredData({
        state:filter,
        popularity,
        label,
    })
}
},[filter,popularity])

const getFilteredData = (params) => {
    fetchData("pulls",setPullsData,{
        url:"/repos/{owner}/{repo}/pulls",
        ...(params.state && params.state !=="none" && {state:params.state}),
        ...(params.popularity && params.popularity !== "none" && {sort:"popularity"}),
        direction:"desc",
        per_page:10,
    }).then(e=> setLoading(false))
}

const ClearFilters = () => {
    setFilter("")
    setCurrentPage("")
    setPopularity("")
    setTotalPages("")
}

const viewAllClicked = () => {
    setViewAll(true)
    setLoading(true)
    fetchData("pulls",setPullsData,{
        url:"/repos/{owner}/{repo}/pulls",
        per_page:10,
    }).then(e=> {
        setPullsData(prev=>{
            setTotalPages(Math.ceil(prev?.data?.length/10)+9)
            return prev
        })
        setLoading(false)
    })
}

const getPaginatesResult = (selectedPage) => {
    fetchData("pulls",setPullsData,{
        url:"/repos/{owner}/{repo}/pulls",
        ...(filter && filter !=="none" && {state:filter}),
        ...(popularity && popularity !== "none" && {sort:"popularity"}),
        direction:"desc",
        per_page:10,
        page:selectedPage
    }).then(e=> {
        setPaginationLoading(false)
    })
}

const backFromViewAll = () => {
    setViewAll(false)
    setLoading(true)
    ClearFilters()
    fetchData("pulls",setPullsData,{
        url:"/repos/{owner}/{repo}/pulls",
        per_page:5,
    }).then(e=> setLoading(false))
}

    return(
        <Box sx={{padding:"10px 30px"}}>
            {
                loading?
                <Box sx={{width:"100%",height:"70vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <CircularProgress />
                </Box>
                :
                <>
                {
                pullsDetailedView && pullsComments? <DetailedView
                setDetailedView = {setPullsDetailedView}
                setComments = {setPullsComments}
                detailedView={pullsDetailedView}
                comments={pullsComments}
                types="pulls"
                />
                :
                    viewAll?
                   <Stack>
                     <Box sx={{width:"100%",display:"flex",justifyContent:"flex-start",position:"relative"}}>
                     <p style={{fontWeight:700,fontSize:18,margin:"10px auto"}}>ALL PULL REQUESTS</p>
                     <Button sx={{textTransform:"none",padding:"5px 25px",width:"fit-content",position:"absolute",right:0,bottom:-23}} onClick={()=>backFromViewAll()} variant="contained">Back</Button>
                     </Box>
                    <Stack sx={{marginTop:5}}>
                    <Filter type={"pulls"}
                    setLoading = {setLoading}
                    filter={filter}
                    setFilter={setFilter}
                    popularity={popularity}
                    setPopularity={setPopularity}
                    />
                        { 
                       paginationLoading?
                       <Box sx={{width:"100%",height:"50vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                         <CircularProgress />
                       </Box>
                       :
                       pullsData?.data?.length===0?
                       <p style={{width:"100%",fontWeight:700,fontSize:18,textAlign:"center"}}>No data for the above filter</p>
                       :
                        pullsData.data.map((data,index)=>{
                            return(
                                <ListView 
                                data={data}
                                index={index}
                                setPullsDetailedView = {setPullsDetailedView}
                                ClearFilters = {ClearFilters}
                                type={"pulls"}
                                />
                            )
                        })
                        }
                    </Stack>
                    <Box style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"10px 0px"}}>
                    <Pagination
                    sx={{marginTop:5}}
                    onChange={(e,value)=>{
                        if(value>=10) {
                            e.preventDefault()
                            fetchData("pulls",(e)=>{
                                if(e?.data?.length){
                                setTotalPages(prev=>prev+1)
                                }
                                setPaginationLoading(true)
                                setCurrentPage(value)
                                getPaginatesResult(value)
                            },{
                                url:"/repos/{owner}/{repo}/pulls",
                                ...(filter && filter !=="none" && {state:filter}),
                                ...(popularity && popularity !== "none" && {sort:"popularity"}),
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
                <p style={{fontWeight:700,fontSize:18,margin:"15px auto"}}>LATEST 5 PULL REQUESTS</p>
                <Button sx={{textTransform:"none",padding:"5px 25px",width:"fit-content",position:"absolute",right:0,bottom:-18}} onClick={()=>viewAllClicked()} variant="contained">View All</Button>
                </Box>
                {pullsData && pullsData?.data?.map((data,index)=>{
                    return(
                        <MainBox 
                        key={`pullsData${index}`} 
                        data={data}
                        setLoader={setLoading}
                        setter={setPullsDetailedView}
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

export default Pulls;