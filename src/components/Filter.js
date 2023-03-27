import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';


const Filter = ({type,filter,setFilter,label,setLabel,popularity,setPopularity,getFilteredData}) => {
    const handleChange = (event,setter) => {
        setter(event.target.value)
    }

    const RenderStatus = (popularityCheck) => {
        return(
        <FormControl size='small' sx={{minWidth:150,marginLeft:-1,marginTop:-1}}>
        <InputLabel id="select-label">{popularityCheck? "Popularity" : "Filter"}</InputLabel>
        <Select
            sx={{margin:"0px 5px"}}
            labelId="select-label"
            id="select"
            value={popularityCheck?popularity:filter}
            label="Filter"
            autoWidth
            onChange={(event)=>handleChange(event,popularityCheck? setPopularity : setFilter)}
          >
            <MenuItem value={"none"}>
              <em>None</em>
            </MenuItem>
                <MenuItem value={ popularityCheck? "popularity":"open"}>{ popularityCheck? 'Popularity':'Open'}</MenuItem>
            { !popularityCheck && <MenuItem value={"closed"}>Closed</MenuItem>}
          </Select>
          </FormControl>
          )
    }
    return(
        <Box sx={{width:"100%",display:"flex",flexWrap:"wrap",justifyContent:"flex-start",alignItems:"center",
        alignContent:"Center",marginBottom:5,flexWrap:"wrap"}}>
            <p style={{fontWeight:700,fontSize:18}}>FILTERS:</p>
            {
                type === "pulls"?
                <Box  sx={{width:"100%"}}>
      {RenderStatus()}
      {RenderStatus(true)}
                </Box>
                :
                <Box sx={{width:"100%"}}>
                    {RenderStatus()}
                    <TextField sx={{marginTop:-1}} size='small' id="outlined-basic" onKeyDown={(event)=> {
                        if(event.key === 'Enter'){
                            getFilteredData({
                                state:filter,
                                popularity,
                                label:event?.target?.value,
                            })
                        }
                    }}
                    onChange={(e)=>setLabel(e?.target?.value)}
          value={label} label="Label" variant="outlined" />
                </Box>
            }
        </Box>
    )
}

export default Filter;